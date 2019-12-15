import React, { useState } from "react";
import { StyleSheet, View, Modal, TextInput, Alert } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const onSaveTitle = () => {
    if (title.trim().length < 3) {
      Alert.alert("Ошибка!", "Название задачи не может быть меньше 3 символов");
    } else {
      onSave(title);
    }
  };

  const onCancelEdit = () => {
    setTitle(value);
    onCancel();
  };

  return (
    <Modal transparent={false} animationType='slide' visible={visible}>
      <View style={styles.wrap}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          placeholder={"Введите название задачи"}
          maxLength={64}
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.buttons}>
          <AppButton color={THEME.DANGER_COLOR} onPress={onCancelEdit}>
            Отмена
          </AppButton>
          <AppButton onPress={onSaveTitle}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    padding: 8,
    width: "80%",
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2
  },
  buttons: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
