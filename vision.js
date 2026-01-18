/* vision.js - Arese OS v2.5 Core Engine */

// Your Fal.ai Key for high-fidelity images
const FAL_KEY = "497d8139-336b-41b2-8a78-b23942a0ac51:fab2c66eee54d8b7f35e572984b75d75"; 

async function generateImage(prompt, id) {
    const bubble = document.getElementById(id);
    const loader = document.getElementById('logo-loader');
    
    // 1. Show the loading bar on the logo
    if(loader) loader.style.display = 'block';

    try {
        const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
            method: "POST",
            headers: {
                "Authorization": `Key ${FAL_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                prompt: prompt, 
                image_size: "square_hd" 
            })
        });

        const data = await response.json();
        const imageUrl = data.images[0].url;

        // 2. Hide loading bar
        if(loader) loader.style.display = 'none';

        // 3. Render with Watermark and perfect fit
        bubble.innerHTML = `
            <div style="width:100%; overflow:hidden;">
                <img src="${imageUrl}" 
                     style="width:100%; height:auto; border-radius:12px; border:1px solid var(--blue); margin-top:10px; display:block;" 
                     onclick="window.open('${imageUrl}')">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                    <span style="font-size:9px; color:var(--blue); opacity:0.6; font-weight:900;">Arese OS ✓</span>
                    <button onclick="navigator.share({url:'${imageUrl}'})" style="background:transparent; border:none; color:#fff; font-size:10px; cursor:pointer;">SHARE</button>
                </div>
            </div>
        `;

    } catch (error) {
        if(loader) loader.style.display = 'none';
        bubble.innerText = "Vision Engine timed out. Check credits. ⚠️";
    }
}
