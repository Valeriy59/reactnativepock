import React from 'react';
import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStack} from "../types";
import {DetailsScreen} from "./Details/DetailsScreen";
import {HomeScreen} from "./Home/HomeScreen";

const Stack = createNativeStackNavigator<RootStack>()


export const Main = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen name={'Home'} component={HomeScreen}/>
        <Stack.Screen name={'Details'} component={DetailsScreen}/>
      </Stack.Navigator>
    </View>
  )
}