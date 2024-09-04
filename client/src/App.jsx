import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import "./App.css";
import ProjectsList from "./pages/projects-list";
import ProjectDetails from "./pages/project-details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/:filename/:tab" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
