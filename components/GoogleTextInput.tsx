import { GoogleInputProps } from "@/types/type";
import { View, Text, StyleSheet,Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values"
import { icons } from "@/constants";
const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const GoogleTextInput = ({
  icon,
  initialLocation,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => (
  <View style={[styles.container]}>
    <GooglePlacesAutocomplete
    placeholder="Where you want to go?"
    fetchDetails={true}
    debounce={200}
    styles={{
      textInputContainer:{
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
        marginHorizontal:20,
        position:"relative",
        shadowColor:"#d4d4d4",
      },
      textInput:{
        backgroundColor: textInputBackgroundColor || "white",
        fontSize:16,
        fontWeight:600,
        marginTop:5,
        width:"100%",
        borderRadius:200,
      },
      listView:{
        backgroundColor: textInputBackgroundColor || "white",
        position:"relative",
        top:0,
        width:"100%",
        shadowColor:"#d4d4d4",
        zIndex:99,
      }
    }}
    onPress={(data,details = null)=>{
      handlePress({
        latitude: details?.geometry.location.lat!,
        longitude: details?.geometry.location.lng!,
        address: data.description
      })
    }}
    query={{
      key:googlePlacesApiKey,
      language:"en",
    }}
    renderLeftButton={()=>(
      <View style={styles.searchContainer}>
        <Image source = {icon?icon:icons.search} style={styles.icon}/>
      </View>
    )}
    textInputProps={
      {
        placeholderTextColor:'gray',
        placeholder: initialLocation??"Where do you to go?"
      }
    }
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
    borderRadius: 12,
    marginBottom: 10,
  },
  searchContainer:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  icon:{
    width:25,
    height:25,
    resizeMode:"contain"
  }
});

export default GoogleTextInput;
