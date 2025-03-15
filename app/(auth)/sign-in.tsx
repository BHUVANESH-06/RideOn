import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { googleOAuth } from "@/cache";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const {startOAuthFlow} = useOAuth({
      strategy: "oauth_google"
    })
  const onLoginPress = useCallback(async () => {
      try {
          const result = await googleOAuth(startOAuthFlow);
          if(result.code==="session_exists" || result.code==="success"){
            Alert.alert("Success","Session Exists. Redirecting to home page");
            router.push('/(root)/(tabs)/home');
          }
          Alert.alert(result.success?'Success':"Error",result.message)
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      }
    }, [])
  return (
    <ScrollView
      contentContainerStyle={styles.signupContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.imageContainer}>
        {/* Image */}
        <Image source={images.signUpCar} style={styles.signupCar} />

        {/* Title on Image */}
        <Text style={styles.createAccount}>Welcome 👋</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
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
            title="Sign In"
            style={styles.signUpButton}
            onPress={onSignInPress}
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
        <Link href="/(auth)/sign-up" style={styles.linkToLogin}>
          <Text>Don't have an account?</Text>
          <Text style={styles.loginButton}>SignUp</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginLeft: 10,
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

export default SignIn;
