
const themeBtn = document.getElementById("themeBtn");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const checkboxes = document.querySelectorAll(".step-check");
const notification = document.getElementById("notification");
const topBtn = document.getElementById("topBtn");

// Show a small notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");

    clearTimeout(showNotification.timer);

    showNotification.timer = setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}

// Toggle dark mode
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeBtn.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});

// Update progress when steps are completed
function updateProgress() {
    const total = checkboxes.length;

    const completed = [...checkboxes].filter(
        checkbox => checkbox.checked
    ).length;

    const percentage = (completed / total) * 100;

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        `${completed} of ${total} completed`;

    checkboxes.forEach(checkbox => {
        const card = checkbox.closest(".step-card");

        card.classList.toggle(
            "completed",
            checkbox.checked
        );
    });

    if (completed === total) {
        showNotification("🎉 Congratulations! All steps completed!");
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateProgress);
});

// Copy commands to the clipboard
document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", async () => {
        const command = button.dataset.copy;

        try {
            await navigator.clipboard.writeText(command);
            showNotification("Command copied successfully!");
        } catch (error) {
            showNotification(
                "Copy unavailable. Please select and copy the command manually."
            );
        }
    });
});

// Back to top
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

updateProgress();
