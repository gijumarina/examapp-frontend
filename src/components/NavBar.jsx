import axios from "axios";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";
import "./NavBar.css";

function NavBar() {
  const { isLoggedIn, setIsLoggedIn, setActiveUsers, type } = useAppContext();

  const handleLogOut = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
    const email = localStorage.getItem("mail");
    axios
      .post("http://localhost:8080/user/logOut", email, {
        headers: { "Content-Type": "text/plain" },
      })
      .then((res) => {
        setActiveUsers(res);
      });
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
          {type === "TEACHER" && (
            <>
              <Link to="/newTest">New Test</Link>
              <Link to="/myTests">My Tests</Link>
            </>
          )}
        </li>
      </ul>
      {isLoggedIn ? (
        <Link onClick={handleLogOut}>Log out</Link>
      ) : (
        <Link to="/logIn" className="login-button">
          Log In
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
