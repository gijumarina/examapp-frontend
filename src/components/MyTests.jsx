import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import "./MyTests.css";
import TestCard from "./TestCard";

const MyTests = () => {
  const { teacherId } = useAppContext();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/test/byTeacher/${teacherId}`
      );
      setTests(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="myTests-container">
      {tests.length !== 0 ? (
        tests.map((test) => {
          return (
            <TestCard
              key={test.id}
              groupId={test.groupId}
              minRequired={test.minRequired}
              startTime={test.startTime}
              testDurationMinutes={test.testDurationMinutes}
              id={test.id}
              isTeacher={true}
            />
          );
        })
      ) : (
        <p>No tests to show</p>
      )}
    </div>
  );
};
export default MyTests
