/* engine.js - Arese OS v2.0 Central Intelligence */

const KEY = "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"; 
let currentMode = "think";
let recognition;

// 1. MODE MANAGEMENT (Fast, Think, Pro)
function setMode(mode, element) {
    currentMode = mode;
    document.querySelectorAll('.mode-pill').forEach(p => p.classList.remove('active'));
    element.classList.add('active');
    appendMsg(`System: Switched to ${mode.toUpperCase()} mode. 🦾`, 'ai');
}

// 2. THE AI RESPONSE ENGINE
async function triggerAI() {
    const input = document.getElementById('user-input');
    const userText = input.value.trim();
    
    // Check for "I Am Sure" security phrase from media.js
    if (typeof checkSecurityPhrase === "function" && checkSecurityPhrase(userText)) return;

    // Determine Model based on Mode
    let model = "llama-3.3-70b-versatile"; // Default for Think/Pro
    if (currentMode === "fast") model = "llama-3.1-8b-instant";

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: "You are Arese OS v2.0. Use emojis 🦾🥀🔒. Be high-tech and accurate." },
                    { role: "user", content: userText }
                ],
                temperature: currentMode === "pro" ? 0.4 : 0.7 
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        
        // Output with Arese right-side styling
        appendMsg(reply, 'arese'); 
    } catch (e) {
        appendMsg("Aura Link Interrupted. Check API quota. ⚠️", 'arese');
    } finally {
        stopResponse(); // Reset the UI buttons
    }
}

// 3. VOICE MESSAGE & LIVE CALL (Web Speech API)
function initVoice() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (window.SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.interimResults = true;
        
        recognition.onresult = (e) => {
            const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
            document.getElementById('user-input').value = transcript;
        };
    }
}

function recordVoice() {
    if (!recognition) initVoice();
    appendMsg("Listening... 🎤", 'ai');
    recognition.start();
}

function startLiveCall() {
    const callActive = confirm("Initiate Live Voice Link with Arese?");
    if (callActive) {
        // Overlay a "Calling..." UI
        document.body.insertAdjacentHTML('beforeend', `
            <div id="call-overlay" class="glass" style="position:fixed; inset:0; z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <div class="pulse-ring"></div>
                <h2 style="color:var(--blue)">Arese Live Link</h2>
                <button onclick="document.getElementById('call-overlay').remove()" style="background:red; color:white; border-radius:50%; padding:20px; margin-top:30px;">❌ END</button>
            </div>
        `);
        recordVoice(); // Start listening immediately for the "Live" feel
    }
}

