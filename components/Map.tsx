import { useFetch } from "@/app/fetch";
import { icons } from "@/constants";
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store"
import { Driver, MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native"
import {Marker, PROVIDER_DEFAULT} from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
let MapView;
if (Platform.OS !== 'web') {
    MapView = require('react-native-maps').default;
  } else {
    MapView = () => null; 
  }
  
const Map = ()=>{
    const {data:drivers, loading,error} = useFetch<Driver[]>("/(api)/driver")
    const {
        userLongitude,userLatitude,destinationLatitude,destinationLongitude
    } = useLocationStore();

    const region = calculateRegion({
        userLongitude,userLatitude,destinationLatitude,destinationLongitude
    })
    
    const {selectedDriver,setDrivers} = useDriverStore(); 
    const [markers,setMarkers] = useState<MarkerData[]>()
    useEffect(()=>{
        if(Array.isArray(drivers)){
            if(!userLatitude || !userLongitude) return;
            const newMarkers = generateMarkersFromData(
                {
                    data:drivers,
                    userLatitude,
                    userLongitude,
                }
            )
            setMarkers(newMarkers)
        }
    },[drivers,userLatitude,userLongitude])

    useEffect(()=>{
        if(markers?.length>0 && destinationLatitude!==undefined && destinationLongitude!=undefined){
            calculateDriverTimes({
                markers,
                userLongitude,
                userLatitude,
                destinationLatitude,
                destinationLongitude
            }).then((drivers)=>{
                setDrivers(drivers as MarkerData[])
            })
        }
    },[markers,destinationLatitude,destinationLongitude])
    if(loading || (!userLatitude || !userLongitude)){ return(
        <View>
            <ActivityIndicator size="small" color="#000"/>
        </View>
    )}
    if(error){
        return (
        <View>
            <Text>Error: {error}</Text>
        </View>
        )
    }
    return(
        <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.mapContainer}
        tintColor="black"
        initialRegion={region}
        showsPointsOfInterest={false}
        userInterfaceStyle="light"
        showsUserLocation={true}
        >
            {markers?.map((marker)=>(
                <Marker
                key={marker.id}
                coordinate={
                    {
                        latitude:marker.latitude,
                        longitude:marker.longitude
                    }
                }
                title={marker.title}
                image={
                    selectedDriver===marker.id?icons.selectedMarker:icons.marker
                }></Marker>
            ))}
            {destinationLatitude && destinationLongitude &&(
                <>
                <Marker
                key="destination"
                coordinate={{
                    latitude:destinationLatitude,
                    longitude:destinationLongitude,
                }}
                title="Destination"
                image={icons.pin}
                />
                <MapViewDirections
                origin={{
                    latitude:userLatitude ??0,
                    longitude:userLongitude ??0
                }}
                destination={{
                    latitude:destinationLatitude ??0,
                    longitude:destinationLongitude??0
                }
                }
                apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                strokeColor="#0286ff"
                strokeWidth={2}/>
                </>
            )}
        </MapView>
    )
}
const styles = StyleSheet.create({
    mapContainer:{
        width:"100%",
        height:"100%",
        borderRadius:20,

    }
})
export default Map