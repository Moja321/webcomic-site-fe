import React from 'react';

const MovieCard = ({movie,handleClick}) => { //normally (props) is used but using deconstructuring, we can pass movie1 into props by doing ({moviee1})
    return (
        <div className="movie" onClick={handleClick}>
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.title}/>
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}

export default MovieCard;