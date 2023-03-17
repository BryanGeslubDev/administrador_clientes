import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  headerRow: { flex: 1, display: "flex", width: "60vw" },
  headerCell: { flex: 1, display: "flex", width: "60vw" },
  dataRow: { flex: 1, display: "flex", width: "60vw" },
  dataCell: { flex: 1, textAlign: "left", display: "flex", width: "10vw" },
});
