  import React, {useEffect, useState } from 'react';
  import MovieList from './components/MovieList';
  import './App.css';
  import MovieListHeading from './components/MovieListHeading';
  import SearchBox from './components/SearchBox';
  import AddFavourites from './components/AddFavourites';
  import RemoveFavourites from './components/RemoveFavourites';

  const App = () => {
    const [movies, setMovies]= useState([]);
    const [favourites , setFavourites] = useState([]);
    const [searchValue , setSearchValue] = useState('');

    const getMovieRequest = async (searchValue) => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3636380a`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.Search){
        setMovies(responseJson.Search);
      }
    };

    useEffect(() =>{
      getMovieRequest(searchValue);
    }, [searchValue]);

    useEffect(() =>{
      const movieFavourites = JSON.parse(
        localStorage.getItem('react-my-app-favourites')
        );
        setFavourites(movieFavourites);
    }, []);

    const saveToLocalStorage = (items) => {
  localStorage.setItem('react-my-app-favourites', JSON.stringify(items));
    }


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

    const removeFavouriteMovie = (movie) => {
      const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID 
        );
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    return (
    <div className='container-fluid movie-app'>
      <div className='row '>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
      <MovieList 
      movies={movies} 
      handleFavouritesClick={addFavouriteMovie}
      favouriteComponent={AddFavourites} />
      </div>

      <div className='row '>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
      <MovieList 
      movies={favourites} 
      handleFavouritesClick={removeFavouriteMovie}
      favouriteComponent={RemoveFavourites} 
      />
      </div>
    </div>
  );
  };

  export default App;
