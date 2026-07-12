const button = document.querySelector("button");
const progress = document.querySelector(".progress strong");

if (button) {
    button.addEventListener("click", () => {
        button.textContent = "Lesson Completed";
        button.disabled = true;
        if (progress) {
            progress.textContent = "100%";
        }
        alert("Lesson completed successfully!");
    });
}