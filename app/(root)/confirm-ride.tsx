import CustomButton from "@/components/CustomButton"
import DriverCard from "@/components/DriverCard"
import RideLayout from "@/components/RideLayout"
import { FlatList, Text, View } from "react-native"
import { router } from "expo-router"
import { useDriverStore } from "@/store"

const ConfirmRide = ()=>{
    const {drivers,selectedDriver,setSelectedDriver} = useDriverStore();

    return(
        <RideLayout title="Choose a Driver" snapPoints={["65%","85%"]}>
            <FlatList 
            data={drivers}
            renderItem={({item})=><DriverCard selected={selectedDriver!} setSelected={()=>setSelectedDriver(item.id)} item={item}/>}
            ListFooterComponent={()=>(
                <View>
                    <CustomButton title="Select Ride" style={{width:380,marginTop:20}}
                    onPress={()=>router.push("/(root)/book-ride")}/>
                </View>
            )}>

            </FlatList>
           
        </RideLayout>
    )
}
export default ConfirmRide
