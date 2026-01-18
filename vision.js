/**
 * Arese OS v2.5 - Vision & Imaging Engine
 * Handles: Image Generation, Camera Access, and Media Processing
 */

const VisionEngine = {
    config: {
        falKey: "497d8139-336b-41b2-8a78-b23942a0ac51:fab2c66eee54d8b7f35e572984b75d75",
        status: "Online",
        watermark: "Arese OS ✓"
    },

    // 1. GENERATE IMAGE (The fix for your Vision Error)
    async generate(prompt, outputId, ringId) {
        const target = document.getElementById(outputId);
        const ring = document.getElementById(ringId);

        // Set "Analyzing..." state
        target.innerText = "Analyzing...";
        ring.style.display = "block";

        try {
            const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
                method: "POST",
                headers: { 
                    "Authorization": `Key ${this.config.falKey}`, 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ 
                    prompt: `Professional high-quality render: ${prompt}`,
                    image_size: "square" 
                })
            });

            if (!response.ok) throw new Error("API_REJECTED");

            const data = await response.json();
            const imageUrl = data.images[0].url;

            // Render with Save/Share buttons
            ring.style.display = "none";
            target.innerHTML = `
                I've visualized that for you! 🎨
                <div class="img-card" style="width:100%; border-radius:15px; border:1px solid #00d2ff; margin-top:10px; overflow:hidden;">
                    <img src="${imageUrl}" style="width:100%; display:block;">
                    <div class="img-footer" style="display:flex; background:#111; padding:10px; gap:10px;">
                        <button onclick="window.open('${imageUrl}')" class="img-btn-style"><i data-lucide="download"></i> SAVE</button>
                        <button onclick="navigator.share({url:'${imageUrl}'})" class="img-btn-style"><i data-lucide="share-2"></i> SHARE</button>
                    </div>
                </div>
                <span class="watermark" style="color:#00d2ff; font-size:9px; font-weight:800;">${this.config.watermark}</span>
            `;
            
            // Save to recent creations gallery
            this.addToGallery(imageUrl);
            lucide.createIcons();

        } catch (error) {
            console.error("Vision Error:", error);
            ring.style.display = "none";
            target.innerText = "Vision Engine Error. Ensure API keys are active. ⚠️";
        }
    },

    // 2. CAMERA/PHOTO HANDLER (Fixes the + Menu errors)
    async openMedia(type) {
        // This triggers the device's native file/camera picker
        const input = document.createElement('input');
        input.type = 'file';
        
        if (type === 'Camera') input.capture = 'environment';
        if (type === 'Photos' || type === 'Video') input.accept = 'image/*,video/*';
        if (type === 'Document') input.accept = '.pdf,.doc,.txt';
        if (type === 'Audio') input.accept = 'audio/*';

        input.onchange = (e) => {
            const file = e.target.files[0];
            appendMsg(`Arese received: ${file.name} (Ready for processing)`, 'ai');
        };
        input.click();
    },

    // 3. GALLERY SYSTEM
    addToGallery(url) {
        let imgs = JSON.parse(localStorage.getItem('arese_v2_imgs') || "[]");
        imgs.unshift(url);
        localStorage.setItem('arese_v2_imgs', JSON.stringify(imgs.slice(0, 6)));
        if (typeof loadHistory === "function") loadHistory();
    }
};
