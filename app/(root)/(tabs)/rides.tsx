import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import React from "react";

const Rides = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });  // Hide the header
    }, [navigation]);

    return (
        <SafeAreaView>
            <Text>Rides</Text>
        </SafeAreaView>
    );
};

export default Rides;
