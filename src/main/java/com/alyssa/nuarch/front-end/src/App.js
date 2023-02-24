import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import TodoEdit from "./TodoEdit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/todos" exact={true} element={<TodoList />} />
        <Route path="/todo/:id" element={<TodoEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
