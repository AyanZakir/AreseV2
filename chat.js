let isGenerating = false;

function handleSend() {
    const input = document.getElementById('user-input');
    if (isGenerating) {
        stopResponse(); //
    } else {
        if (!input.value.trim()) return;
        appendMsg(input.value, 'user');
        input.value = "";
        triggerAI();
    }
}

function triggerAI() {
    isGenerating = true;
    const btn = document.getElementById('action-btn');
    btn.innerHTML = '<i data-lucide="square-stop"></i>'; // Stop icon
    btn.style.backgroundColor = "#ff4b4b"; // Alert Red
    lucide.createIcons();
    // API logic follows in engine.js
}

function stopResponse() {
    isGenerating = false;
    const btn = document.getElementById('action-btn');
    btn.innerHTML = '<i data-lucide="arrow-up"></i>';
    btn.style.backgroundColor = "var(--blue)";
    lucide.createIcons();
}

