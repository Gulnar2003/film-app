import React, { useState, useEffect } from 'react'

import MovieList from '../components/MovieList';
import Detailed from '../components/Detailed';

const Detail = () => {
    const [selected, setSelected] = useState([]);
	const [favourites, setFavourites] = useState([]);


    useEffect(() => {
        const selectMovie = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')  );

			
console.log(selectMovie) 


		for (let i = 0; i < selectMovie.length; i++) {
				// if (favourites.imdbID == selectMovie[i].imdbID) {

					console.log(selectMovie[i].Title)
				// }
		}

    }, []);



	return (
		<>

            <div className='row'>
                <Detailed/>
            </div>

		</>
	);
};

export default Detail