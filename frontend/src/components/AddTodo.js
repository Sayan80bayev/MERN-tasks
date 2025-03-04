import React, { useContext } from "react";
import { Input, Button } from "antd";
import { ThemeContext } from "../context/ThemeContext";

const AddTodo = ({ handleAddTodo }) => {
  const { theme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.value;
    if (value.length > 0) {
      handleAddTodo(value);
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`new-todo ${theme}`}>
      <Input
        type="text"
        name="value"
        required
        minLength={1}
        placeholder="Enter a task"
        className={`todo-input ${theme}`}
      />
      <Button type="primary" htmlType="submit" className={`todo-button ${theme}`}>
        Add Todo
      </Button>
    </form>
  );
};

export default AddTodo;