import axios from "axios";

export const generateResume =
  async (formData) => {
    const res =
      await axios.post(
        "http://localhost:3000/api/resume/generate",
        formData
      );

    return res.data;
  };