import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../navigator/app/AppStackNavigator";
import { AuthenticationStackParamList } from "../navigator/authentication/AuthenticationStackNavigator";

export type IAppNavigation<
  RouteName extends keyof StackParamList
> = StackNavigationProp<StackParamList, RouteName>;
export type IAppRoute<RouteName extends keyof StackParamList> = RouteProp<
  StackParamList,
  RouteName
>;
export type IAuthenticationNavigation<
  RouteName extends keyof AuthenticationStackParamList
> = StackNavigationProp<AuthenticationStackParamList, RouteName>;
export type INavigation<RouteName extends keyof StackParamList> = {
  navigation: IAppNavigation<RouteName>;
  route: IAppRoute<RouteName>;
};
