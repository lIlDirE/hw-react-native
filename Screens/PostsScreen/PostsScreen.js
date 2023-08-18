import { StatusBar } from "expo-status-bar";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PostsScreen = () => {
	const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Публікації</Text>
          <Ionicons
            name="log-out-outline"
            style={styles.logoutIcon}
            size={25}
			onPress={() => navigation.navigate("Login")}
          ></Ionicons>

      </View>
	<View style={styles.posts}>

	</View>
      <View style={styles.footer}>
	  <Ionicons
                  name="grid-outline"
                  style={styles.menuIcon}
                  size={25}
				  onPress={() => navigation.navigate("Home")}
                ></Ionicons>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreatePostsScreen")}>
		<Ionicons
                  name="add-outline"
                  style={styles.plusIcon}
                  size={25}

                ></Ionicons>
		</TouchableOpacity>
		<Ionicons
                  name="person-outline"
                  style={styles.menuIcon}
                  size={25}
				  onPress={() => navigation.navigate("ProfileScreen")}
                ></Ionicons>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
	borderColor: "rgba(0, 0, 0, 0.30)",
    display: "flex",
	flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  headerText: {
    color: "#212121",
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.408,
	marginBottom: 10,
  },

  logoutIcon: {
	position: "absolute",
	right: 15,
	bottom: 7,
	color: '#BDBDBD',
  },

  posts: {

  },

  footer: {
  	width: "100%",
	height: 85,
    borderWidth: 1,
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "baseline",
	paddingTop: 10,
	borderColor: "rgba(0, 0, 0, 0.30)",
},

  avatarDiv: {
    width: 135,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -66,
  },
  avatarImage: {
    width: 135,
    height: 120,
    borderRadius: 16,
    position: "absolute",
  },
  addAvatarButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: -10,
    width: 25,
    height: 25,
    borderRadius: 20,
    borderColor: "orange",
    borderWidth: 1,
  },

  addButton: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    borderRadius: 25,
    width: 70,
    height: 40,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	marginHorizontal: 40,
  },

  plusIcon: {
	color: "white",

  },

  registerView: {
    flexDirection: "row",
    marginTop: 15,
  },
});

export default PostsScreen;
