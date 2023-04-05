import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Overlay as OverlayElement, Text } from "@rneui/themed";

export interface OverlayProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  height?: string;
  width?: string;
}

export function Overlay({
  isVisible,
  title,
  onClose,
  children,
  height,
  width,
}: OverlayProps) {
  return (
    <OverlayElement
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={{ width: width ?? "90%", height, backgroundColor: "white" }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text style={{ flex: 1, fontSize: 24 }} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          style={{ paddingVertical: 2, paddingHorizontal: 6 }}
        >
          <Text style={{ fontSize: 22 }}>X</Text>
        </TouchableOpacity>
      </View>
      {children}
    </OverlayElement>
  );
}
