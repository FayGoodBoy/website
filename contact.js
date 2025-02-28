// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    databaseURL: "YOUR_FIREBASE_DATABASE_URL",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let submitBtn = document.querySelector(".btn");
    let loadingMessage = document.getElementById("loading");

    // Validasi input
    if (!name || !email || !message) {
        showNotification("⚠️ Semua kolom harus diisi!", "error");
        return;
    }

    if (!validateEmail(email)) {
        showNotification("❌ Email tidak valid!", "error");
        return;
    }

    // Tampilkan loading dan nonaktifkan tombol
    loadingMessage.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.innerText = "Mengirim...";

    // Simpan ke Firebase Database
    let contactRef = database.ref("contacts").push();
    contactRef.set({
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        showNotification("✅ Pesan berhasil dikirim!", "success");

        // Reset form setelah sukses
        document.getElementById("contactForm").reset();
    })
    .catch((error) => {
        showNotification("❌ Terjadi kesalahan: " + error.message, "error");
    })
    .finally(() => {
        // Sembunyikan loading & aktifkan kembali tombol
        loadingMessage.style.display = "none";
        submitBtn.disabled = false;
        submitBtn.innerText = "Kirim";
    });
});

// Fungsi validasi email
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// Fungsi menampilkan notifikasi
function showNotification(message, type) {
    let notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerText = message;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}
