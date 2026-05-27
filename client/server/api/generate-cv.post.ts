import { GoogleGenerativeAI } from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    const { jobDescription, highlights, length } = body;

    if (!jobDescription || !highlights || !length) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields",
      });
    }

    const genAI = new GoogleGenerativeAI(config.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `Create a professional CV in the form of a cover letter, similar to this format:

Dear hiring team,

I am writing to express my interest in the [Position] at [Company], as advertised. With [Your Education] and [Your Experience], I am excited about the opportunity to contribute to your team.

[2-3 paragraphs about your relevant experience, skills, and achievements]

[1-2 paragraphs about why you're interested in this specific role and company]

I am confident that my background and passion make me a strong candidate for this role. I am enthusiastic about the prospect of contributing to your team and am willing to undergo any necessary training to further enhance my capabilities. Thank you for considering my application. I look forward to the possibility of discussing how my experiences align with the needs of your team.

Sincerely,

[Your Name]

Use the following information to create the letter:
Job Description: ${jobDescription}

Candidate Highlights: ${highlights}

CV Length: ${length}

Important:
- Write in a professional, engaging tone
- Focus on relevant experience and skills
- Show enthusiasm for the role
- Keep it concise and well-structured
- Do not include any notes or explanations
- Do not use markdown formatting, just plain text with paragraphs
- Do not include placeholders like or [Position]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return { cv: response.text() };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Gemini API error:", message, error);

    const isQuotaOrRateLimit = message.includes("429") || message.includes("quota") || message.includes("Too Many Requests") || message.includes("RESOURCE_EXHAUSTED");

    if (isQuotaOrRateLimit) {
      throw createError({
        statusCode: 429,
        message: "CV generation is temporarily limited. Please wait a minute and try again.",
      });
    }

    console.error("Error generating CV:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to generate CV",
    });
  }
});
