import { Link } from "react-router-dom";

const NavbarLinks = () => {
  return (
    <div className="collapse navbar-collapse mt-lg-0 mt-4" id="navbarLinks">
      <ul className="navbar-nav">
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/">
            Accueil
          </Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/cars">
            Réserver une voiture
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default NavbarLinks;
