import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();
    
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        generationConfig: {
            responseMimeType: "application/json"
        },
    });

    const prompt = `Generate 3 interview questions for the following: 
        -Job title: ${jobTitle}
        -Job description: ${jobDescription}

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