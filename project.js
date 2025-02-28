document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Mode Gelap (Dark Mode)
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        if (themeToggle) themeToggle.textContent = "☀️";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("dark-mode", "enabled");
                themeToggle.textContent = "☀️";
            } else {
                localStorage.setItem("dark-mode", "disabled");
                themeToggle.textContent = "🌙";
            }
        });
    }

    // 🔹 Animasi Mengetik untuk Teks "Programmer" & "Networking"
    const words = [
        { text: "Programmer", color: "#6C44E0" },
        { text: "Networking", color: "#E0446C" }
    ];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const textElement = document.getElementById("changing-text");
    const boxElement = document.querySelector(".changing-box");

    function typeEffect() {
        if (!textElement) return;
        
        let currentWord = words[index].text;
        let currentColor = words[index].color;

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        boxElement.style.backgroundColor = currentColor;

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (textElement) typeEffect();

    // 🔹 Spotify Clone - Playlist
    const audioPlayer = document.getElementById("audioPlayer");
    const playlistItems = document.querySelectorAll("#playlist li");

    const songs = [
        { name: "White Tee - Lil Peep", src: "White Tee.mp3" },
        { name: "Dessert - Dawin", src: "Dawin - Dessert (Audio).mp3" },
        { name: "Work - Mr.BakeOut", src: "Work.mp3" }
    ];

    function playSong(index) {
        audioPlayer.src = songs[index].src;
        audioPlayer.play();

        // Hapus class 'playing' dari semua item
        playlistItems.forEach(item => item.classList.remove("playing"));

        // Tambahkan class 'playing' ke lagu yang sedang diputar
        playlistItems[index].classList.add("playing");

        // Saat lagu selesai, mainkan lagu berikutnya
        audioPlayer.onended = function () {
            let nextIndex = (index + 1) % songs.length;
            playSong(nextIndex);
        };
    }

    playlistItems.forEach((item, index) => {
        item.addEventListener("click", () => playSong(index));
    });

    // 🔹 Tambahkan Copyright Dinamis
    const copyright = document.createElement("footer");
    copyright.className = "copyright";
    copyright.innerHTML = "&copy; 2025 FayGoodBoy. All Rights Reserved.";

    const playerContainer = document.querySelector(".player-container");
    if (playerContainer) playerContainer.appendChild(copyright);
});
