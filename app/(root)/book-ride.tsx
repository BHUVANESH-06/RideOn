import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View, StyleSheet } from "react-native";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";
import CustomButton from "@/components/CustomButton";
import  Payment  from "@/components/Payment";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";

const BookRide = () => {
  
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  const driverDetails = drivers?.find(
    (driver) => +driver.id === selectedDriver
  );
  console.log(driverDetails)
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.uber.com" 
      urlScheme="myapp" 
    >
      <RideLayout title="Book Ride">
        <>
          <Text style={styles.header}>Ride Information</Text>
          <View style={styles.centeredContainer}>
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              style={styles.profileImage}
            />
            <View style={styles.driverInfoContainer}>
              <Text style={styles.driverTitle}>{driverDetails?.title}</Text>
              <View style={styles.ratingContainer}>
                <Image
                  source={icons.star}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>{driverDetails?.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Ride Price</Text>
              <Text style={styles.price}>${driverDetails?.price}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Pickup Time</Text>
              <Text style={styles.value}>
              {formatTime(parseInt(`${driverDetails?.time}`))}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Car Seats</Text>
              <Text style={styles.value}>{driverDetails?.car_seats}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <View style={styles.locationRow}>
              <Image source={icons.to} style={styles.icon} />
              <Text style={styles.locationText}>{userAddress}</Text>
            </View>
            <View style={styles.locationRow}>
              <Image source={icons.point} style={styles.icon} />
              <Text style={styles.locationText}>{destinationAddress}</Text>
            </View>
          </View>
          <Payment 
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price ?? "0"}
            driverId={driverDetails?.id ?? 0}
            rideTime={driverDetails?.time ?? 0}
            />
        </>
      </RideLayout>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  driverInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  driverTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 18,
    marginLeft: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
  infoCard: {
    backgroundColor: "rgb(229,229,255)",
    padding: 16,
    borderRadius: 20,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "white",
  },
  label: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    color: "#0CC25F",
  },
  value: {
    fontSize: 18,
  },
  locationContainer: {
    marginTop: 20,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#555",
  },
  locationText: {
    fontSize: 18,
    marginLeft: 8,
  },
});

export default BookRide;
