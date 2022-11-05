import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../estilos";

export default function Tarefa(props) {
  const [campo, setCampo] = useState(props.descricao);
  const [altera, setAltera] = useState(false);

  const confirma = () => {
    setAltera(false);
    Keyboard.dismiss;
    props.onAltera(props.id, campo);
  };

  return altera ? (
    <View>
      <TextInput
        style={styles.input}
        defaultValue={props.descricao}
        onChangeText={(campo) => setCampo(campo)}
        onSubmitEditing={confirma}
        onBlur={confirma}
        autoFocus
      />
    </View>
  ) : (
    <View style={styles.li}>
      <Text style={styles.liText}>{props.descricao}</Text>
      <TouchableOpacity onPress={() => setAltera(true)}>
        <View style={[styles.button, styles.primary]}>
          <Image
            source={require("../assets/edit.png")}
            style={styles.buttonImg}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onApaga(props.id)}>
        <View style={[styles.button, styles.danger]}>
          <Image
            source={require("../assets/delete.png")}
            style={styles.buttonImg}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
