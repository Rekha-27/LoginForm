import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";
import ValidationdashBoard from "./Components/ValidationdashBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ValidationdashBoard>
                <Dashboard />
              </ValidationdashBoard>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
