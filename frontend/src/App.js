import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./context/ThemeContext";
import log from "./utils/logger";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Button, Switch } from "antd";
import "antd/dist/reset.css";
import "./App.scss";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (loggingEnabled) log.info("App mounted");

    axios
      .get("/api")
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((e) => log.warn("Error:", e));

    return () => {
      if (loggingEnabled) log.info("App unmounted");
    };
  }, [loggingEnabled]);

  const handleAddTodo = (value) => {
    axios
      .post("/api/todos", { text: value })
      .then(() => {
        setTodos((prevTodos) => [...prevTodos, { text: value }]);
      })
      .catch((e) => log.warn("Error:", e));
  };

  return (
    <div className={`App container ${theme}`}>
      <h1>Todos</h1>

      <div className="controls">
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Button onClick={() => setLoggingEnabled((prev) => !prev)}>
          {loggingEnabled ? "Отключить логирование" : "Включить логирование"}
        </Button>
      </div>

      <AddTodo handleAddTodo={handleAddTodo} />
      <br/>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;