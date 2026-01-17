const KEY = "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"; 
let currentMode = "llama-3.3-70b-versatile";

function setMode(m) {
    currentMode = (m === 'fast') ? "llama-3.1-8b-instant" : "llama-3.3-70b-versatile";
    document.querySelectorAll('.m-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('m-'+m).classList.add('active');
}

async function execute() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if(!text) return;

    appendMsg(text, 'user');
    input.value = "";
    
    const aiId = "ai-" + Date.now();
    appendMsg(`<span id="${aiId}">...</span>`, 'arese');
    
    try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ 
                model: currentMode, 
                messages: [
                    {role:"system", content:"You are Arese OS v2.0. Use emojis 🦾🥀🔒. Talk to the user on the right side."},
                    {role:"user", content:text}
                ] 
            })
        });
        const data = await res.json();
        const reply = data.choices[0].message.content;
        
        document.getElementById(aiId).innerText = "";
        new Typed(`#${aiId}`, { strings: [reply], typeSpeed: 20, showCursor: false });
    } catch (e) {
        document.getElementById(aiId).innerText = "Aura Link Error. ⚠️";
    }
}
