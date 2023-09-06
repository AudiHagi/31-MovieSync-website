import { React, useEffect, useState } from "react";
import "./MovieContentCard.css";
import Card from "react-bootstrap/Card";
import { getMovieList } from "../../axios/Api";

const MovieContentCard = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const imageUrl = process.env.REACT_APP_BASEIMGURL;

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const response = await getMovieList(page);
        const uniqueIds = new Set(response.map((movie) => movie.id));
        const filteredMovies = popularMovies.filter(
          (movie) => !uniqueIds.has(movie.id)
        );
        const combinedMovies = [...filteredMovies, ...response];
        setPopularMovies(combinedMovies);
      } catch (error) {
        console.error("Error loading popular movies:", error);
      }
    };
    loadPopularMovies();
  }, [page]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <Card className="contentcard border-0" key={i}>
          <Card.Img
            className="poster"
            variant="top"
            src={`${imageUrl}/${movie.poster_path}`}
          />
          <Card.Body>
            <Card.Text className="title">{movie.title}</Card.Text>
            <Card.Text className="date">{movie.release_date}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <div className="MovieContainer">
      <PopularMovieList />
    </div>
  );
};

export default MovieContentCard;
