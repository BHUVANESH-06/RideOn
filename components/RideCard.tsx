import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import { View, Text, StyleSheet, Image } from "react-native";

const RideCard = ({ ride }: { ride: Ride }) => {
  const {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  } = ride;

  return (
    <View style={styles.rideCard}>
      <View style={styles.topContent}>
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&
              height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={styles.map}
          />
        </View>

        {/* Ride Details Section */}
        <View style={styles.locationDetails}>
          <View style={styles.pointingDetails}>
            <Image source={icons.to} style={styles.icon} />
            <Text style={styles.locationText}>{destination_address}</Text>
          </View>
          <View style={styles.pointingDetails}>
            <Image source={icons.point} style={styles.icon} />
            <Text style={styles.locationText}>{origin_address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.eachContent}>
          <Text style={styles.labelText}>Date & Time</Text>
          <Text style={styles.valueText}>
            {formatDate(created_at)},{formatTime(ride_time)}
          </Text>
        </View>
        <View style={styles.eachContent}>
          <Text style={styles.labelText}>Driver</Text>
          <Text style={styles.valueText}>
            {driver.first_name} {driver.last_name}
          </Text>
        </View>
        <View style={styles.eachContent}>
          <Text style={styles.labelText}>CarSeats</Text>
          <Text style={styles.valueText}>{driver.car_seats}</Text>
        </View>
        <View style={styles.eachContent}>
          <Text style={styles.labelText}>Payment Status</Text>
          <Text
            style={[
              styles.valueText,
              { color: payment_status === "paid" ? "green" : "red" },
            ]}
          >
            {payment_status.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eachContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 5,
    paddingVertical:10,
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  valueText: {
    fontSize: 16,
    color: "#555",
  },
  bottomContent: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
  },
  rideCard: {
    flexDirection: "column",
    gap: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Required for Android shadow
  },

  topContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mapContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  locationDetails: {
    flex: 1,
    paddingLeft: 20,
  },

  pointingDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },

  locationText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});

export default RideCard;
