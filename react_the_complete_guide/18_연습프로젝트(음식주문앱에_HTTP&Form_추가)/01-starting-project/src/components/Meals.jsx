import MealItem from './MealItem';
import Error from './Error';

import useHttp from '../hooks/useHttp';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  console.log(loadedMeals);

  if (isLoading) {
    return <p className='center'>Fetching meals...</p>;
  }

  if (error) {
    return <Error title='Failed to fetch meals' message={error} />;
  }

  // if (!loadedMeals) {
  //   return <p>No meals found.</p>;
  // }

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
