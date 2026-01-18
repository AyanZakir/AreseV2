/* vision.js - Arese OS v3.0 (Fal.ai Engine) */

const FAL_KEY = "497d8139-336b-41b2-8a78-b23942a0ac51:fab2c66eee54d8b7f35e572984b75d75"; 

async function generateImage(prompt, id) {
    const bubble = document.getElementById(id);
    try {
        const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
            method: "POST",
            headers: {
                "Authorization": `Key ${FAL_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: prompt, image_size: "square_hd" })
        });

        const data = await response.json();
        const imageUrl = data.images[0].url;

        // FIXED DISPLAY: Image fits bubble + Save/Share buttons
        bubble.innerHTML = `
            <div style="width:100%;">
                <img src="${imageUrl}" class="ai-img" id="img-${id}">
                <div class="img-controls">
                    <button class="action-btn" onclick="window.open('${imageUrl}')">SAVE</button>
                    <button class="action-btn" onclick="navigator.share({url:'${imageUrl}'})">SHARE</button>
                </div>
            </div>
        `;
    } catch (e) {
        bubble.innerText = "Vision Error: Rate Limit or Key Failure. ⚠️";
    }
}
