import { useState } from "react";

function Navbar({ planetNames, setActivePlanet, isMenuOpen, setIsMenuOpen }) {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const handleMouseEnter = (planet) => {
    setHoveredPlanet(planet);
  };

  const handleMouseLeave = () => {
    setHoveredPlanet(null);
  };

  return (
    <div className="navbar">
      <div className="logo">the planets</div>
      <nav className="mobile">
        <ul>
          {planetNames.map((planet, index) => (
            <li
              onClick={() => setActivePlanet(planet)}
              key={index}
              onMouseEnter={() => handleMouseEnter(planet)}
              onMouseLeave={handleMouseLeave}
              className={planet === hoveredPlanet ? hoveredPlanet : ""}
            >
              {planet}
            </li>
          ))}
        </ul>
      </nav>
      <svg
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="icon-menu"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="17"
      >
        <g fill={isMenuOpen ? "#979797" : "#FFF"} fill-rule="evenodd">
          <path d="M0 0h24v3H0zM0 7h24v3H0zM0 14h24v3H0z" />
        </g>
      </svg>
    </div>
  );
}

export default Navbar;
