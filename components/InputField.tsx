import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  View,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  Platform,
} from "react-native";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  labelStyle?: TextStyle;
  icon?: ImageSourcePropType;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconStyle?: ViewStyle;
  className?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"; // Added this
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  labelStyle,
  placeholder,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  value,
  onChangeText,
  keyboardType = "default", 
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS==="ios"?"padding":"height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.inputField, containerStyle]}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          <View style={styles.inputBox}>
            {icon && <Image source={icon} style={[styles.icon]} />}
            <TextInput
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              value={value}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    paddingVertical: 2,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputBoxFocused: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  icon: {
    tintColor: "#6b7280",
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default InputField;
