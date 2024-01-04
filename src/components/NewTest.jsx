import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewTest.css";

const NewTest = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    groupId: "",
    teacherId: "",
    minRequired: "",
    startTime: "",
    testDurationMinutes: "",
    questions: [
      {
        text: "",
        type: "MULTIPLE_CHOICE",
        score: "",
        answers: [{ text: "", correct: false }],
      },
    ],
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [field]: value,
      };
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleAnswerChange = (questionIndex, answerIndex, value, isChecked) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      const updatedAnswers = [...updatedQuestions[questionIndex].answers];
      updatedAnswers[answerIndex] = { text: value, correct: isChecked };
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answers: updatedAnswers,
      };
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleAddAnswer = (questionIndex) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      const newAnswer = { text: "", correct: false };
      const updatedAnswers = [
        ...(updatedQuestions[questionIndex].answers || []),
        newAnswer,
      ];
      updatedQuestions[questionIndex].answers = updatedAnswers;
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleAddQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          text: "",
          type: "",
          score: "",
          answers: [{ text: "", correct: false }],
        },
      ],
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/test", formData).then(() => {
        nav("/myTests");
      });
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  return (
    <div className="newTest-container">
      <h2>Create Test</h2>
      <form>
        <label>
          Group ID:
          <input
            type="number"
            value={formData.groupId}
            onChange={(e) => handleChange("groupId", e.target.value)}
          />
        </label>

        <label>
          Teacher ID:
          <input
            type="number"
            value={formData.teacherId}
            onChange={(e) => handleChange("teacherId", e.target.value)}
          />
        </label>

        <label>
          Minimum Required:
          <input
            type="number"
            value={formData.minRequired}
            onChange={(e) => handleChange("minRequired", e.target.value)}
          />
        </label>

        <label>
          Start Time:
          <input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
          />
        </label>

        <label>
          Test Duration (minutes):
          <input
            type="number"
            value={formData.testDurationMinutes}
            onChange={(e) =>
              handleChange("testDurationMinutes", e.target.value)
            }
          />
        </label>
        <h3>Questions</h3>
        {formData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question">
            <label>
              Question Text:
              <input
                type="text"
                value={question.text}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, "text", e.target.value)
                }
              />
            </label>

            <label>
              Question Type:
              <select
                value={question.type}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, "type", e.target.value)
                }
                className="newTest-input"
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="OPEN_ANSWER">Open Answer</option>
                <option value="MULTIPLE_ANSWERS">Multiple Answers</option>
              </select>
            </label>

            <label>
              Question Score:
              <input
                type="number"
                value={question.score}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, "score", e.target.value)
                }
              />
            </label>

            {question.type !== "OPEN_ANSWER" && (
              <>
                <h4>Answers</h4>
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <label>
                      Answer Text:
                      <input
                        type="text"
                        value={answer.text}
                        onChange={(e) =>
                          handleAnswerChange(
                            questionIndex,
                            answerIndex,
                            e.target.value
                          )
                        }
                        className="newTest-input"
                      />
                    </label>
                    <label>
                      Correct Answer:
                      <input
                        type="checkbox"
                        checked={answer.correct}
                        onChange={(e) =>
                          handleAnswerChange(
                            questionIndex,
                            answerIndex,
                            answer.text,
                            e.target.checked
                          )
                        }
                      />
                    </label>
                  </div>
                ))}

                <button
                  type="button"
                  className="newTest-button"
                  onClick={() => handleAddAnswer(questionIndex)}
                >
                  Add Answer
                </button>
              </>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="button" onClick={handleSubmit}>
          Create Test
        </button>
      </form>
    </div>
  );
};
export default NewTest;
