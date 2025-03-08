import { Tabs } from "expo-router";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { icons } from "@/constants";

type TabIconProps = {
  source: ImageSourcePropType;
  focused: boolean;
};

const TabIcon = ({ focused, source }: TabIconProps) => (
  <View style={[styles.TabIconContainer, focused && styles.focusedTab]}>
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Image source={source} style={[styles.icon, focused && styles.focusedIcon]} />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#333333",
        position:"fixed",
        borderRadius: 50,
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 15,
        height: 78, 
        paddingTop:20,
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />,
      }}
    />
    <Tabs.Screen
      name="rides"
      options={{
        title: "Rides",
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} />,
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />,
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.person} />,
      }}
    />
  </Tabs>
);

const styles = StyleSheet.create({
  TabIconContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  },
  focusedTab: {
    borderRadius: 10,
  },
  iconContainer: {
    width: 50, 
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  iconContainerFocused: {
    backgroundColor: "#4CAF50",
  },
  icon: {
    width: 34, 
    height: 34,
    tintColor: "#ffffff",
  },
  focusedIcon: {
    tintColor: "#fff",
  },
});

export default Layout;
