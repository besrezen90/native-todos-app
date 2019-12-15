import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AppCard } from "../components/ui/AppCard";
import { THEME } from "../theme";
import { EditModal } from "../components/EditModal";
import { AppButton } from "../components/ui/AppButton";
import { AppTextBold } from "../components/ui/AppTextBold";

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
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={goBack} color={THEME.GRAY_COLOR}>
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
    width: "40%"
  },
  card: {
    marginBottom: 20
  },
  title: {
    fontSize: 20
  }
});
