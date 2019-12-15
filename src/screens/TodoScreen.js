import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { AppCard } from "../components/ui/AppCard";
import { THEME } from "../theme";
import { EditModal } from "../components/EditModal";
import { AppText } from "../components/ui/AppText";

export const TodoScreen = ({ todo, goBack, onDeleteTodo, onSave }) => {
  const [modal, setModal] = useState(false);

  const onSaveNewTitle = title => {
    onSave(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal visible={modal} onCancel={() => setModal(false)} value={todo.title} onSave={onSaveNewTitle} />
      <AppCard style={styles.card}>
        <AppText style={styles.title}>{todo.title}</AppText>
        <Button title='Ред' onPress={() => setModal(true)} />
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button onPress={goBack} color={THEME.GRAY_COLOR} title='Назад' />
        </View>
        <View style={styles.button}>
          <Button onPress={() => onDeleteTodo(todo.id)} color={THEME.DANGER_COLOR} title='Удалить' />
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
    width: "40%"
  },
  card: {
    marginBottom: 20
  },
  title: {
    fontSize: 20
  }
});
