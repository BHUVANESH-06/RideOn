import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";

const Chat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>Chat</Text>
        <View style={styles.messageContainer}>
          <Image source={images.message} alt="message" style={styles.image} resizeMode="contain" />
          <Text style={styles.noMessageText}>No Messages Yet</Text>
          <Text style={styles.subText}>
            Start a conversation with your friends and family
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "JakartaBold",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 160,
  },
  noMessageText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "JakartaBold",
    marginTop: 12,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 28,
    color: "#666",
  },
});

export default Chat;
