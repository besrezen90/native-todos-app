import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SET_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS
} from "../types";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);
  const initialState = {
    todos: []
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const onAddTodo = async title => {
    const response = await fetch("https://rn-todo-app-90154.firebaseio.com/todos.json", {
      method: "POST",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify({ title })
    });

    const data = await response.json();
    dispatch({ type: ADD_TODO, title, id: data.name });
  };

  const onUpdateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  const onDeleteTodo = id => {
    const todo = state.todos.find(t => t.id === id);
    Alert.alert(
      "Удалить задачу",
      `Вы уверены что хотите удалить задачу ${todo.title}`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: false }
    );
  };

  const fetchData = async () => {
    try {
      setLoader();
      const response = await fetch("https://rn-todo-app-90154.firebaseio.com/todos.json", {
        headers: { "Content-Type": "applications/json" }
      });

      const data = await response.json();
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      console.log("FetchTodos", todos);
      dispatch({ type: FETCH_TODOS, todos });
    } finally {
      hideLoader();
    }
  };

  const setLoader = () => dispatch({ type: SET_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        onAddTodo,
        onUpdateTodo,
        onDeleteTodo,
        fetchData,
        loading: state.loading,
        erros: state.errors
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
