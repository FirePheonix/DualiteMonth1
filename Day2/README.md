# Project Setup
    
To run this project, follow these steps:
    
    1. Extract the zip file.
    2. Run `npm install` to install dependencies.
    3. Go to : https://rapidapi.com/ytjar/api/youtube-mp36 
    <img width="1836" height="821" alt="image" src="https://github.com/user-attachments/assets/dacf1f11-9bee-48b6-af0b-ee9546b5ce0a" /> 
    4. Fetch your API keys
    <img width="1833" height="822" alt="image" src="https://github.com/user-attachments/assets/4f57e943-c12b-43fe-8835-71c797c20a7e" />
    5. Run `npm run dev` to start the development server.
    6. When asked, place your API keys.
    
    This project was generated through Alpha. For more information, visit [dualite.dev](https://dualite.dev).
    LINK: https://youtubee2mp3.netlify.app 

# PROMPTS:
    
#  Prompt1:
    
    Design a luxury-style fullscreen landing page hero section for a YouTube to MP3 converter tool.

    - Use a **fullscreen background video** (I’ll upload my own). It should have a soft dark overlay for elegance and readability (e.g., black with 40–60% opacity). - Layout: - Keep text **left-aligned**, vertically centered. - Use **clean, elegant, serif or modern sans-serif typography**. - High contrast between background and text (e.g., white on black or gold on deep blue). - Hero Text Content: **Headline (very large):** Convert Sound, Keep the Soul.
    mathematica
    Copy
    Edit
    
    - Font size: ~6vw - Font: Elegant (e.g., Playfair Display, EB Garamond, or Inter with high tracking) - Weight: Medium to Semi-Bold - Color: White or #F5F5F5
    Subheadline:
    The cleanest way to turn YouTube videos into beautiful, high-quality MP3s.
    
    markdown
    Copy
    Edit
    
    - Font size: ~1.2rem - Color: Light gray (`#cccccc`) - Bottom right (optional paragraph for desktop): Fast. Free. No ads. Whether it's a podcast, a music video, or a lecture — extract pristine audio effortlessly.
    markdown
    Copy
    Edit
    
    - Font size: ~0.9rem - Style: Subtle and soft - Navbar (top): - Left: Logo “MuseRip” - Center: `How it Works | Privacy | Support` - Right: CTA button: `Paste Link`, styled as a frosted glass button or minimal white outline button with elegant hover - Style direction: - Overall aesthetic should be **refined, distraction-free, and premium** - Use soft transitions and subtle animations - Typography and layout should feel like a luxury brand — not a cheap converter tool - Mobile Responsive: Text scales cleanly, menu collapses into hamburger, CTA remains clear.


# Prompt2:

    now, the HTTPS api endpoint for rapid-api's youtube to mp3 tool is like this:
    
    GET /dl?id=UxxajLWwzqY HTTP/1.1
    X-Rapidapi-Key: <USER'S API KEY, ASK IT DYNAMICALLY>
    X-Rapidapi-Host: youtube-mp36.p.rapidapi.com
    Host: youtube-mp36.p.rapidapi.com
    
    could you make it?

# Prompt3: 
    
    firstly, when the conversion is completed, the entire hero section goes OUT of the div and somehow gets into the navbar.
    I'm not able to download the MP3 file
    And DYNAMICALLY ask the user for his API key instead of it being in the .env file. The host links will be in .env, but the API KEYS will be asked by the user.
