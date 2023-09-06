import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;
const apiKey = process.env.REACT_APP_APIKEY;

export const getMovieList = async (page) => {
  const movie = await axios.get(`${baseURL}/movie/popular?api_key=${apiKey}&page=${page}`);
  return movie.data.results;
};

export const getTvList = async (page) => {
    const tv = await axios.get(`${baseURL}/tv/popular?api_key=${apiKey}&page=${page}`);
    return tv.data.results;
  };
