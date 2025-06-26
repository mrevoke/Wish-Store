
// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { AddWishScreen } from "../screens/AddWishScreen";
// import { MapScreen } from "../screens/MapScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddWish" component={AddWishScreen} />
    {/* <Stack.Screen name="Map" component={MapScreen} /> */}
  </Stack.Navigator>
);
