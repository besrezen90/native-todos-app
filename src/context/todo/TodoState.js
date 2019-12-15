import React, { useReducer, useContext } from "react";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../types";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);
  const initialState = {
    todos: [{ id: "1", title: "Test 12" }]
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const onAddTodo = title => dispatch({ type: ADD_TODO, title });
  const onUpdateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });
  const onDeleteTodo = id => {
    changeScreen(null);
    dispatch({ type: REMOVE_TODO, id });
  };

  return (
    <TodoContext.Provider value={{ todos: state.todos, onAddTodo, onUpdateTodo, onDeleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
