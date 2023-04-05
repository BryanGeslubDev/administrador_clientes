import { Alert as AlertRN, AlertButton } from "react-native";
import _ from "lodash";

export const Alert = (
  title: string,
  description?: unknown,
  {
    onAccept = () => undefined,
    onCancel = () => undefined,
    showAccept = true,
    showCancel = false,
  } = {}
) => {
  const opts: AlertButton[] = [];
  if (showCancel)
    opts.push({
      text: "Cancelar",
      onPress: onCancel,
      style: "cancel",
    });
  if (showAccept)
    opts.push({
      text: "Aceptar",
      onPress: onAccept,
    });

  AlertRN.alert(title, _.toString(description), opts);
};
