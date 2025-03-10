import { icons } from "@/constants";
import { router } from "expo-router";
import { Text, View,StyleSheet, TouchableOpacity, Image } from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler"
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import Map from "./Map";
import { useRef } from "react";

const RideLayout = ({title,children,snapPoints}:{title:string,children:React.ReactNode,snapPoints?:string[]}) =>{
    const bottomSheetRef = useRef<BottomSheet>(null);
    return (
        <GestureHandlerRootView>
            <View style={styles.ridecontainer}> 
                <View style={styles.screencontainer}>
                    <View style={styles.titlecontainer}>
                        <TouchableOpacity onPress={()=>router.back()}>
                            <View style={styles.backButton}>
                                <Image 
                                source={icons.backArrow}
                                resizeMode="contain"
                                style={styles.backicon}/>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.goback}>{title || "Go Back"}</Text>
                    </View>
                    <Map/>
                    <BottomSheet 
                    keyboardBehavior="extend"
                    ref={bottomSheetRef} snapPoints={snapPoints || ['40%','85%']}
                    index={0}>
                        <BottomSheetView 
                         style={styles.bottomsheet}>
                            {children}
                        </BottomSheetView>
                    </BottomSheet>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    ridecontainer:{
        display:"flex",
        backgroundColor:"white",
    },
    screencontainer:{
        display:"flex",
        flexDirection:"column",
        height:"100%",
        backgroundColor:"#2f80ed"
    },
    titlecontainer:{
        display:"flex",
        flexDirection:"row",
        position:'absolute',
        zIndex:10,
        top:16,
        alignItems:'center',
        justifyContent:'flex-start',
        paddingHorizontal:10,
    },
    backButton:{
        width:40,
        height:40,
        backgroundColor:'white',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
    },
    backicon:{
        height:30,
        width:30,
    },
    goback:{
        fontSize:22,
        fontWeight:'bold',
        marginLeft:20,
    },
    bottomsheet:{
        display:"flex",
        padding:20,
    }
})

export default RideLayout;