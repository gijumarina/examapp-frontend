import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ActiveUsers from "./components/ActiveUsers";
import { AppProvider } from "./components/AppContext";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import MyTests from "./components/MyTests";
import NavBar from "./components/NavBar";
import NewTest from "./components/NewTest";
import Register from "./components/Register";
import Snackbar from "./components/Snackbar";
import TestDetails from "./components/TestDetails";

function App() {

  return (
    <AppProvider>
      <Router>
        <NavBar />
        <div className="main-container">
          <ActiveUsers />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newTest" element={<NewTest/>}/>
            <Route path="/myTests" element={<MyTests/>}/>
            <Route path="/test" element={<TestDetails/>}/>
          </Routes>
        </div>
      </Router>
      <Snackbar/>
    </AppProvider>
  );
}

export default App;
