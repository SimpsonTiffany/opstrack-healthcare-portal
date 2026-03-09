const homeSection = document.getElementById("homeSection");
const registerSection = document.getElementById("registerSection");
const loginSection = document.getElementById("loginSection");
const casesSection = document.getElementById("casesSection");
const statusOutput = document.getElementById("statusOutput");
const casesOutput = document.getElementById("casesOutput");

const homeBtn = document.getElementById("homeBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const showLoginBtn = document.getElementById("showLoginBtn");
const loadCasesBtn = document.getElementById("loadCasesBtn");
const logoutBtn = document.getElementById("logoutBtn");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

function showSection(section) {
    homeSection.classList.add("hidden");
    registerSection.classList.add("hidden");
    loginSection.classList.add("hidden");
    casesSection.classList.add("hidden");
    section.classList.remove("hidden");
}

homeBtn.addEventListener("click", () => showSection(homeSection));
showRegisterBtn.addEventListener("click", () => showSection(registerSection));
showLoginBtn.addEventListener("click", () => showSection(loginSection));

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    statusOutput.textContent = "Logged out.";
    showSection(homeSection);
});

registerBtn.addEventListener("click", async () => {
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        statusOutput.textContent = "Registration response: " + JSON.stringify(data);
    } catch (error) {
        statusOutput.textContent = "Registration failed.";
    }
});

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            statusOutput.textContent = "Login successful.";
        } else {
            statusOutput.textContent = "Login response: " + JSON.stringify(data);
        }
    } catch (error) {
        statusOutput.textContent = "Login failed.";
    }
});

loadCasesBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("/api/cases", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
            }
        });

        const data = await response.json();
        showSection(casesSection);
        casesOutput.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
        statusOutput.textContent = "Cases loaded.";
    } catch (error) {
        statusOutput.textContent = "Could not load cases.";
    }
});