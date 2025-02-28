// Animasi Fade In Saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(10px)";
        setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            element.style.transition = "opacity 1.5s ease-in-out, transform 1.5s ease-in-out";
        }, 300);
    });
});
