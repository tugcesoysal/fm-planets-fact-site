import React from "react";

function Menu({ planetNames, setActivePlanet, setIsMenuOpen }) {
  const handleActivePlanet = (planet) => {
    setActivePlanet(planet);
    setIsMenuOpen(false);
  };

  return (
    <div className="menu">
      <ul>
        {planetNames.map((planet, index) => (
          <li key={index} onClick={() => handleActivePlanet(planet)}>
            <div className={planet}></div>
            {planet}{" "}
            <svg
              className="icon-chevron"
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="8"
            >
              <path fill="none" stroke="#FFF" opacity=".4" d="M1 0l4 4-4 4" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
