/* media.js - Arese OS v2.0 Media & Security Module */

let deleteStage = 0;
let currentStream = null;
let useFrontCamera = true;

// 1. THE FLOATING TRAY LOGIC
function toggleMedia() {
    const tray = document.getElementById('media-tray');
    tray.classList.toggle('hidden');
}

// 2. PICKER LOGIC (Permissions)
async function pick(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type;
    
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            appendMsg(`📎 Uploading ${file.name}...`, 'user');
            // Logic to send to Groq Vision or storage follows
        }
        toggleMedia();
    };
    input.click();
}

// 3. CAMERA ENGINE (Flip & Flash)
async function openCam() {
    toggleMedia();
    appendMsg("Initializing Secure Camera...", 'ai');
    
    try {
        const constraints = {
            video: { facingMode: useFrontCamera ? "user" : "environment" }
        };
        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Show camera in a glass overlay (You can add a <video> tag for this)
        appendMsg("Camera Active. Tap to flip or toggle Flashlight.", 'ai');
    } catch (err) {
        appendMsg("⚠️ Permission Denied: Storage/Camera access required.", 'ai');
    }
}

function flipCamera() {
    useFrontCamera = !useFrontCamera;
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        openCam();
    }
}

async function toggleFlash(state) {
    if (currentStream) {
        const track = currentStream.getVideoTracks()[0];
        try {
            await track.applyConstraints({ advanced: [{ torch: state }] });
        } catch (e) {
            appendMsg("Flashlight not supported on this lens.", 'ai');
        }
    }
}

// 4. "I AM SURE" DELETE LOGIC (Double Verification)
function requestDelete() {
    deleteStage = 1;
    appendMsg("⚠️ WARNING: Are you sure you want to delete all chat history? This cannot be undone.", "ai");
}

// This function intercepts the "execute" logic to check for the deletion phrase
function checkSecurityPhrase(text) {
    if (deleteStage === 1) {
        appendMsg("Confirming... Type 'I Am Sure' to proceed with total deletion.", "ai");
        deleteStage = 2;
        return true; // Stop normal AI response
    }
    
    if (deleteStage === 2 && text.toLowerCase() === "i am sure") {
        clearAllChats();
        deleteStage = 0;
        return true;
    } else if (deleteStage === 2) {
        deleteStage = 0;
        appendMsg("❌ Deletion cancelled. Security phrase incorrect.", "ai");
        return true;
    }
    return false;
}

function clearAllChats() {
    document.getElementById('chat-container').innerHTML = "";
    localStorage.removeItem('arese_chats');
    appendMsg("✅ Memory wiped successfully.", "ai");
    }

