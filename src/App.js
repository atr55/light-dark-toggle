import { useEffect, useState } from "react";
import "./App.css";
import Switch from "./components/Switch";
import "./style/darkMode.css";

function App() {
  const saveTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(saveTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`content ${theme}`}>
      <Switch toggleTheme={toggleTheme} theme={theme} />
    </div>
  );
}

export default App;
