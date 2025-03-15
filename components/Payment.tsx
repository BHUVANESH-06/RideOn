import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/app/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

const Payment = ({ fullName, email, amount, driverId, rideTime }: PaymentProps) => {
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();

  const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);

  const handlePayment = async () => {
    try {
      // Create the ride immediately with "paid" status
      await fetchAPI("/(api)/ride/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin_address: userAddress,
          destination_address: destinationAddress,
          origin_latitude: userLatitude,
          origin_longitude: userLongitude,
          destination_latitude: destinationLatitude,
          destination_longitude: destinationLongitude,
          ride_time: rideTime.toFixed(0),
          fare_price: parseInt(amount) * 100,
          payment_status: "paid", 
          driver_id: driverId,
          user_id: userId,
        }),
      });

      setSuccess(true);
    } catch (error) {
      console.error("Payment Error:", error);
      Alert.alert("Payment Failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <CustomButton title="Confirm Ride" style={{ marginVertical: 10 }} onPress={handlePayment} />

      <ReactNativeModal isVisible={success} onBackdropPress={() => setSuccess(false)}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 15,
          }}
        >
          <Image source={images.check} style={{ width: 112, height: 112, marginTop: 20 }} />

          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Payment Successful 🎉
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "#888888",
              textAlign: "center",
              marginTop: 12,
              fontWeight: "400",
            }}
          >
            Your payment has been processed successfully. Enjoy your ride!
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            style={{ marginTop: 20, width:350, }}
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
