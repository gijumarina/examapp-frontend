import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "./AppContext";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 2%;
  margin-top: 5%;
  margin-bottom: 5%;
  color: #333;
  width: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 8px;
`;

const Property = styled.div`
  margin-bottom: 8px;
`;

const startButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  marginRight: '2%',
  cursor: 'pointer',
  fontSize: '16px',
};

const TestCard = ({
  groupId,
  minRequired,
  startTime,
  testDurationMinutes,
  id,
  isTeacher
}) => {
  const { type, group, studentId, setOpen, setMessage } = useAppContext();
  const nav = useNavigate();
  
  const handleStart = async () => {
    await axios.get(`http://localhost:8080/test/start/${id}/${studentId}`).then((response) => {
      setMessage(response.data?.message);
      setOpen(true);
      if(response.data?.message?.includes("Test with id")) {
        nav("/test", {state:{id:id}});
      }
    });
  }

  const handleTeacherStart = async () => {
    const response = await axios.get(`http://localhost:8080/test/start/${id}`);
    setMessage(response.data?.message);
    setOpen(true);
  }

  const handleTeacherEnd = async () => {
    await axios.get(`http://localhost:8080/test/end/${id}`).then((res) => {
      setMessage(res.data?.message);
      setOpen(true);
    });
  }

  const handleShowReport = async () => {
    await axios.get(`http://localhost:8080/test/report/${id}`).then((res) => {
      setMessage(
        `Test contains: ${res.data.noOfQuestions} questions, from which ${res.data.noOfMultipleAnswer} are multiple answer questions, ${res.data.noOfMultipleChoice} are multiple choice answers and ${res.data.noOfOpenAnswers} are open answer questions!`
      );
      setOpen(true);
    })
  }

  return (
    <Card>
      <Title>Test {id}</Title>
      <Property>
        <strong>Group ID:</strong> {groupId}
      </Property>
      <Property>
        <strong>Minimum Required:</strong> {minRequired}
      </Property>
      <Property>
        <strong>Start Time:</strong> {startTime}
      </Property>
      <Property>
        <strong>Test Duration:</strong> {testDurationMinutes} minutes
      </Property>
      {group === groupId && type === "STUDENT" && <button onClick={handleStart} style={startButtonStyle}>Start</button>}
      {group === groupId && type === "STUDENT" && <button onClick={handleShowReport} style={startButtonStyle}>Details</button>}
      {isTeacher && <button onClick={handleTeacherStart} style={startButtonStyle}>Start</button>}
      {isTeacher && <button onClick={handleTeacherEnd} style={startButtonStyle}>End</button>}
    </Card>
  );
};

TestCard.propTypes = {
  groupId: PropTypes.number.isRequired,
  minRequired: PropTypes.number.isRequired,
  startTime: PropTypes.string.isRequired,
  testDurationMinutes: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isTeacher: PropTypes.bool.isRequired
};

export default TestCard;
