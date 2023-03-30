import {NavigationProp, useNavigation} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStack = {
  Home: undefined
  Details: {
    url: string
  }
}

export type DetailsScreenProps = NativeStackScreenProps<RootStack, 'Details'>

type UseNavigationType = NavigationProp<RootStack>

export const useAppNavigation = () => useNavigation<UseNavigationType>()