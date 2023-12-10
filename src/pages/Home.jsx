import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddFavourites from '../components/AddFavourites';


const Home = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	
	const getMovieRequest = async (searchValue) => {

		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3636380a`;
		const response = await fetch(url);
		const responseJson = await response.json();
		
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};
	
	console.log('testhome')
	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

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

    const addFavouriteMovie = (movie) => {
		const existingMovie = favourites.find((favMovie) => favMovie.imdbID === movie.imdbID);
	  
		if (!existingMovie) {
		  const newFavouriteList = [...favourites, movie];
		  setFavourites(newFavouriteList);
		  saveToLocalStorage(newFavouriteList);
		} else {
		  alert('This movie is already in your favourites!');
		}
	  };  



	return (
		<div className='container-fluid'>
			<div className='row'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>

		</div>
	);
};

export default Home;
