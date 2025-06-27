import AsyncStorage from "@react-native-async-storage/async-storage";
import { GEMINI_API_KEY } from "@env";

export const generateTravelPlan = async ({
  placeName,
  address,
  days,
  budget,
}: {
  placeName: string;
  address: string;
  days: string;
  budget: string;
}) => {
  const prompt = `Make a travel plan for ${placeName}, ${address}. Number of days: ${days}, Budget: $${budget}`;
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const json = await response.json();
    return json?.candidates?.[0]?.content?.parts?.[0]?.text || "No plan received.";
  } catch (error) {
    console.error("Plan generation failed:", error);
    return "Error generating plan.";
  }
};

export const savePlanToStorage = async (planData: {
  placeName: string;
  address: string;
  days: string;
  budget: string;
  plan: string;
}) => {
  const key = `plan-${planData.placeName}`;
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify({ ...planData, createdAt: new Date().toISOString() })
    );
  } catch (err) {
    console.error("Error saving plan:", err);
  }
};
