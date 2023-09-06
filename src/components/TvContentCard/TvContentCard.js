import { React, useEffect, useState } from "react";
import "./TvContentCard.css";
import Card from "react-bootstrap/Card";
import { getTvList } from "../../axios/Api";

const TvContentCard = () => {
  const [popularTvs, setPopularTvs] = useState([]);
  const [page, setPage] = useState(1);
  const imageUrl = process.env.REACT_APP_BASEIMGURL;

  useEffect(() => {
    const loadPopularTvs = async () => {
      try {
        const response = await getTvList(page);
        const uniqueIds = new Set(response.map((tv) => tv.id));
        const filteredTvs = popularTvs.filter((tv) => !uniqueIds.has(tv.id));
        const combinedTvs = [...filteredTvs, ...response];
        setPopularTvs(combinedTvs);
      } catch (error) {
        console.error("Error loading popular Tvs:", error);
      }
    };
    loadPopularTvs();
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
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const PopularTvList = () => {
    return popularTvs.map((Tv, i) => {
      return (
        <Card className="contentcard border-0" key={i}>
          <Card.Img
            className="poster"
            variant="top"
            src={`${imageUrl}/${Tv.poster_path}`}
          />
          <Card.Body>
            <Card.Text className="title">{Tv.name}</Card.Text>
            <Card.Text className="date">{Tv.release_date}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <div className="TvContainer">
      <PopularTvList />
    </div>
  );
};

export default TvContentCard;
