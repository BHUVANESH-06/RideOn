import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Button,
} from "react-native";
import { Alert } from "react-native";
import ReactNativeModal from "react-native-modal";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { fetchAPI } from "../fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err:any) {
      Alert.alert('Error',err.errors[0].longMessage)
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (signUpAttempt.status === "complete") {
        await fetchAPI('/(api)/user',{
          method:"POST",
          body: JSON.stringify({
            name: form.name,
            email:form.email,
            clerkId: signUpAttempt.createdUserId
          })
        })
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.erros[0].longMessage,
        state: "failed",
      });
      Alert.alert('Error',err.err[0].longMessage)
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onLoginPress = async () => {};
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
        <View style={styles.button}>
          <CustomButton
            title="Sign Up"
            style={styles.signUpButton}
            onPress={onSignUpPress}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
          <Text style={{ marginHorizontal: 10 }}>Or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
        </View>

        <View style={styles.button}>
          <CustomButton
            title="Login with Google"
            textStyle={styles.googleButtonText}
            style={styles.googleUpButton}
            IconLeft={icons.google}
            onPress={onLoginPress}
          />
        </View>
        <Link href="/(auth)/sign-in" style={styles.linkToLogin}>
          <Text>Already have an account?</Text>
          <Text style={styles.loginButton}>login</Text>
        </Link>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropOpacity={0.5}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Verification</Text>
            <Text style={styles.modalText}>
              We have sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
              style={{ width: 250 }}
            />
            {verification.error && <Text>{verification.error}</Text>}
            <CustomButton
              bgVariant="success"
              title="Verify Email"
              onPress={onVerifyPress}
              style={styles.verifyEmailButton}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal
          isVisible={verification.state === "success"}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
          }}
        >
          <View style={styles.verifyImage}>
            <Image source={images.check} style={styles.verifyImageCheck} />
            <Text style={styles.verifiedText}>Verified</Text>
            <Text style={styles.verifiedDesc}>
              You have successfully verified your account
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              style={styles.browseHomeButton}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  verifyEmailButton: {
    width: 300,
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "grey",
    textAlign: "center",
    marginBottom: 15,
  },
  verifyImageCheck: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginVertical: 10,
  },
  verifyImage: {
    borderRadius: 15,
    backgroundColor: "white",
    width: 350,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedText: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
  },
  verifiedDesc: {
    marginTop: 5,
    textAlign: "center",
    maxWidth: "80%",
    color: "grey",
  },
  browseHomeButton: {
    marginTop: 15,
    width: "80%",

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // More realistic shadow
    shadowOpacity: 0.25, // Reduce intensity
    shadowRadius: 4,

    // Android Shadow
    elevation: 8, // Increase elevation for better visibility
  },

  linkToLogin: {
    marginLeft: 70,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    fontFamily: "System",
    marginTop: 40,
  },
  loginButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  button: {
    alignItems: "center",
  },
  googleButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  signUpButton: {
    marginTop: 30,
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
  googleUpButton: {
    marginTop: 30,
    width: 380,
    backgroundColor: "#a9a9a9",
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
