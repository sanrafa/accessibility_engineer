const closeBtn = document.getElementById("reminder-close");
const reminder = document.getElementById("reminder");

closeBtn.addEventListener("click", () => (reminder.style.display = "none"));
