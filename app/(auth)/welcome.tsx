import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [active, setActiveIndex] = useState(0);
  const isLastSlide = active === onboarding.length - 1;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.noOfPages} />}
        activeDot={<View style={styles.activePage} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={index} style={styles.eachPage}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={styles.pageImage}
            />
            <Text style={styles.pageTitle}>{item.title}</Text>
            <Text style={styles.pageDescription}>{item.description}</Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide?"Get Started":"Next"}
        onPress={()=>isLastSlide?router.replace('/(auth)/sign-up'):swiperRef.current?.scrollBy(1)}
        style={{ marginBottom: 20,marginTop:30}} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   eachPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    paddingHorizontal: 20,
  },

  pageImage: {
    width: "80%",
    height: 300,
    marginBottom: 20,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A8A", 
    textAlign: "center",
    marginBottom: 10,
  },

  pageDescription: {
    fontSize: 16,
    color: "#475569", 
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  skipButton: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  skipText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
    paddingVertical: 5,
    paddingHorizontal: 16,
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
    overflow: "hidden",
  },
  noOfPages: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(37, 99, 235, 0.4)", 
    marginHorizontal: 5,
  },
  activePage: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB", 
    marginHorizontal: 5,
  },
});

export default Onboarding;
