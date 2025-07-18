# Project Setup
    
    To run this project, follow these steps:
    
    1. Extract the zip file.
    2. Run `npm install` to install dependencies.
    3. Run `npm run dev` to start the development server.
    
    Link: https://nft-gemini-generator.vercel.app 

 ##   PROMPTs:

 ##   Prompt1:
    generate a landing page with a playful NFT image generator hero section, using:
    
    Large, bold typography
    
    Left-aligned layout like the image you shared
    
    Background video (you’ll upload your own)
    
    md
    Copy
    Edit
    Create a fullscreen landing page hero section for a playful NFT image generator.
    
    - Use a fullscreen autoplay background video (I’ll provide the video myself). - Overlay a dark gradient or semi-transparent black layer for contrast. - On the **left side**, place large, bold, uppercase typography: **Headline:** Make NFTs That Make Noise
    kotlin
    Copy
    Edit
    
    - Use extremely large font size (like `7vw`) - Font should be bold, modern, and playful (e.g., "Space Grotesk", "Rubik", "Chakra Petch") - Text color: pure white - Below the heading, add a fun subtext: Unleash your creativity. Click once. Boom — it's art.
    markdown
    Copy
    Edit
    
    - Font size: ~1.1rem - Color: semi-transparent white (`#ffffffcc`) - In the **bottom right**, include a small paragraph in a lighter tone: It’s not just an image — it’s your digital statement. Use our AI-powered generator to craft collectible art that’s wild, weird, and uniquely yours.
    markdown
    Copy
    Edit
    
    - Add a top navbar: - Left: Logo “NFTCrafter” - Center: `How it Works | Gallery | FAQ` - Right: Rounded button “Generate” with hover scale effect - Style should be bold, energetic, and quirky. Think glitch, vaporwave, or street art vibes. Use smooth transitions, slight hover effects, and ultra-modern layout. - The page must be fully responsive and mobile-friendly.
    
    




##    Prompt2:
    THIS is the Gemini's RestAPI for gemini's image generation model, use THIS code for image generation.
    Here's my GEMINI API KEY: GEMINI_API_KEY

    curl -s -X POST 
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "contents": [{
          "parts": [
            {"text": "Hi, can you create a 3d rendered image of a pig with wings and a top hat flying over a happy futuristic scifi city with lots of greenery?"}
          ]
        }],
        "generationConfig":{"responseModalities":["TEXT","IMAGE"]}
      }' \
      | grep -o '"data": "[^"]*"' \
      | cut -d'"' -f4 \
      | base64 --decode > gemini-native-image.png
