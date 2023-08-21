import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";

import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const InitialState = {
  img: "",
  users: {},
  owner: {
    uid: "",
    ownerName: "",
    ownerAvatar: "",
    messages: {},
  },
};

const CommentsScreen = () => {
  const [messagesInfo, setMessagesInfo] = useState(InitialState);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [newMessage, setNewMessage] = useState({ message: "" });
  const navigation = useNavigation();

  const submitMessage = () => {
    const now = moment();
    const timestamp = new Date().getTime().toString();
    const formattedDate = now.format("DD MMMM, YYYY | HH:mm");

    const newMessageObj = {
      message: newMessage.message,
      date: formattedDate,
    };

    const updatedOwner = {
      ...messagesInfo.owner,
      messages: {
        ...messagesInfo.owner.messages,
        [timestamp]: newMessageObj,
      },
    };

    setMessagesInfo((prevState) => ({
      ...prevState,
      owner: updatedOwner,
    }));

    setNewMessage({ message: "" });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...styles.mainDiv,
            marginTop: showKeyboard ? -90 : 0,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Коментарі</Text>
            <Ionicons
              name="arrow-back-outline"
              style={styles.navBack}
              size={25}
              onPress={() => navigation.navigate("Home")}
            ></Ionicons>
          </View>
          <View style={styles.mainDiv}>
            <View>
              <View style={styles.imgDiv}>
                {messagesInfo.img && (
                  <Image
                    source={{ uri: messagesInfo.img }}
                    style={styles.avatarImage}
                  ></Image>
                )}
              </View>
              <ScrollView contentContainerStyle={styles.commentsDiv}>
                {Object.values(messagesInfo.owner.messages).map(
                  (message, index) => (
                    <View key={index} style={styles.commentsMessageUser}>
                      <Text>{message.message}</Text>
                      <Text>{message.date}</Text>
                    </View>
                  )
                )}
              </ScrollView>
            </View>
          </View>
          <View style={styles.footer}>
            <View>
              <TextInput
                style={[styles.input, { paddingLeft: 15 }]}
                placeholder="Коментувати..."
                value={messagesInfo.messages}
                onFocus={() => {
                  setShowKeyboard(true);
                }}
                onBlur={() => {
                  setShowKeyboard(false);
                }}
                onChangeText={(value) =>
                  setNewMessage((prevState) => ({
                    ...prevState,
                    message: value,
                  }))
                }
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={submitMessage}
              >
                <Ionicons
                  name="arrow-up-outline"
                  style={styles.sendArrowIcon}
                  size={25}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    borderWidth: 1,
    borderColor: "#BDBDBD",
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

  navBack: {
    position: "absolute",
    left: 15,
    bottom: 7,
    color: "#BDBDBD",
  },

  mainDiv: {
    height: "91%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
  },

  imgDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 345,
    height: 240,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },

  input: {
    marginTop: 15,
    height: 50,
    width: 345,
    paddingLeft: 8,
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    fontWeight: 400,
    borderRadius: 20,
  },

  sendButton: {
    position: "absolute",
    top: 22,
    right: 8,
    width: 35,
    height: 35,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },

  sendArrowIcon: {
    position: "absolute",
    left: 5,
    bottom: 5,
    color: "#fff",
  },

  commentsDiv: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
  },

  commentsMessageUser: {
    marginLeft: 44,
    width: 300,
    minHeight: 70,
    paddingHorizontal: 16,
    paddingBottom: 35,
    paddingTop: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginTop: 24,
    borderRadius: 16,
    borderTopLeftRadius: 0,
  },

  commentsMessageOwner: {
    marginRight: 44,
    width: 300,
    minHeight: 70,
    paddingHorizontal: 16,
    paddingBottom: 35,
    paddingTop: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginTop: 24,
  },

  footer: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 10,
  },
});

export default CommentsScreen;
