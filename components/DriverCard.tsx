import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={[
        styles.container,
        selected === item.id ? styles.selected : styles.unselected,
      ]}
    >
      <Image source={{ uri: item.profile_image_url }} style={styles.profileImage} />

      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.ratingContainer}>
            <Image source={icons.star} style={styles.iconSmall} />
            <Text style={styles.ratingText}>4</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.dollar} style={styles.iconMedium} />
            <Text style={styles.infoText}>${item.price}</Text>
          </View>

          <Text style={styles.separator}>|</Text>
          <Text style={styles.infoText}>{formatTime(item.time!)}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.infoText}>{item.car_seats} seats</Text>
        </View>
      </View>

      <Image source={{ uri: item.car_image_url }} style={styles.carImage} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  selected: {
    backgroundColor: "#1E40AF",
  },
  unselected: {
    backgroundColor: "#FFFFFF",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: "JakartaRegular",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  iconSmall: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMedium: {
    width: 16,
    height: 16,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    marginLeft: 6,
    color: "#374151", // General-800
  },
  separator: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    marginHorizontal: 6,
    color: "#374151",
  },
  carImage: {
    width: 56,
    height: 56,
  },
});

export default DriverCard;
