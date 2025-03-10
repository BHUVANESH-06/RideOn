import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store"
import { View,Text,StyleSheet } from "react-native"
import { router } from "expo-router";

const FindRide = ()=>{
    const {userAddress,destinationAddress,setDestinationLocation,setUserLocation} = useLocationStore();
    return(
        <RideLayout title="Ride">
            <View style={{marginVertical:3}}>
                <Text style={{marginBottom:10,fontSize:20,fontWeight:'bold'}}>From</Text>
                <GoogleTextInput icon={icons.target} initialLocation={userAddress!}
                containerStyle={styles.container}/>
            </View>
            <View style={{marginVertical:3}}>
                <Text style={{marginBottom:10,fontSize:20,fontWeight:'bold'}}>To</Text>
                <GoogleTextInput icon={icons.map} initialLocation={destinationAddress!}
                containerStyle={styles.container}
                handlePress={(location)=>setDestinationLocation(location)}/>
            </View>
            <CustomButton title="Find Now" onPress={()=>router.push("/(root)/confirm-ride")} style={styles.findnow}/>
        </RideLayout>
    )
}
const styles = StyleSheet.create({
    container:{
        borderColor:"black"
    },
    findnow:{
        marginTop:10,
    }
})
export default FindRide