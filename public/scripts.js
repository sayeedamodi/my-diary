// public/scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    // Simulate loading time for demo purposes
    setTimeout(() => {
        spinner.style.display = "none";
    }, 2000);
});
