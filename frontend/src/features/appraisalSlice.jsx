import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Define base URL

// Fetch appraisal questions
export const fetchQuestions = createAsyncThunk(
  "appraisal/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions`);
      return response.data;
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
      console.log("New question added:", response.data); // Log response data
      return response.data;
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
      return id;
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
  initialState: { questions: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (question) => question._id !== action.payload
        );
      });
  },
});

export default appraisalSlice.reducer;
