import React, { useReducer } from "react";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../types";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [{ id: "1", title: "Test 12" }]
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const onAddTodo = title => dispatch({ type: ADD_TODO, title });
  const onUpdateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });
  const onDeleteTodo = id => dispatch({ type: REMOVE_TODO, id });

  return (
    <TodoContext.Provider value={{ todos: state.todos, onAddTodo, onUpdateTodo, onDeleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
