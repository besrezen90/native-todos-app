import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
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

  return (
    <TodoContext.Provider value={{ todos: state.todos, onAddTodo, onUpdateTodo, onDeleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
