import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

def summarize_text(text):
    prompt = f"""
    Summarize the following text in 5 bullet points:

    {text}
    """
    response = model.generate_content(prompt)
    return response.text

# Example
summary = summarize_text("Very long article text here...")
print(summary)
