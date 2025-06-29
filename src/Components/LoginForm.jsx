import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(false);
  const [volatileAttempts, setVolatileAttempts] = useState(0);
  const navigate = useNavigate();
  const isEmailValid = () => /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
  const isPasswordValid = () => password.length >= 6;
  const isFormValid = () => isEmailValid() && isPasswordValid();
  const licenseExpiryDate = new Date("2025-07-27");
  const handleLogin = (e) => {
    e.preventDefault();
    const today = new Date();
    const TWO_HOURS = 2 * 60 * 60 * 1000;
    const storedAttempts =
      (remember && JSON.parse(localStorage.getItem("loginAttempts"))) || {};

    const userData = storedAttempts[email] || {
      email,
      attempts: 0,
      lockTime: null,
    };
    //Auto-unlock check for remembered user
    if (
      remember &&
      userData.lockTime &&
      Date.now() - userData.lockTime >= TWO_HOURS
    ) {
      userData.attempts = 0;
      userData.lockTime = null;
    }

    if (!isFormValid() || locked) return;

    if (email === "valmikirekha@gmail.com" && password === "rekha123") {
      if (today > licenseExpiryDate) {
        alert("Your software license has expired. Please renew your software.");
      } else {
        alert("Login Successful. Redirecting to dashboard...");
        const user = { email, loginTime: Date.now() };
        localStorage.setItem("user", JSON.stringify(user));
        setVolatileAttempts(0); // clear session attempts on success
        navigate("/dashboard");
      }
      setEmail("");
      setPassword("");
    } else {
      if (remember) {
        userData.attempts += 1;

        if (userData.attempts >= 5) {
          userData.lockTime = Date.now(); // store lock time
          setLocked(true);
          alert(
            "Your account is locked. Please connect with your organization."
          );
        } else {
          alert(
            `Login Failed. You have attempted ${userData.attempts} out of 5 times. After 5 failed attempts, your account will be locked for 2 hours.`
          );
        }

        storedAttempts[email] = userData;
        localStorage.setItem("loginAttempts", JSON.stringify(storedAttempts));
      } else {
        const newAttempts = volatileAttempts + 1;
        setVolatileAttempts(newAttempts);

        if (newAttempts >= 5) {
          setLocked(true);
          alert(
            "Your account is locked for the current session. Please refresh or restart the browser to try again."
          );
        } else {
          alert(
            `Login Failed. You have attempted ${newAttempts} out of 5 times. After 5 failed attempts, your account will be locked for the current session.`
          );
        }
      }

      setEmail("");
      setPassword("");
    }
  };
  const handleForgetPassword = () => {
    setShowModal(true);
  };

  const handleNext = (e) => {
    e.preventDefault();
    alert("Your password reset request has been sent to the organization.");
    setShowModal(false);
  };
  return (
    <div className="login template d-flex justify-content-center align-items-center  vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h2 className="text-center text-primary">Login</h2>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              className={`form-control ${
                email && !isEmailValid() ? "is-invalid" : ""
              }`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            {email && !isEmailValid() && (
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            )}
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              className={`form-control ${
                password && !isPasswordValid() ? "is-invalid" : ""
              }`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            {password && !isPasswordValid() && (
              <div className="invalid-feedback">
                Please enter a correct password.
              </div>
            )}
          </div>
          <div className="checkblock mb-2">
            <div className="mb-2">
              <input
                type="checkbox"
                className="custom-control custom-checkbox"
                checked={remember}
                onChange={(e) => {
                  setRemember(e.target.checked);
                  if (e.target.checked) {
                    setVolatileAttempts(0);
                  }
                }}
              />
              <label className="custom-input-label ms-2"> Remember me</label>
            </div>
            <div className="check">
              <input
                type="checkbox"
                className="custom-control custom-checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label className="custom-input-label ms-2"> Show Password</label>
            </div>
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary"
              onClick={handleLogin}
              disabled={!isFormValid()}
            >
              Login
            </button>
          </div>
          <p className="text-end mt-2">
            <button
              className="buton"
              type="button"
              onClick={handleForgetPassword}
            >
              Forget Password
            </button>
          </p>
          {showModal && (
            <div
              className="modal fade show"
              tabIndex="-1"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Reset Password</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      To reset your password, please connect with your system
                      administrator or organization.
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button className="btn btn-primary" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
