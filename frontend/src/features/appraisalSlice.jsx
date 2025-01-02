import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Define base URL

// Fetch appraisal questions
export const fetchQuestions = createAsyncThunk(
  "appraisal/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions`);
      return response.data; // Return data directly
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching questions"
      );
    }
  }
);

// Create a new appraisal question
export const createQuestion = createAsyncThunk(
  "appraisal/createQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/questions/create`,
        question,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data; // Return newly created question
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating question"
      );
    }
  }
);

// Delete an appraisal question
export const deleteQuestion = createAsyncThunk(
  "appraisal/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // Return the id of the deleted question
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting question"
      );
    }
  }
);

// Appraisal slice
const appraisalSlice = createSlice({
  name: "appraisal",
  initialState: {
    questions: [],
    status: "idle", // Could be "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {
    // Additional reducers (if any) can be added here
  },
  extraReducers: (builder) => {
    builder
      // Fetch Questions
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Set the error message
      })

      // Create Question
      .addCase(createQuestion.pending, (state) => {
        state.status = "loading"; // Optionally, set a loading state during creation
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions.push(action.payload); // Add the newly created question
        state.error = null; // Reset error on success
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Set error message on failure
      })

      // Delete Question
      .addCase(deleteQuestion.pending, (state) => {
        state.status = "loading"; // Optionally, set a loading state during deletion
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = state.questions.filter(
          (question) => question._id !== action.payload
        ); // Remove deleted question from the state
        state.error = null; // Reset error on success
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Set error message on failure
      });
  },
});

export default appraisalSlice.reducer;
