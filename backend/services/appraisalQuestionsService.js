// src/services/appraisalQuestionsService.js
import appraisalQuestion from "../models/AppraisalQuestion.js";

// Create a new question
const createQuestion = async (question) => {
  const newQuestion = new appraisalQuestion({ question });
  await newQuestion.save();
  return newQuestion;
};

// Get all questions
const getAllQuestions = async () => {
  return await appraisalQuestion.find();
};

// Update a specific question
const updateQuestion = async (id, question) => {
  return await appraisalQuestion.findByIdAndUpdate(
    id,
    { question },
    { new: true }
  );
};

// Delete a specific question
const deleteQuestion = async (id) => {
  return await appraisalQuestion.findByIdAndDelete(id);
};

export default {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
};
