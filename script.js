document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Mode Gelap (Tetap)
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

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

    // 🔹 Data untuk animasi mengetik & link yang sesuai
    const words = [
        { text: "Programmer", color: "#6C44E0", link: "game.html" }, // Ungu
        { text: "Networking", color: "#E0446C", link: "404.html" },  // Merah Muda
        { text: "Editing", color: "#44E06C", link: "project.html" }  // Hijau
    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const textElement = document.getElementById("changing-text");
    const boxElement = document.querySelector(".changing-box");
    const changingLink = document.getElementById("changing-link");

    function typeEffect() {
        let currentWord = words[index].text;
        let currentColor = words[index].color;
        let currentLink = words[index].link;

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        boxElement.style.backgroundColor = currentColor; // Ubah warna kotak
        changingLink.href = currentLink; // Ubah tujuan link

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; // Tunggu sebelum hapus
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % words.length;
            typingSpeed = 500; // Jeda sebelum mulai mengetik lagi
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect(); // Jalankan animasi mengetik

    // 🔹 Menu Toggle untuk Navigasi Responsif
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});
