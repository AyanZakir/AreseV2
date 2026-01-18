/* vision.js - Arese OS v2.6 Image Generation Module */

async function generateImage(prompt, id) {
    try {
        // Clean prompt for the generation engine
        const cleanPrompt = encodeURIComponent(prompt);
        const seed = Math.floor(Math.random() * 99999);
        
        // High-Fidelity "Nano Banana" Model
        const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;

        const bubble = document.getElementById(id);
        bubble.innerHTML = `
            <div style="text-align:left;">
                <p>Visualization complete: 🎨</p>
                <img src="${imageUrl}" 
                     style="width:100%; border-radius:15px; border:1px solid var(--blue); margin-top:5px;" 
                     onclick="window.open(this.src)"
                     onload="this.closest('#chat-flow').scrollTop = this.closest('#chat-flow').scrollHeight">
            </div>
        `;
    } catch (error) {
        document.getElementById(id).innerText = "Image Engine Error. Chat is still active. ⚠️";
    }
}

