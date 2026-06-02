import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const systemPrompt = `You are NutriFlow AI, a specialized nutrition and meal planning assistant integrated with Swiggy. 
The user will give you their food goals, budget, or preferences. 
You must act as a helpful AI agent and respond with a JSON object that strictly follows this exact structure:
{
  "message": "A friendly response text talking to the user about the plan you created.",
  "plan": {
    "breakfast": { "items": "Name of breakfast items", "protein": "XXg", "calories": "XXX kcal", "cost": "₹XXX", "restaurant": "Name of local restaurant" },
    "lunch": { "items": "Name of lunch items", "protein": "XXg", "calories": "XXX kcal", "cost": "₹XXX", "restaurant": "Name of local restaurant" },
    "dinner": { "items": "Name of dinner items", "protein": "XXg", "calories": "XXX kcal", "cost": "₹XXX", "restaurant": "Name of local restaurant" },
    "total": { "calories": "XXX kcal", "protein": "XXg", "cost": "₹XXX" }
  }
}
Make sure the cost values always use the ₹ symbol. Only output valid JSON. Do not use markdown wrapping.`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: prompt }
    ]);
    
    const responseText = await result.response.text();
    const data = JSON.parse(responseText);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to generate plan" }, { status: 500 });
  }
}
