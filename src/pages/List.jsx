import './List.css'

import React, { useState, useEffect } from 'react'

import RemoveFavourites from '../components/RemoveFavourites';
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';

const List = () => {

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );

        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
    }, []);

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };


    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    return (
        <div className='List'>

            <div className='row'>
                <MovieListHeading heading='Favourites' />
            </div>
            <div className='row'>
                <MovieList
                    movies={favourites}
                    handleFavouritesClick={removeFavouriteMovie}
                    favouriteComponent={RemoveFavourites}
                />
            </div>
            <p>sagol</p>
        </div>
    )

}

export default List