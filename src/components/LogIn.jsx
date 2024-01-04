import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import "./LogIn.css";

function LogIn() {
  const { setIsLoggedIn, setActiveUsers, setType, setGroup, setTeacherId } = useAppContext();
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("STUDENT");
  const nav = useNavigate();

  const handleChangeEmail = (event) => {
    setEMail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeUserType = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authDto = {
      email: eMail,
      password: password,
      type: userType,
    };
    await axios
      .post("http://localhost:8080/user/login", authDto)
      .then((res) => {
        setActiveUsers(res);
      })
      .then(async () => {
        setIsLoggedIn(true);
        localStorage.setItem("mail", eMail);
        setType(userType);
        const response = await axios.get(`http://localhost:8080/${userType.toLowerCase()}/${eMail}`)
        userType === "STUDENT" ? setGroup(response.data.groupId) : setTeacherId(response.data.id);
        nav("/");
      });
  };

  return (
    <div className="logIn-container">
      <form className="form">
        <select id="type" value={userType} onChange={handleChangeUserType}>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
        <input
          type="text"
          value={eMail}
          placeholder="email"
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={handleChangePassword}
        />
        <button onClick={handleSubmit}>Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LogIn;
