import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";


export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();
    const q = formData.get("q");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        generationConfig: {
            responseMimeType: "application/json"
        },
    });

    const prompt = `Is this user input a valid job? ${q}
        Return the output in a JSON object format with the following structure:
        res: boolean
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