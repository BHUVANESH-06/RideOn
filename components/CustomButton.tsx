import { TouchableOpacity, Image,Text, StyleSheet, ButtonProps } from "react-native";

const COLORS = {
  primary: "#028FFF",  
  secondary: "#6B7280", 
  danger: "#EF4444",
  outline: "transparent", // Transparent for outline button
  success: "#10B981", // Green
};

const TEXT_COLORS = {
  primary: "#028FFF",
  default: "#FFFFFF", // White
  secondary: "#6B7280",
  danger: "#EF4444",
  success: "#10B981",
};

interface CustomButtonProps extends ButtonProps {
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: any;
  IconRight?: any;
  style?: any; 
  textStyle?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={StyleSheet.flatten([
        styles.button, 
        {
          backgroundColor: COLORS[bgVariant] || COLORS.primary,
          borderWidth: bgVariant === "outline" ? 2 : 0,
          borderColor: bgVariant === "outline" ? COLORS.primary : "transparent",
        },
        style // Apply external styles here
      ])}
      {...props}
    >
      {IconLeft && <Image source={IconLeft} style={styles.icon} />}
      <Text style={StyleSheet.flatten([
        styles.text, 
        { color: TEXT_COLORS[textVariant] || TEXT_COLORS.default },
        textStyle // Apply external text styles here
      ])}>
        {title}
      </Text>
      {IconRight && <IconRight style={styles.icon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 60,
    width:400,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    marginRight:10,
    width:20,
    height:20
  },
});

export default CustomButton;
