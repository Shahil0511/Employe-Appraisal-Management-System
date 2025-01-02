import React, { useState, useEffect } from "react";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  const handleAddQuestion = () => {
    if (newQuestion) {
      setQuestions([...questions, { question: newQuestion }]);
      setNewQuestion("");
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Manage Appraisal Questions
      </h2>
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Add new question"
        />
        <button
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Current Questions</h3>
        <ul className="space-y-2 mt-4">
          {questions.map((q, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{q.question}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteQuestion(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageQuestions;
