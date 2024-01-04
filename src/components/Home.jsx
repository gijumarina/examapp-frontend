import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import "./Home.css";
import TestCard from "./TestCard";

function Home() {
    const { isLoggedIn } = useAppContext();
    const nav = useNavigate();
    const [tests, setTests] = useState([]);
    
    useEffect(() => {
        if(!isLoggedIn) {
            nav("/logIn");
        }
    }, [isLoggedIn])

    useEffect(() => {
        const fetchData = async () => {
            if(isLoggedIn) {
                const response = await axios.get("http://localhost:8080/test");
                setTests(response.data);
                console.log(response.data);
            }
        }
        fetchData();
        
    }, [axios])

    
    return (
        <div className="home-container">
            {tests.length !== 0 ? tests.map((test) => {
                return(
                    <TestCard key={test.id} groupId={test.groupId} minRequired={test.minRequired} startTime={test.startTime} testDurationMinutes={test.testDurationMinutes} id={test.id} isTeacher={false} />
                )
            }) : <p>No tests to show</p>}
        </div>
    )
}

export default Home