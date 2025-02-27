import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import log from "./utils/logger";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loggingEnabled, setLoggingEnabled] = useState(true);

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
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>Todos</h1>
            <button
              onClick={() => setLoggingEnabled((prev) => !prev)}
              className="btn btn-primary mb-3"
            >
              {loggingEnabled ? "Отключить логирование" : "Включить логирование"}
            </button>
            <div className="todo-app">
              <AddTodo handleAddTodo={handleAddTodo} />
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;