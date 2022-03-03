import React, { useEffect, useState } from "react";
import "./App.css";
import API_HOME from "./api_services/Home.js";
import Header from "./Components/Header";
import FeaturedMovie from "./Components/FeaturedMovie";
import MovieRow from "./Components/MovieRow";
import Footer from "./Components/Footer";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [gradientHeader, setGradientHeader] = useState(false);
  useEffect(() => {
    const loadHomeList = async () => {
      //Define as listas de filmes da tela inicial
      let homeList = await API_HOME.getHomeList();

      setMovieList(homeList);

      //seleciona o filme em Destaque
      let originals = homeList.filter((i) => i.slug === "originals");
      let randomMovie = await Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosenMovie = originals[0].items.results[randomMovie];
      let getInfoChosenMovie = await API_HOME.getMovieInfo(
        chosenMovie.id,
        "tv"
      );

      setFeaturedData(getInfoChosenMovie);
    };

    loadHomeList();
  }, []);

  useEffect(() => {
    const scrollControl = () => {
      if (window.scrollY > 10) {
        setGradientHeader(true);
      } else {
        setGradientHeader(false);
      }
    };
    window.addEventListener("scroll", scrollControl);
  });

  return (
    <div className="page">
      <Header gradient={gradientHeader} />
      <section className="featMovie">
        {FeaturedData && <FeaturedMovie item={FeaturedData} />}
      </section>
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <Footer />
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="Loading"
          />
        </div>
      )}
    </div>
  );
};
