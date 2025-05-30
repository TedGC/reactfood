import Error from './Error.jsx'
import useHttp from '../hooks/useHttp.jsx'
import MealItem from './MealItem'




const requestConfig = {}


export default function Meal() {

    const {
        data: loadedMeals,
        isLoading,
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, [])


    if (isLoading) {
        return <p className='center'>currently fetching the ddata</p>
    }

    if (error) {
        return <Error title="something went wrong" meesage={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) =>
                <MealItem key={meal.id} meal={meal} />)}
        </ul>
    )
}