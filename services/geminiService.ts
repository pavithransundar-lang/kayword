import { GoogleGenAI, Type } from '@google/genai';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API Key not found');
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePracticeSentence = async (): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a single, simple, interesting sentence for a 2nd grade student to practice identifying the subject (Who), verb (Action), and detail (Where/When/How). The sentence should be about animals, space, or superheroes. Return ONLY the sentence text, nothing else.',
    });
    
    return response.text?.trim() || "The happy astronaut floated in space.";
  } catch (error) {
    console.error("Gemini error:", error);
    return "The quick brown fox jumps over the lazy dog."; // Fallback
  }
};

export const checkSentenceAnalysis = async (
  sentence: string,
  who: string[],
  action: string[],
  detail: string[]
): Promise<{ correct: boolean; feedback: string }> => {
  try {
    const ai = getAiClient();
    
    const prompt = `
      I am a 2nd grade student using the "Keyword Detective" method.
      
      My Sentence: "${sentence}"
      
      My Analysis:
      - WHO (Subject): ${who.join(', ') || '(nothing selected)'}
      - ACTION (Verb): ${action.join(', ') || '(nothing selected)'}
      - DETAIL (Object/Adjective/Phrase): ${detail.join(', ') || '(nothing selected)'}
      
      Did I get it right based on the "Keyword Detective" method (Who = subject, Action = verb, Detail = extra info)?
      
      Respond in JSON format:
      {
        "correct": boolean,
        "feedback": "string (Keep it simple, encouraging, and short. If wrong, give a hint based on the icons: Blue Star for Who, Red Lightning for Action, Green Puzzle for Detail.)"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                correct: { type: Type.BOOLEAN },
                feedback: { type: Type.STRING }
            }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini check error:", error);
    return {
      correct: false,
      feedback: "Oops! I couldn't check that right now. Try asking an adult!"
    };
  }
};