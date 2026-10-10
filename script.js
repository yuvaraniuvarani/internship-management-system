
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Display messages
function showMessage(element, message, isSuccess) {
  element.textContent = message;
  element.className = "form-message " +
    (isSuccess ? "success" : "error");
}

// Apply Now buttons
document.querySelectorAll(".apply-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const internship = button.dataset.internship;
    document.getElementById("appInternship").value = internship;
    document.getElementById("application").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Submit application to backend
const applicationForm = document.getElementById("applicationForm");
const applicationMessage = document.getElementById("applicationMessage");

applicationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(applicationForm);

  const application = {
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    internship: formData.get("internship"),
    education: formData.get("education").trim(),
    message: formData.get("message").trim()
  };

  showMessage(applicationMessage, "Submitting application...", true);

  try {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(application)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Submission failed.");
    }

    showMessage(
      applicationMessage,
      result.message || "Application submitted successfully!",
      true
    );

    applicationForm.reset();
  } catch (error) {
    showMessage(
      applicationMessage,
      error.message === "Failed to fetch"
        ? "Cannot connect to the server. Please check that the backend is running."
        : error.message,
      false
    );
  }
});

// Login form - sends credentials to backend demo API
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  showMessage(loginMessage, "Checking connection...", true);

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    showMessage(
      loginMessage,
      result.message || "Request completed.",
      response.ok
    );
  } catch (error) {
    showMessage(
      loginMessage,
      "Cannot connect to the server. Please try again.",
      false
    );
  }
});