import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AppCard } from "../components/ui/AppCard";
import { THEME } from "../theme";
import { EditModal } from "../components/EditModal";
import { AppButton } from "../components/ui/AppButton";
import { AppTextBold } from "../components/ui/AppTextBold";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";

export const TodoScreen = ({}) => {
  const [modal, setModal] = useState(false);

  const { todos, onDeleteTodo, onUpdateTodo } = useContext(TodoContext);

  const { todoId, changeScreen } = useContext(ScreenContext);

  const todo = todos.find(t => t.id === todoId);

  const onSaveNewTitle = async title => {
    await onUpdateTodo(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal visible={modal} onCancel={() => setModal(false)} value={todo.title} onSave={onSaveNewTitle} />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={() => changeScreen(null)} color={THEME.GRAY_COLOR}>
            <AntDesign name='back' size={20} color='#fff' />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton onPress={() => onDeleteTodo(todo.id)} color={THEME.DANGER_COLOR}>
            <FontAwesome name='remove' size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    width: Dimensions.get("window").width / 3
  },
  card: {
    marginBottom: 20
  },
  title: {
    fontSize: 20
  }
});
