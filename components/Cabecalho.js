import React from "react";
import { Text, View } from "react-native";
import styles from "../estilos";

export default function Cabecalho({ pendentes }) {
  return (
    <View style={[styles.headerBar, styles.dark]}>
      <Text style={styles.appName}>Tô Ferrado</Text>
      <Text style={[styles.badge, styles.warning]}>{pendentes}</Text>
    </View>
  );
}
