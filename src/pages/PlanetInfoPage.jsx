import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Planet from "../components/planet/Planet";
import PlanetInfo from "../components/planetInfo/PlanetInfo";
import BurgerMenu from "../components/burgerMenu/BurgerMenu";
import Loading from "../components/loading/Loading";

import "./planetInfo.css";

const planetNames = [
  "sun",
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
];

const PlanetInfoPage = () => {
  const [info, setInfo] = useState("");
  const planetIdx = useParams().planet;

  const planetName = planetNames[parseInt(planetIdx)];
  const api = "MICl5hgHJiIFbuBnO71leQ==1aNoY4LjWP0ZrUAI";
  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/planets?name=${planetName}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": api,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setInfo(result[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPlanetData();
  }, []);

  if (!info) {
    return <Loading />;
  }

  return (
    <div className="planet-info-container">
      <PlanetInfo info={info} />
      <Planet planetName={planetIdx} />
      <BurgerMenu />
    </div>
  );
};

export default PlanetInfoPage;
