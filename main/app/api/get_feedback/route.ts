import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();
    
    const jobTitle = formData.get("job-title") as string
    const PlayLoud = formData.get("playloud") as string;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        generationConfig: {
            responseMimeType: "application/json"
        },
    });

    const prompt = `You are an expert interview coach providing detailed feedback to users after a mock interview.
        Here is the interview summary:

        - Job Title: ${jobTitle}
        - Questions and Answers: ${PlayLoud}

        Analyze the responses and provide structured feedback in the following JSON format:

        res: {
            "question_feedback": [
                {
                    "question": "string",
                    "answer": "string",
                    "feedback": "string",
                    "score": number (1-10),
                }
            ],
            "overall_review": {
                "strengths": "string",
                "areas_for_improvement": "string",
                "final_recommendation": "string" (e.g., next steps, focus areas)
            }
        }
        Return: res

        Guidelines for feedback:
        - Provide constructive criticism and highlight strong points.
        - Mention clarity, confidence, and relevance of each answer.
        - Consider response time (if provided) in your feedback.
        - End with an overall review summarizing the performance and offering improvement suggestions.
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    return new Response(result.response.text(), {
        headers: {
            "content-type": "application/json",
        },
    });
}