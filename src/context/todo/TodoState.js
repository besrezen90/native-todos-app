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
import { HTTP } from "../../http";

export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);
  const initialState = {
    todos: []
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const onAddTodo = async title => {
    const data = await HTTP.post("https://rn-todo-app-90154.firebaseio.com/todos.json", { title });
    dispatch({ type: ADD_TODO, title, id: data.name });
  };

  const onUpdateTodo = async (id, title) => {
    clearError();
    try {
      await HTTP.patch(`https://rn-todo-app-90154.firebaseio.com/todos/${id}.json`, { title });

      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError(error);
    }
  };

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
          onPress: async () => {
            changeScreen(null);
            clearError();
            try {
              await HTTP.delete(`https://rn-todo-app-90154.firebaseio.com/todos/${id}.json`);

              dispatch({ type: REMOVE_TODO, id });
            } catch (error) {
              showError(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const fetchData = async () => {
    setLoader();
    clearError();
    try {
      const data = await HTTP.get("https://rn-todo-app-90154.firebaseio.com/todos.json");
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Что-то сломалось...");
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
        error: state.error
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
