import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "./AppContext";
import "./TestDetails.css";

const TestDetails = ({ id }) => {
  const { studentId, setMessage, setOpen } = useAppContext();
  const { state } = useLocation();
  console.log(state);
  const [test, setTest] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/test/${state.id}`
      );
      setTest(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [id]);
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerSelection = (questionId, answerId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: [...(prevAnswers[questionId] || []), answerId],
    }));
  };

  const handleSubmit = async () => {
    const testId = test.id;
    const testAnswers = Object.keys(userAnswers).map((questionId) => ({
      questionId: parseInt(questionId),
      answersIds: userAnswers[questionId],
    }));

    const submissionData = {
      studentId,
      testId,
      testAnswers,
    };

    try {
      submissionData.testAnswers?.map((data) => {
          if(typeof(data.answersIds) === "string") {
            data.answersIds = [];
          }
        })
      console.log(submissionData);
      await axios.post(`http://localhost:8080/test/submitAnswer/${state.id}`, submissionData).then((res) => {
        setMessage(res.data?.message);
        setOpen(true);
      });
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const handleEnd = async() => {
    await axios.get(`http://localhost:8080/test/end/${state.id}/${studentId}`).then((res) => {
      setMessage(res.data?.message);
      setOpen(true);
    })
  }

  return (
    <div className="test-details-container">
      <h2>{test.id}</h2>
      {test?.questions?.map((question) => (
        <div key={question.id} className="question-container">
          <h3>{question.text}</h3>
          {question.type === "MULTIPLE_CHOICE" && (
            <ul>
              {question.answers.map((answer) => (
                <li key={answer.id}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleAnswerSelection(question.id, answer.id)
                    }
                  />
                  {answer.text}
                </li>
              ))}
            </ul>
          )}
          {question.type === "MULTIPLE_ANSWERS" && (
            <ul>
              {question.answers.map((answer) => (
                <li key={answer.id}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleAnswerSelection(question.id, answer.id)
                    }
                  />
                  {answer.text}
                </li>
              ))}
            </ul>
          )}
          {question.type === "OPEN_ANSWER" && (
            <textarea
              value={userAnswers[question.id] || ""}
              onChange={(e) =>
                setUserAnswers({
                  ...userAnswers,
                  [question.id]: e.target.value,
                })
              }
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleEnd}>End</button>
    </div>
  );
};

export default TestDetails;
