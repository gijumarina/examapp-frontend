import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("STUDENT");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [CNP, setCNP] = useState("");
  const [groupId, setGroupId] = useState(0);
  const [subject, setSubject] = useState("");

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
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangeCNP = (event) => {
    setCNP(event.target.value);
  };
  const handleChangeGroup = (event) => {
    setGroupId(event.target.value);
  };
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userDto =
      userType === "STUDENT"
        ? {
            userType: userType,
            firstName: firstName,
            lastName: lastName,
            age: age,
            cnp: CNP,
            email: eMail,
            password: password,
            groupId: groupId,
          }
        : {
            userType: userType,
            firstName: firstName,
            lastName: lastName,
            age: age,
            cnp: CNP,
            email: eMail,
            password: password,
            subject: subject,
          };
    axios.post("http://localhost:8080/user", userDto).then((res) => {
      nav("/login");
    });
  };

  return (
    <div className="register-container">
      <form className="form">
        <label htmlFor="type">Type</label>
        <select id="type" value={userType} onChange={handleChangeUserType}>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          placeholder="first name"
          onChange={handleChangeFirstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          placeholder="last name"
          onChange={handleChangeLastName}
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          value={age}
          placeholder="age"
          onChange={handleChangeAge}
        />
        <label htmlFor="CNP">CNP</label>
        <input
          id="CNP"
          type="text"
          value={CNP}
          placeholder="CNP"
          onChange={handleChangeCNP}
        />
        {userType === "STUDENT" ? (
          <>
            <label htmlFor="group">Group</label>
            <input
              type="number"
              value={groupId}
              placeholder="group"
              onChange={handleChangeGroup}
            />
          </>
        ) : (
          <>
            <label htmlFor="subject">Subject</label>{" "}
            <input
              id="subject"
              type="text"
              value={subject}
              placeholder="subject"
              onChange={handleChangeSubject}
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={eMail}
          placeholder="email"
          onChange={handleChangeEmail}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={handleChangePassword}
        />
        <button onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
}

export default Register;
