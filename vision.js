/* vision.js - Arese OS v3.0 Pro Image Engine */

const FAL_KEY = "497d8139-336b-41b2-8a78-b23942a0ac51:fab2c66eee54d8b7f35e572984b75d75"; 

async function generateImage(prompt, id) {
    const bubble = document.getElementById(id);
    
    // Switch between FLUX models based on Arese mode
    let endpoint = "fal-ai/flux/schnell"; 
    if (window.currentMode === "think") endpoint = "fal-ai/flux/dev";
    if (window.currentMode === "pro") endpoint = "fal-ai/flux-pro/v1.1";

    try {
        const response = await fetch(`https://fal.run/${endpoint}`, {
            method: "POST",
            headers: {
                "Authorization": `Key ${FAL_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                image_size: "square_hd",
                sync_mode: true
            })
        });

        const data = await response.json();
        const imageUrl = data.images[0].url;

        bubble.innerHTML = `
            <div style="text-align:left;">
                <p style="font-size:11px; color:var(--blue);">Rendered by ${endpoint.split('/')[2].toUpperCase()} 🎨</p>
                <img src="${imageUrl}" style="width:100%; border-radius:15px; border:1px solid var(--blue); margin-top:5px;" onclick="window.open(this.src)">
                <small style="opacity:0.5; display:block; margin-top:5px;">Tap image to view in 4K</small>
            </div>
        `;
    } catch (error) {
        bubble.innerText = "Vision Engine authentication failed. Check key. ⚠️";
    }
}
