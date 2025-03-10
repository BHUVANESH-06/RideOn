import { GoogleInputProps } from "@/types/type";
import { View, StyleSheet, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { icons } from "@/constants";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  textInputBackgroundColor,
  handlePress,
  containerStyle,
}: GoogleInputProps) => (
  <View style={[styles.container, containerStyle]}>
    <GooglePlacesAutocomplete
      placeholder="Where do you want to go?"
      fetchDetails={true}
      debounce={200}
      styles={{
        textInputContainer: {
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 30,
          marginHorizontal: 20,
          paddingVertical: 5,
          backgroundColor: "#F5F5F5",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3, // Shadow effect for Android
        },
        textInput: {
          flex: 1,
          backgroundColor: textInputBackgroundColor || "white",
          fontSize: 16,
          fontWeight: "600",
          paddingHorizontal: 15,
          marginTop:3,
          marginRight:9,
          borderRadius: 30,
          height: 50,
          color: "#333",
        },
        listView: {
          backgroundColor: "white",
          position: "absolute",
          top: 60,
          width: "100%",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 4,
          zIndex: 99,
        },
      }}
      onPress={(data, details = null) => {
        handlePress({
          latitude: details?.geometry.location.lat!,
          longitude: details?.geometry.location.lng!,
          address: data.description,
        });
      }}
      query={{
        key: googlePlacesApiKey,
        language: "en",
      }}
      renderLeftButton={() => (
        <View style={styles.searchContainer}>
          <Image source={icon || icons.search} style={styles.icon} />
        </View>
      )}
      textInputProps={{
        placeholderTextColor: "#888",
        placeholder: initialLocation ?? "Where do you want to go?",
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 100,
    marginBottom: 10,
  },
  searchContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#555",
  },
});

export default GoogleTextInput;
