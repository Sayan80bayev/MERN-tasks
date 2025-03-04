import React, { useContext, useState } from "react";
import { List } from "antd";
import { ThemeContext } from "../context/ThemeContext";

const TodoList = ({ todos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

  const handleActive = (index) => {
    setActiveIndex(index);
  };

  return todos.length > 0 ? (
    <List
      bordered
      dataSource={todos}
      renderItem={(todo, i) => (
        <List.Item
          className={i === activeIndex ? "active" : ""}
          onClick={() => handleActive(i)}
          style={{ color: theme === "dark" ? "white" : "black" }}
        >
          {todo.text}
        </List.Item>
      )}
    />
  ) : (
    <div>No Todos</div>
  );
};

export default TodoList;