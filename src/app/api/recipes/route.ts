import { NextResponse } from "next/server";

type RecipeRequest = {
  ingredients: string[];
  preferences?: string;
  servings?: number;
};

type RecipeResponse = {
  title: string;
  timeMinutes: number;
  caloriesEstimate?: number;
  servings: number;
  ingredients: { item: string; amount?: string }[];
  instructions: string[];
  notes?: string;
  source: "openai" | "mock";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RecipeRequest;
    const ingredients = Array.isArray(body.ingredients)
      ? body.ingredients
      : [];
    const preferences = body.preferences?.trim() ?? "";
    const servings = body.servings && body.servings > 0 ? body.servings : 2;

    if (ingredients.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one ingredient." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      // Attempt to generate a recipe with OpenAI
      const prompt = `Create a concise recipe as JSON only. Use these ingredients: ${ingredients.join(
        ", "
      )}. Preferences: ${preferences || "none"}. Servings: ${servings}. \n\nReturn strictly JSON with keys: title (string), timeMinutes (number), caloriesEstimate (number), servings (number), ingredients (array of {item, amount}), instructions (array of strings), notes (string). Do not include any extra text.`;

      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are a helpful culinary assistant." },
              { role: "user", content: prompt },
            ],
            temperature: 0.7,
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`OpenAI error ${res.status}: ${text}`);
        }

        const data = await res.json();
        const content: string | undefined = data?.choices?.[0]?.message?.content;
        if (!content) throw new Error("No content from OpenAI");

        // Try to parse JSON content
        const parsed = JSON.parse(content);
        const response: RecipeResponse = {
          title: String(parsed.title ?? "Generated Recipe"),
          timeMinutes: Number(parsed.timeMinutes ?? 25),
          caloriesEstimate: parsed.caloriesEstimate ? Number(parsed.caloriesEstimate) : undefined,
          servings: Number(parsed.servings ?? servings),
          ingredients: Array.isArray(parsed.ingredients)
            ? parsed.ingredients.map((i: any) => ({ item: String(i.item), amount: i.amount ? String(i.amount) : undefined }))
            : ingredients.map((i: string) => ({ item: i })),
          instructions: Array.isArray(parsed.instructions)
            ? parsed.instructions.map((s: any) => String(s))
            : ["Mix ingredients", "Cook until done", "Serve and enjoy"],
          notes: parsed.notes ? String(parsed.notes) : undefined,
          source: "openai",
        };
        return NextResponse.json(response);
      } catch (err) {
        // Fallback to mock on any OpenAI failure
        console.error("OpenAI generation failed, falling back to mock:", err);
      }
    }

    // Mock generation when no API key or failure
    const title = `${ingredients[0]}-Forward Quick Bowl`;
    const response: RecipeResponse = {
      title,
      timeMinutes: 20,
      caloriesEstimate: 450,
      servings,
      ingredients: ingredients.map((i) => ({ item: i, amount: "to taste" })),
      instructions: [
        "Prep all ingredients and wash/trim as needed.",
        `Sauté aromatics, then add ${ingredients.join(", ")}.`,
        "Season, adjust texture with stock or water.",
        "Plate, garnish, and serve warm.",
      ],
      notes: preferences
        ? `Tailored for: ${preferences}. Adjust seasoning accordingly.`
        : "Adjust seasoning to preference. Add herbs or citrus for brightness.",
      source: "mock",
    };
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}

