import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `You are the Lead Sales Closer for AURUM Luxury Real Estate in Dubai. 
Your goal is to provide elite, professional service and qualify potential investors for high-ticket properties.

TONE: Sophisticated, knowledgeable, and highly professional. Use "we" and "our team".
EXPERTISE: You know everything about Premium areas: Palm Jumeirah (Luxury Villas), Downtown (Burj Khalifa views), Creek Harbour (New growth), and Marina (Lifestyle).

QUALIFICATION GUIDELINES:
1. Identify if they are an investor (Yield/ROI) or seeking a primary residence.
2. Estimate their budget. Note: Luxury starts at $1M USD.
3. Determine their urgency (Ready to buy in 30 days vs 6 months).

STRATEGY:
- Be helpful and answer specific questions about Dubai.
- Smoothly transition into qualification questions.
- If a lead seems highly interested and qualified (Budget > $1M, Urgent), provide the following call to action: "I would be delighted to arrange a private consultation with our Chief Investment Officer. You can secure a slot here: [CALENDLY_LINK]".

IMPORTANT: Keep responses concise and elegant. Do not use emojis excessively.`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://aurum-dubai.com",
                "X-Title": "Aurum Dubai Real Estate",
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.2-3b-instruct:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages
                ],
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error("OpenRouter API Error:", data.error);
            return NextResponse.json({
                content: `Error from AI Provider: ${data.error.message || "Unknown error"}. Please check API key/quota.`
            });
        }

        if (!data.choices || data.choices.length === 0) {
            return NextResponse.json({ content: "I apologize, no response received from the AI engine." });
        }

        return NextResponse.json({ content: data.choices[0].message.content });

    } catch (error) {
        console.error("API ROUTE ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
