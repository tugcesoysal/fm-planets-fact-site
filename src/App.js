import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";

import data from "./data.json";

function App() {
  const [planetNames, setPlanetNames] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [image, setImage] = useState();
  const [secondaryImage, setSecondaryImage] = useState();
  const [activePlanet, setActivePlanet] = useState("Mercury");
  const [planetDetail, setPlanetDetail] = useState(null);
  const [content, setContent] = useState();
  const [isWideScreen, setIsWideScreen] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setPlanetNames(data.map((planet) => planet.name));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const foundPlanet = data.find(
      (p) => p.name.toLowerCase() === activePlanet.toLowerCase(),
    );
    setPlanetDetail(foundPlanet);
  }, [activePlanet]);

  useEffect(() => {
    if (planetDetail) {
      switch (activeButton) {
        case 1:
          setImage(planetDetail.images.planet);
          setSecondaryImage(null);
          setContent(planetDetail.overview.content);

          break;
        case 2:
          setImage(planetDetail.images.internal);
          setSecondaryImage(null);
          setContent(planetDetail.structure.content);

          break;
        case 3:
          setImage(planetDetail.images.planet);
          setSecondaryImage(planetDetail.images.geology);
          setContent(planetDetail.geology.content);

          break;
        default:
          setImage(planetDetail.images.planet);
          setSecondaryImage(null);
          setContent(planetDetail.overview.content);
      }
    }
  }, [activeButton, planetDetail]);

  if (!planetDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        planetNames={planetNames}
        setActivePlanet={setActivePlanet}
      />

      {isMenuOpen && (
        <Menu
          setIsMenuOpen={setIsMenuOpen}
          planetNames={planetNames}
          setActivePlanet={setActivePlanet}
        />
      )}
      <div className="main">
        <div className="left-side">
          <img src={image} alt={activePlanet} className="planet-image" />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt="geology"
              className="secondary-image"
            />
          )}
        </div>
        <div className="right-side">
          <div className="content">
            {" "}
            <h1>{planetDetail.name}</h1>
            <p>{content}</p>
            <div className="source">
              <p>Source : </p>
              <a href={planetDetail.overview.source}>Wikipedia</a>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                <path
                  fill="#FFF"
                  d="M11.34.66C10.9.22 10.37 0 9.75 0h-7.5C1.63 0 1.1.22.66.66.22 1.1 0 1.63 0 2.25v7.5c0 .62.22 1.15.66 1.59.44.44.97.66 1.59.66h7.5c.62 0 1.15-.22 1.59-.66.44-.44.66-.97.66-1.59v-7.5c0-.62-.22-1.15-.66-1.59zM10 6.25a.467.467 0 01-.305.46.544.544 0 01-.195.04.465.465 0 01-.352-.149L8.023 5.476 3.852 9.648a.481.481 0 01-.352.149.48.48 0 01-.352-.149l-.796-.797a.48.48 0 01-.149-.351.48.48 0 01.149-.352l4.172-4.172-1.125-1.125c-.162-.15-.198-.333-.11-.546A.467.467 0 015.75 2H9.5c.135 0 .253.05.352.148A.48.48 0 0110 2.5v3.75z"
                  opacity=".5"
                />
              </svg>
            </div>
          </div>
          <div className="buttons-div">
            <button
              onClick={() => setActiveButton(1)}
              className={activeButton === 1 ? `active ${activePlanet}` : ""}
            >
              <span>01</span>overview
            </button>
            <button
              onClick={() => setActiveButton(2)}
              className={activeButton === 2 ? `active ${activePlanet}` : ""}
            >
              <span>02</span>
              {isWideScreen ? "internal structure" : "structure"}
            </button>
            <button
              onClick={() => setActiveButton(3)}
              className={activeButton === 3 ? `active ${activePlanet}` : ""}
            >
              <span>03</span>
              {isWideScreen ? "surface geology" : "surface"}
            </button>
          </div>
        </div>
      </div>
      <div className="content-footer">
        <div className="footer-item">
          <p>rotating time</p>
          <h2>{planetDetail.rotation}</h2>
        </div>
        <div className="footer-item">
          <p>revolution time</p>
          <h2>{planetDetail.revolution}</h2>
        </div>
        <div className="footer-item">
          <p>revolution radius</p>
          <h2>{planetDetail.radius}</h2>
        </div>
        <div className="footer-item">
          <p>average temp.</p>
          <h2>{planetDetail.temperature}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
