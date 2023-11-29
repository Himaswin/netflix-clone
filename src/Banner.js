import React,{useEffect, useState} from 'react';
import axios from './axios';
import './Banner.css';
import requests from './Request';


function Banner(){
    const [movie,setMovie] = useState([]);

    useEffect(() =>{
        async function fetchData(){
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                const movies = request.data.results;
                if (movies && movies.length > 0) {
                    setMovie(movies[Math.floor(Math.random() * movies.length)]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    
    //console.log(movie);

    function truncate(string, n){
        return string?.length>n ? string.substr(0,n-1) + '...' : string;
    }


    return(
        <header className="banner" style={{
            backgroundSize: 'cover',
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            backgroundPosition: 'center center',
        }}>
            <div className="banner-contents">
                <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner-buttons">
                <button className="banner-button">Play</button>
                <button className="banner-button">My List</button>
                </div>

                <h1 className="banner-description">{truncate(`${movie?.overview}`,150)}</h1>
            </div>

            <div className="banner-fadebottom"></div>
        </header>
    )
}

export default Banner;