import { CardTitleProps } from "@rneui/base/dist/Card/Card.Title";
import {
  createTheme,
  InputProps,
  TextProps,
  ButtonProps,
  CardProps,
  OverlayProps,
} from "@rneui/themed";

import { Responsive } from "../responsive";

export const colors = {
  primary: "rgb(23,60,94)",
  secondary: "rgb(255,219,33)",
  onPrimary: "white",
  onSecondary: "black",
};

const Button: Partial<ButtonProps> = {
  buttonStyle: {
    padding: Responsive.hp(1),
    backgroundColor: "#3D86CC",
    borderRadius: 5,
  },
  titleStyle: {
    color: "white",
    fontSize: Responsive.hp(2),
  },
};

const Text: Partial<TextProps> = {
  style: {
    fontSize: Responsive.hp(1.8),
    color: "black",
  },
};

const Input: Partial<InputProps> = {
  labelStyle: {
    fontSize: Responsive.hp(1.8),
    color: "black",
  },
  errorStyle: {
    color: "red",
  },
  containerStyle: {
    paddingHorizontal: 0,
  },
  inputStyle: {
    fontSize: Responsive.hp(1.8),
  },
};

const Card: Partial<CardProps> = {
  containerStyle: {
    borderWidth: 0,
    borderRadius: 10,
    elevation: 0.8,
    backgroundColor: "white",
  },
};

const CardTitle: Partial<CardTitleProps> = {
  style: {
    fontSize: Responsive.hp(2.4),
    color: "black",
  },
};

const Overlay: Partial<OverlayProps> = {
  overlayStyle: {
    backgroundColor: "#f8f8f8",
  },
};

export default createTheme({
  colors,
  Button,
  Text,
  Input,
  Card,
  CardTitle,
  Overlay,
});
