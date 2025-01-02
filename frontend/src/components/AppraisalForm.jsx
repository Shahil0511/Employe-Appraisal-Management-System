import React, { useState } from "react";

const AppraisalForm = ({ questions, onSubmit, isSubmitting }) => {
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    questions.forEach((question, index) => {
      if (!answers[`question-${index}`]?.trim()) {
        newErrors[`question-${index}`] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(answers);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-blue-600">
        Self-Appraisal Form
      </h2>
      <form onSubmit={handleSubmit} className="mt-6">
        {questions.map((question, index) => (
          <div key={index} className="mt-6">
            <label
              htmlFor={`question-${index}`}
              className="block text-lg font-medium text-gray-700"
            >
              {question.question}
            </label>
            <textarea
              id={`question-${index}`}
              name={`question-${index}`}
              value={answers[`question-${index}`] || ""}
              onChange={handleInputChange}
              className={`w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[`question-${index}`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              rows="4"
              placeholder="Your answer here..."
              aria-describedby={
                errors[`question-${index}`] ? `error-${index}` : undefined
              }
            />
            {errors[`question-${index}`] && (
              <p id={`error-${index}`} className="text-red-500 text-sm mt-1">
                {errors[`question-${index}`]}
              </p>
            )}
          </div>
        ))}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-blue-500 text-white py-2 px-6 rounded-md disabled:bg-gray-300 transition duration-200 hover:bg-blue-600"
          >
            {isSubmitting ? "Submitting..." : "Submit Appraisal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppraisalForm;
