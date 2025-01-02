// src/routes/appraisalQuestionsRoutes.js
import express from "express";
import { check } from "express-validator";
import appraisalQuestionsController from "../controllers/appraisalQuestionsController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js"; // Assuming JWT auth middleware is available

const router = express.Router();

// Create a new question (Admin only)
router.post(
  "/create",
  verifyAdmin,
  [check("question", "Question is required").notEmpty()],
  appraisalQuestionsController.createQuestion
);

// Get all questions (Public access or Admin)
router.get("/", appraisalQuestionsController.getAllQuestions);

// Update a question (Admin only)
router.put(
  "/:id",
  verifyAdmin,
  [check("question", "Question is required").notEmpty()],
  appraisalQuestionsController.updateQuestion
);

// Delete a question (Admin only)
router.delete("/:id", verifyAdmin, appraisalQuestionsController.deleteQuestion);

export default router;
