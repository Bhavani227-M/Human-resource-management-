import { useState } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    employeeId: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password.");
        return;
      }

      setRole(data.user.role);
      setMessage("Login successful!");

      // Redirect based on role
      if (data.user.role === "ADMIN") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/employee/dashboard";
      }
    } catch (error) {
      setMessage("Unable to connect to server.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.employeeId ||
      !signupData.password
    ) {
      setMessage("Please fill all required fields.");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (signupData.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...signupData,
          role: "EMPLOYEE",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed.");
        return;
      }

      setMessage("Account created successfully!");

      setTimeout(() => {
        setPage("login");
      }, 1200);
    } catch (error) {
      setMessage("Unable to connect to server.");
    }
  };

  return (
    <div className="app">
      <div className="auth-container">

        {/* LEFT SIDE */}
        <div className="brand-section">
          <div className="brand-content">
            <div className="logo">HR</div>

            <h1>SmartHR</h1>

            <p>
              Human Resource Management System
            </p>

            <div className="feature-list">
              <div>✓ Secure Authentication</div>
              <div>✓ Employee Management</div>
              <div>✓ Attendance Tracking</div>
              <div>✓ Leave Management</div>
              <div>✓ Role Based Access</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="form-section">

          {/* LOGIN */}
          {page === "login" && (
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-header">
                <h2>Welcome Back 👋</h2>
                <p>Sign in to your HRMS account</p>
              </div>

              {message && (
                <div className="message">
                  {message}
                </div>
              )}

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Password</label>

                <div className="password-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    className="show-btn"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setMessage("");
                    setPage("forgot");
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <button className="primary-btn" type="submit">
                Sign In
              </button>

              <p className="switch-text">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setMessage("");
                    setPage("signup");
                  }}
                >
                  Create Account
                </button>
              </p>
            </form>
          )}

          {/* SIGNUP */}
          {page === "signup" && (
            <form className="auth-form signup-form" onSubmit={handleSignup}>
              <div className="form-header">
                <h2>Create Account</h2>
                <p>Register as an HRMS employee</p>
              </div>

              {message && (
                <div className="message">
                  {message}
                </div>
              )}

              <div className="two-columns">
                <div className="input-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Employee ID *</label>
                  <input
                    type="text"
                    placeholder="EMP001"
                    value={signupData.employeeId}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        employeeId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="two-columns">
                <div className="input-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={signupData.phone}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Department</label>
                  <select
                    value={signupData.department}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        department: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Department</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>

              <div className="two-columns">
                <div className="input-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="security-note">
                🔒 Your password will be securely encrypted.
              </div>

              <button className="primary-btn" type="submit">
                Create Account
              </button>

              <p className="switch-text">
                Already have an account?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setMessage("");
                    setPage("login");
                  }}
                >
                  Sign In
                </button>
              </p>
            </form>
          )}

          {/* FORGOT PASSWORD */}
          {page === "forgot" && (
            <ForgotPassword
              setPage={setPage}
              setMessage={setMessage}
              message={message}
            />
          )}

        </div>
      </div>
    </div>
  );
}


function ForgotPassword({ setPage, setMessage, message }) {
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      setMessage(
        data.message ||
          "If the email exists, a reset link will be sent."
      );
    } catch {
      setMessage("Unable to connect to server.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleForgot}>
      <div className="form-header">
        <h2>Forgot Password?</h2>
        <p>Enter your registered email to reset your password.</p>
      </div>

      {message && (
        <div className="message">
          {message}
        </div>
      )}

      <div className="input-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="primary-btn" type="submit">
        Send Reset Link
      </button>

      <p className="switch-text">
        Remember your password?{" "}
        <button
          type="button"
          className="link-button"
          onClick={() => {
            setMessage("");
            setPage("login");
          }}
        >
          Back to Sign In
        </button>
      </p>
    </form>
  );
}