import { GoogleGenerativeAI } from "@google/generative-ai";

interface PlayLoud {
    questions: string[];
    answers: string[];
}

export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();
    
    const jobTitle = formData.get("job-title") as string
    const playoud = JSON.parse(formData.get("playoud") as string) as PlayLoud;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        generationConfig: {
            responseMimeType: "application/json"
        },
    });

    const prompt = `You are giving feedback to users after giving them a mock interview.
        Here is a brief overview of the script on how it went
        - Job title: ${jobTitle}
        - Interview questions asked: ${playoud.questions.join(", ")}
        - Answers given by the user: ${playoud.answers.join(", ")}

        Return the output in a JSON object format with the following structure:
            res: string[]
            Return: res
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    return new Response(result.response.text(), {
        headers: {
            "content-type": "application/json",
        },
    });
}