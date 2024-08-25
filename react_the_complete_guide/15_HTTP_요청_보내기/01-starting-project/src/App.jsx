import { useCallback, useEffect, useRef, useState } from 'react';

import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import Error from './components/Error.jsx';
import Modal from './components/Modal.jsx';
import Places from './components/Places.jsx';

import { fetchUserPlaces, updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  // 사용자가 저장한 장소를 불러오는 데에 사용할 3가지의 상태들
  const [isFetching, setIsFetching] = useState(false); // loading state
  const [error, setError] = useState(); // error state

  // 에러가 발생하여 UI를 복구할 때 사용자에게 알려주기 위한 상태
  // 장소에 문제가 생겼을 때만 업데이트
  const [errorUpdationgPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 사용자가 저장한 장소 불러오기
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({message: error.message || 'Failed to fetch user places.'});
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // 아래와 같은 낙관적인 업데이트는 사용자들에게 더 나은 경험을 제공하기도 함
  // 로딩 문구나 스피너를 띄우는 것보다 더 좋을 수 있음
  async function handleSelectPlace(selectedPlace) {
    // 아래의 코드를 상태 업데이트 함수의 앞으로 옮겨서 장소를 업데이트 해도 됨
    // 그러면 이 상태 업데이트 함수는 해당 요청이 끝날 때까지 기다림
    // 이와 같이 사용하려면 로딩 문구나 스피너를 띄워야 함
    // 그렇지 않으면 사용자에게는 앱이 멈춘 것처럼 보일 것이기 때문
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // 상태를 업데이트 한 후 HTTP 요청 보내기
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch(error) {
      // 이전 setUserPlaces를 사용하여 새로 선택한 장소는 포함하지 않고, 에러가 발생했을 때 변동사항을 복구시키고 UI를 다시 업데이트 하게 함
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || 'Failed to update places.'});
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id));
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || 'Failed to delete places.'});
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdationgPlaces} onClose={handleError}>
        {errorUpdationgPlaces && <Error title='An error occurred!' message={errorUpdationgPlaces.message} onConfirm={handleError} />}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <Error title='An error occurred!' message={error.message} />}
        {!error && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isFetching}
          loadingText='Fetching your places...'
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
