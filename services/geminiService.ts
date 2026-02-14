import { GoogleGenAI } from "@google/genai";
import { Student } from '../types';

// Initialize Gemini API
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStudentReport = async (student: Student): Promise<string> => {
  const ai = getAIClient();
  if (!ai) {
    return "API Key not configured. Unable to generate report.";
  }

  const prompt = `
    You are a professional high school academic advisor.
    Write a constructive, encouraging, but honest report card comment (approx 150 words) for the following student.
    
    Student Name: ${student.firstName} ${student.lastName}
    Grade Level: ${student.gradeLevel}
    GPA: ${student.gpa}
    Attendance Rate: ${student.attendanceRate}%
    Extracurriculars: ${student.activities?.join(', ') || 'None listed'}
    
    Subject Grades:
    ${student.grades.map(g => `- ${g.subject}: ${g.score} (${g.letter})`).join('\n')}
    
    Focus on strengths, identify 1 area for improvement if scores are below 85 in any subject, and conclude with a positive outlook.
    Format the response in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating report:", error);
    return "An error occurred while generating the report. Please try again later.";
  }
};
