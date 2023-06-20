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

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const inputRef = useRef(null);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handelToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
            <label className="firstName">Email / Username</label>
            <input
              className="email"
              type="email"
              placeholder="Type e-mail..."
            />
          </div>
          <div className="form-grup">
            <label className="firstName">Password</label>
            <div className="icon-pass">
              <input
                className="password"
                type={showPassword ? "text" : "password"}
                onChange={handlePasswordChange}
                placeholder="Type password..."
                ref={inputRef}
              />
              {isCapsLockOn && (
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="icon-caps-lock"
                />
              )}
              <FontAwesomeIcon
                icon={showPassword ? faLock : faEye}
                className="icon-show-pass"
                onClick={handelToggleShowPassword}
              />
            </div>
          </div>
          <div>
            <button className="btn-login">Login</button>
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
            <a href="/">Reset you password</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Switch;
