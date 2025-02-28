import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {

  }  
  return (
    <ScrollView
      contentContainerStyle={styles.signupContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.imageContainer}>
        {/* Image */}
        <Image source={images.signUpCar} style={styles.signupCar} />

        {/* Title on Image */}
        <Text style={styles.createAccount}>Create Your Account</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <InputField
            label="Email"
            placeholder="Enter your Email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>
        <View>
          <CustomButton title="Sign Up" style={styles.signUpButton} onPress={onSignUpPress}/>
        </View>
        <Link href="/(auth)/sign-in" style={styles.linkToLogin}>
          <Text>Already have an account?</Text>
          <Text style={styles.loginButton}>login</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  linkToLogin: {
    marginLeft:70,
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontFamily: "System",
    marginTop: 40,
  },
  loginButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3B82F6", 
    marginLeft: 5, 
  },
  
  signUpButton: {
    marginTop: 20,
    width: 380,
    backgroundColor: "#3B82F6", 
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  
  signupContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  signupCar: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  createAccount: {
    position: "absolute",
    marginTop: 150,
    marginLeft: 10,
    fontSize: 34,
    fontWeight: "600",
    color: "black",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 15, 
  },
});

export default SignUp;
