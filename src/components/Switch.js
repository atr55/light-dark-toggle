import React, { useEffect, useRef, useState } from "react";
import "../style/Switch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faEye,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

function Switch({ toggleTheme, theme }) {
  const checked = theme === "dark";

  const handleChange = () => {
    toggleTheme();
  };

  //  Password show & capslock on/off

  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const inputRef = useRef(null);

  //  Show password button

  const handelToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //  Password capslock

  const handleKeyUp = (event) => {
    setIsCapsLockOn(event.getModifierState("CapsLock"));
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isCapsLockOn) {
      inputRef.current.style.fontVariant = "small-caps";
    } else {
      inputRef.current.style.fontVariant = "normal";
    }
  }, [isCapsLockOn]);

  //  Validate email format

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidEmail(validateEmail(e.target.value));
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email is inavalid");
    } else {
      setError("");
    }
    return emailRegex.test(value);
  };

  return (
    <div className="content-page">
      <div
        className="container-switch"
        style={{ display: "flex", gap: 10, alignItems: "center" }}
      >
        <p>Light</p>
        <label className="switch">
          <input
            className="toggle"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          <span className="slider"></span>
        </label>
        <p>Dark</p>
      </div>
      <div className="login">
        <div className="signin">
          <h1>Sign in</h1>
          <p>Sign in and discover a great amount of new opportunities!</p>
        </div>
        <div className="form">
          <div className="form-grup">
            <label className="text-label">Email / Username</label>
            <input
              className={validEmail ? "input-valid" : "input-invalid"}
              type="email"
              placeholder="Type e-mail..."
              onChange={handleEmailChange}
            />
            {/* Email format alert message */}
            {error && (
              <div class="alert">
                <strong>Danger!</strong> Email is invalid
              </div>
            )}
          </div>
          <div className="form-grup">
            <label className="text-label">Password</label>
            <div className="icon-pass">
              <input
                className="password"
                type={showPassword ? "text" : "password"}
                placeholder="Type password..."
                ref={inputRef}
              />
              {/* Icon capslock password */}
              {isCapsLockOn && (
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="icon-caps-lock"
                />
              )}
              {/* Icon show password */}
              <FontAwesomeIcon
                icon={showPassword ? faLock : faEye}
                className="icon-show-pass"
                onClick={handelToggleShowPassword}
              />
            </div>
          </div>
          <div>
            <button className="btn-login" type="submit">
              Login
            </button>
          </div>
          <div
            className="reset-pass"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Having trouble loggin in?</p>
            <a href="/">Reset password</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Switch;
