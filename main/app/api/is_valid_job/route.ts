import { GoogleGenerativeAI } from "@google/generative-ai";


export async function GET() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Say hi with three emojis";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    return Response.json({ res: result.response.text() });
}