import { useEffect, useState } from 'react';

import Error from './Error.jsx';
import Places from './Places.jsx';

import { fetchAvailablePlaces } from '../http.js';
import { sortPlacesByDistance } from '../loc.js';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  // fetch를 할 때는 아래의 3가지 상태를 기본으로 가짐
  const [isFetching, setIsFetching] = useState(false); // loading state
  // available places를 백엔드 API로부터 Fetch
  const [availablePlaces, setAvailablePlaces] = useState([]); // data state
  const [error, setError] = useState(); // error state

  // HTTP 요청을 보내 데이터가 준비되면 해당 상태를 업데이트
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        // 사용자 위치 가져오기
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch (error) {
        setError({message: error.message || 'Could not fetch places, please try again later.'});
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title='An error occurred!' message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data...'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
