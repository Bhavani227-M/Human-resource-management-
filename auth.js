const API_URL = "http://localhost:3000";


// =====================================
// SIGN UP
// =====================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const messageBox =
            document.getElementById("signupMessage");


        const fullName =
            document.getElementById("fullName").value.trim();

        const employeeId =
            document.getElementById("employeeId").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const department =
            document.getElementById("department").value;

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Frontend validation

        if (
            !fullName ||
            !employeeId ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            showMessage(
                messageBox,
                "Please fill all required fields.",
                "error"
            );

            return;
        }


        if (password.length < 8) {

            showMessage(
                messageBox,
                "Password must contain at least 8 characters.",
                "error"
            );

            return;
        }


        if (password !== confirmPassword) {

            showMessage(
                messageBox,
                "Passwords do not match.",
                "error"
            );

            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/api/auth/signup`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        fullName,
                        employeeId,
                        email,
                        phone,
                        department,
                        password,
                        confirmPassword

                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                showMessage(
                    messageBox,
                    data.message || "Signup failed.",
                    "error"
                );

                return;
            }


            showMessage(
                messageBox,
                "Account created successfully! Redirecting...",
                "success"
            );


            signupForm.reset();


            setTimeout(() => {

                window.location.href = "./index.html";

            }, 1500);


        } catch (error) {

            console.error(error);

            showMessage(
                messageBox,
                "Cannot connect to HRMS server. Make sure backend is running.",
                "error"
            );

        }

    });

}


// =====================================
// SIGN IN
// =====================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const messageBox =
            document.getElementById("loginMessage");


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        if (!email || !password) {

            showMessage(
                messageBox,
                "Please enter email and password.",
                "error"
            );

            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                showMessage(
                    messageBox,
                    data.message || "Login failed.",
                    "error"
                );

                return;
            }


            showMessage(
                messageBox,
                "Login successful!",
                "success"
            );


            // Role-based redirect

            setTimeout(() => {

                if (data.user.role === "ADMIN") {

                    window.location.href =
                        "./admin-dashboard.html";

                } else {

                    window.location.href =
                        "./employee-dashboard.html";

                }

            }, 1000);


        } catch (error) {

            console.error(error);

            showMessage(
                messageBox,
                "Cannot connect to HRMS server.",
                "error"
            );

        }

    });

}


// =====================================
// PASSWORD SHOW / HIDE
// =====================================

const togglePassword =
    document.getElementById(
        "toggleLoginPassword"
    );


if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function () {

            const password =
                document.getElementById(
                    "loginPassword"
                );


            if (password.type === "password") {

                password.type = "text";

                togglePassword.textContent = "Hide";

            } else {

                password.type = "password";

                togglePassword.textContent = "Show";

            }

        }
    );

}


// =====================================
// MESSAGE FUNCTION
// =====================================

function showMessage(element, message, type) {

    if (!element) return;


    element.style.display = "block";

    element.textContent = message;


    if (type === "success") {

        element.style.background = "#dcfce7";
        element.style.color = "#166534";
        element.style.borderColor = "#86efac";

    } else {

        element.style.background = "#fee2e2";
        element.style.color = "#991b1b";
        element.style.borderColor = "#fca5a5";

    }

}