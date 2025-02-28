import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useNavigation } from "expo-router";
import React from "react";

const Home = () => {

    return <Redirect href="/(auth)/welcome"/>;
};

export default Home;
