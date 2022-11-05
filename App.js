import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import styles from "./estilos";
import Tarefas from "./components/Tarefas";
import Cabecalho from "./components/Cabecalho";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [tarefas, setTarefas] = useState([]);

  async function armazenaDados() {
    try {
      await AsyncStorage.setItem("tarefas", JSON.stringify(tarefas));
    } catch (e) {
      Alert.alert("As tarefas não foram armazenadas");
    }
  }

  async function recuperaDados() {
    try {
      const tarefas = await AsyncStorage.getItem("tarefas");
      if (tarefas !== null) {
        setTarefas(JSON.parse(tarefas));
      }
    } catch (e) {
      Alert.alert("As tarefas não foram carregadas");
    }
  }

  useEffect(() => {
    recuperaDados();
  }, []);
  useEffect(() => {
    armazenaDados();
  }, [tarefas]);

  const adicionaTarefa = (t) => {
    if (t.length > 0) {
      const novaTarefa = {
        id: Math.random().toString(),
        descricao: t,
      };
      setTarefas([...tarefas, novaTarefa]);
    }
  };
  const alteraTarefa = (id, t) => {
    const i = tarefas.findIndex((x) => x.id === id);
    let novaLista = [...tarefas];
    novaLista[i].descricao = t;
    setTarefas(novaLista);
  };
  const apagaTarefa = (id) => setTarefas(tarefas.filter((t) => t.id !== id));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.app}
    >
      <View style={styles.conteudo}>
        <Cabecalho pendentes={tarefas.length} />
        <Tarefas
          tarefas={tarefas}
          onAdiciona={adicionaTarefa}
          onAltera={alteraTarefa}
          onApaga={apagaTarefa}
        />
      </View>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}
