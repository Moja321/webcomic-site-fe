import React, { useEffect, useState } from 'react'; //import React object from 'react' library

import './App.css';
import SearchIcon from './search.svg';
import SearchIcon2 from './search2.svg';

import MovieCard from './MovieCard';
import DarkMode from './DarkMode/DarkMode';

//OMDB api key: ec451e8a

const API_URL = 'https://www.omdbapi.com?apikey=' + process.env.REACT_APP_API_KEY;

const movie1 = {
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

//below 'App' variable is whats called a react component
const App = () => {

    //set useState() hook, the [] part is using destructuring
    const [movies, setMovies] = useState([]);//we pass in empty array as the states default value
    const [searchTerm, setSearchTerm] = useState('');
    const [main, setMain] = useState([]);
    // const [dark, setDark] = useState(false);
    const [searchImg,setSearchImg] = useState(SearchIcon);

    // var searchImg = SearchIcon;

    // const changeSearchImage1 = () => {
    //     setSearchImg = SearchIcon;
    // }

    // const changeSearchImage2 = () => {
    //     setSearchImg = SearchIcon2;
    // }

    // below is how you implement an api call without any http protocol routing (get/post/put/delete), 
    // you will need express.js for http routing/REST, and usually done from a dedicated backend
    const searchMovies = async (title) => { 
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data);
        //console.log(data.Plot);

        //never do this:
        //movies = data.search;

        //instead, state can only be modified using the setState function:
        setMovies(data.Search);
    }

    // useEffect(()=>{
    //     searchMovies('Batman');
    // },[]);

    // useEffect(()=>{
    //     searchImg = SearchIcon2;
    // },[]);

    const getMovieData = async (movieId) => { 
        const response = await fetch(`${API_URL}&i=${movieId}&plot=full`);
        const data = await response.json();

        console.log(data);
        console.log(data.Plot);

        setMain(data);

        if (window.innerWidth < 600){
            document.getElementById("moviePage").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }else{
            document.getElementById("moviePage").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
        
        //console.log("window.innerWidth = " + window.innerWidth);
    }

    // useEffect(()=>{
    //     getMovieData('tt2975590');
    // },[]);

    return (
        //<h1>App</h1> //this is jsx (javascript xml, its a combination of JS and markup language)
        //changeImg1={()=>{setSearchImg(SearchIcon)}} changeImg2={()=>{setSearchImg(SearchIcon2)}}
        <div className="app">
            <DarkMode changeImg1={()=>{setSearchImg(SearchIcon)}} changeImg2={()=>{setSearchImg(SearchIcon2)}}/>
            <h1>CoolMoviezDB</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                />
                {/* {
                    localStorage.getItem("selectedTheme") === "dark" ? (
                        <img
                            src={SearchIcon2}
                            alt="search"
                            onClick={()=>{searchMovies(searchTerm)}}
                        />
                    ) : (
                        <img
                            src={SearchIcon}
                            alt="search"
                            onClick={()=>{searchMovies(searchTerm)}}
                         />
                    )
                } */}
                <img
                    src={searchImg}
                    alt="search"
                    onClick={()=>{searchMovies(searchTerm)}}
                />
                
                
                
            </div>

            {
                main.length !== 0 ? (

                    <div className="container">
                        <div id="moviePage" className="movie-flex-column">
                            <div className="movie-flex-row">
                                <div className="movie-img">
                                    <img src={main.Poster}/>
                                </div>
                                <div className="movie-info">
                                    <p><span style={{fontWeight:"1000"}}>Title:</span> {main.Title}</p>
                                    <p><span style={{fontWeight:"1000"}}>Genre:</span> {main.Genre}</p>
                                    <p><span style={{fontWeight:"1000"}}>Year:</span> {main.Year}</p>
                                    <p><span style={{fontWeight:"1000"}}>Director:</span> {main.Director}</p>
                                    <p><span style={{fontWeight:"1000"}}>Actors:</span> {main.Actors}</p>
                                    <p><span style={{fontWeight:"1000"}}>IMDB rating:</span> {main.imdbRating}</p>
                                    <p><span style={{fontWeight:"1000"}}>IMDB votes:</span> {main.imdbVotes}</p>
                                </div>
                            </div>                    
                            <div className="movie-plot">
                                <div className="movie-plot-text">
                                    <h3>Plot:</h3>
                                    <p>{main.Plot}</p>
                                </div>                            
                            </div>                                        
                        </div>  
                    </div>
                
                ) : (

                    <div className="empty">
                        <h2>Search and click on a movie to see movie details</h2>
                    </div>

                )


                
            }

            
            
            

            {
                movies?.length > 0 //Note that the ? here is called optional chaining, it checks if variable is null, and returns 'undefined' instead of throwing an error
                    ? ( //this is just a typical ternary operator
                        <div className="container">
                            {movies.map((movie)=>{
                                return <MovieCard movie={movie} key={movie.imdbID} handleClick={()=>{getMovieData(movie.imdbID)}}/> //*this can be written without 'return' by simply not using curly braces. Look up how arrow functions work without curly braces. See below code block.
                            })}
                            {/* {movies.map((movie)=>
                                <MovieCard movie={movie}/> //*this can be written without 'return' by simply not using curly braces. Look up how arrow functions work without curly braces.
                            )} */}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }

            {/* <div className="container">
                <MovieCard movie1={movie1} />
            </div> */}

        </div>
    );
}

export default App;// export this script so that it can be called from other scripts