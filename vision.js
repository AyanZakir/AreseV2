/* vision.js - Arese OS v2.7 Image Engine */

async function generateImage(prompt, id) {
    try {
        const cleanPrompt = encodeURIComponent(prompt);
        const seed = Math.floor(Math.random() * 99999);
        
        // This URL generates a direct image from the prompt
        const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=1024&nologo=true&seed=${seed}`;

        const bubble = document.getElementById(id);
        bubble.innerHTML = `
            <div>
                <p>Visualization Complete: 🎨</p>
                <img src="${imageUrl}" class="media-content" style="border-color:var(--blue);" onclick="window.open(this.src)">
            </div>
        `;
    } catch (e) {
        document.getElementById(id).innerText = "Image Generation Failed. ⚠️";
    }
}
