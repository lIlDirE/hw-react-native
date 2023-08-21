
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import PostsScreen from './Screens/PostsScreen/PostsScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import CommentsScreen from './Screens/CommentsScreen/CommentsScreen';

import CreatePostsScreen from './Screens/CreatePostsScreen/CreatePostsScreen';
import MapScreen from './Screens/MapScreen/MapScreen';

const MainStack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />{/* Аналог Route */}
        <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="Home" component={PostsScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="MapScreen" component={MapScreen} />

		<MainStack.Screen name="CreatePostsScreen" component={CreatePostsScreen} options={{ headerShown: false }} />
		<MainStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
		<MainStack.Screen name="CommentsScreen" component={CommentsScreen} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}
