// Matrix Rain Effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Auto show warning popup after 3 seconds
setTimeout(() => {
    document.getElementById("hacker-alert").style.display = "block";
}, 3000);

// Close popup function
function closePopup() {
    document.getElementById("hacker-alert").style.display = "none";
}

// Threatening messages appearing one by one
const messages = [
    "🔥 All your files have been encrypted 🔥",
    "💀 We are watching you... 💀",
    "🚨 Do not close this page 🚨",
    "🛑 Your data is being uploaded to our server 🛑",
];

let index = 0;

function showHackedMessage() {
    if (index < messages.length) {
        document.getElementById("hacked-message").innerText = messages[index];
        index++;
        setTimeout(showHackedMessage, 3000);
    }
}

setTimeout(showHackedMessage, 5000);
