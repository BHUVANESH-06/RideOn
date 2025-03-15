import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>My Profile</Text>

        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoInnerContainer}>
            <InputField
              label="First Name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              editable={false}
            />

            <InputField
              label="Last Name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "JakartaBold",
    marginVertical: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  infoInnerContainer: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    padding: 14,
  },
});

export default Profile;
