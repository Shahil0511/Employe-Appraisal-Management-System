import appraisalQuestionsService from "../services/appraisalQuestionsService.js";

const createQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const newQuestion = await appraisalQuestionsService.createQuestion(
      question
    );
    res
      .status(201)
      .json({ message: "Question created successfully", newQuestion });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await appraisalQuestionsService.getAllQuestions();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question } = req.body;
    const updatedQuestion = await appraisalQuestionsService.updateQuestion(
      id,
      question
    );
    res
      .status(200)
      .json({ message: "Question updated successfully", updatedQuestion });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await appraisalQuestionsService.deleteQuestion(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
};
