document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    let timeLeft = 10;
    let gameActive = false;
    const scoreDisplay = document.getElementById("score");
    const timeDisplay = document.getElementById("time");
    const skull = document.getElementById("skull");
    const startBtn = document.getElementById("start-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");

    // Musik otomatis diputar saat halaman dimuat
    bgMusic.play().catch(() => {
        console.log("Autoplay diblokir oleh browser.");
    });

    // Toggle musik
    musicBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.textContent = "Music: On";
        } else {
            bgMusic.pause();
            musicBtn.textContent = "Music: Off";
        }
    });

    // Mulai game
    startBtn.addEventListener("click", function () {
        if (gameActive) return;
        gameActive = true;
        score = 0;
        timeLeft = 10;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        startBtn.disabled = true;

        let timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                gameActive = false;
                startBtn.disabled = false;
                alert("Time's up! Your final score: " + score);
            } else {
                timeLeft--;
                timeDisplay.textContent = timeLeft;
            }
        }, 1000);
    });

    // Klik skull untuk menaikkan skor dan memindahkan posisinya
    skull.addEventListener("click", function () {
        if (!gameActive) return;
        score++;
        scoreDisplay.textContent = score;

        // Pindahkan skull ke posisi acak
        const gameArea = document.getElementById("game-area");
        const maxX = gameArea.clientWidth - skull.clientWidth;
        const maxY = gameArea.clientHeight - skull.clientHeight;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        skull.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
});
