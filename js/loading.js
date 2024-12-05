document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splash-screen");
    const loginForm = document.getElementById("login-form");

    // Simular un tiempo de carga (por ejemplo, 3 segundos)
    setTimeout(() => {
        splashScreen.style.display = "none"; // Ocultar splash screen
        loginForm.style.display = "block"; // Mostrar formulario de login
    }, 3000); // 3000 ms = 3 segundos
});
