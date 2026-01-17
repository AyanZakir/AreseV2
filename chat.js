function handleSend() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    
    if (text === "") return; // Don't send empty

    // 1. Add User Message to left
    appendMsg(text, 'user');
    input.value = "";
    input.style.height = "auto";

    // 2. Call the AI Engine (File 5)
    if (typeof triggerAI === "function") {
        triggerAI(text); 
    }
}

function appendMsg(text, type) {
    const container = document.getElementById('chat-container');
    const div = document.createElement('div');
    div.className = `${type}-msg`;
    div.innerText = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight; // Auto scroll
}
