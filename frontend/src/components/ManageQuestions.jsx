import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState(""); // For adding a new question
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [isEditing, setIsEditing] = useState(null); // Track which question is being edited
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setStatus("loading");
        const { data } = await axios.get(
          "http://localhost:5000/api/questions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setQuestions(data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchQuestions();
  }, []);

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== questionId)
      );
    } catch (error) {
      console.error("Error deleting question", error);
    }
  };

  const handleEditQuestion = async (questionId) => {
    if (updatedQuestion.trim() === "") return;

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/questions/${questionId}`,
        { question: updatedQuestion },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q._id === questionId ? data : q))
      );
      setUpdatedQuestion(""); // Reset after edit
      setIsEditing(null); // Reset edit state
    } catch (error) {
      console.error("Error editing question", error);
    }
  };

  const handleAddQuestion = async () => {
    if (newQuestion.trim() === "") return;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/questions",
        { question: newQuestion },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQuestions((prevQuestions) => [...prevQuestions, data]); // Update questions immediately
      setNewQuestion(""); // Clear the input
    } catch (error) {
      console.error("Error adding new question:", error);
    }
  };

  if (status === "loading") return <div>Loading questions...</div>;
  if (status === "error") return <div>Error loading questions.</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Questions</h2>

      {/* Add New Question */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter new question"
          className="p-2 border w-full rounded-md"
        />
        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add New Question
        </button>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question._id} className="p-4 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between">
                <span>{question.question || "No question available"}</span>
                <div className="flex space-x-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setIsEditing(question._id);
                      setUpdatedQuestion(question.question);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteQuestion(question._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {isEditing === question._id && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={updatedQuestion}
                    onChange={(e) => setUpdatedQuestion(e.target.value)}
                    className="p-2 border w-full rounded-md"
                  />
                  <button
                    onClick={() => handleEditQuestion(question._id)}
                    className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No questions available.</div>
        )}
      </div>
    </div>
  );
};

export default ManageQuestions;
