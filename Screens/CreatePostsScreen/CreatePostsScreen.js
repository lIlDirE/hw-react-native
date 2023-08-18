import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const InitialState = {
  name: "",
  location: "",
  avatar: "",
};

const CreatePostScreen = () => {
	const navigation = useNavigation();
  const [formObj, setFormObj] = useState(InitialState);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [validationError, setValidationError] = useState("");

  const removeImage = () => {
    setFormObj(InitialState);
    setValidationError("");
  };

  const submitForm = () => {
    if (!formObj.avatar || !formObj.name || !formObj.location) {
      setValidationError("Please fill in all required fields.");
    } else {
      console.log(formObj);
      setFormObj(InitialState);
      setValidationError("");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Photo,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFormObj((prevState) => ({
        ...prevState,
        avatar: result.assets[0].uri,
      }));
    }
  };

  const navToCreate = () => {
    console.log("click");
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
            <Text style={styles.headerText}>Створити публікацію</Text>
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
                {formObj.avatar && (
                  <Image
                    source={{ uri: formObj.avatar }}
                    style={styles.avatarImage}
                  ></Image>
                )}
                <View
                  style={
                    formObj.avatar === ""
                      ? styles.addIconBgDefault
                      : styles.addIconBG
                  }
                >
                  <Ionicons
                    name="camera"
                    style={
                      formObj.avatar === ""
                        ? styles.addIconDefault
                        : styles.addIcon
                    }
                    size={25}
                    onPress={pickImage}
                  ></Ionicons>
                </View>
              </View>
              {formObj.avatar === "" ? (
                <Text style={styles.mainText}>Завантажте фото</Text>
              ) : (
                <Text style={styles.mainText}>Редагувати фото</Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              value={formObj.name}
              onFocus={() => {
                setShowKeyboard(true);
              }}
              onBlur={() => {
                setShowKeyboard(false);
              }}
              onChangeText={(value) =>
                setFormObj((prevState) => ({ ...prevState, name: value }))
              }
            />
            <View>
              <TextInput
                style={[styles.input, { paddingLeft: 30, marginTop: 15 }]}
                placeholder="Місцевість..."
                value={formObj.location}
                onFocus={() => {
                  setShowKeyboard(true);
                }}
                onBlur={() => {
                  setShowKeyboard(false);
                }}
                onChangeText={(value) =>
                  setFormObj((prevState) => ({ ...prevState, location: value }))
                }
              />
              <Ionicons
                name="location-outline"
                style={styles.geoIcon}
                size={25}
                onPress={pickImage}
              ></Ionicons>
            </View>
			{validationError !== "" && (
              <Text style={styles.errorText}>{validationError}</Text>
            )}
            <TouchableOpacity
              style={
                formObj.avatar && formObj.name && formObj.location
                  ? styles.addButton
                  : styles.addButtonDisable
              }
              onPress={submitForm}
            >
              <Text
                style={
					formObj.avatar && formObj.name && formObj.location
                    ? styles.addText
                    : styles.addTextDisabled
                }
              >
                Опубліковати
              </Text>
            </TouchableOpacity>


          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearButton}>
              <Ionicons
                name="trash-outline"
                style={styles.plusIcon}
                size={25}
                onPress={removeImage}
              ></Ionicons>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  errorText: {
		position: "absolute",
		top: 425,
    color: "red",
    fontSize: 16,
    textAlign: "center",

  },
  mainText: {
    marginTop: 10,
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: 400,
    justifyContent: "flex-start",
  },

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
  avatarImage: {
    width: 345,
    height: 240,
    borderRadius: 8,
    position: "absolute",
  },
  addIconDefault: {
    color: "#BDBDBD",
  },
  addIcon: {
    color: "white",
  },

  addIconBG: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  addIconBgDefault: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
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
    marginTop: 30,
    width: 345,
  },

  addButtonDisable: {
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
    marginTop: 30,
    width: 345,
  },

  clearButton: {
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
    marginTop: 30,
  },

  input: {
    marginTop: 15,
    height: 50,
    borderColor: "#BDBDBD",
    width: 355,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 8,
    color: "#212121",
    fontSize: 16,
    fontWeight: 400,
  },

  geoIcon: {
    position: "absolute",
    top: 25,
    left: 5,
  },

  plusIcon: {
    color: "#BDBDBD",
  },

  registerView: {
    flexDirection: "row",
    marginTop: 15,
  },

  footer: {
    width: "100%",
    height: 190,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 10,
  },

  addText: {
    color: "white",
  },

  addTextDisabled: {
    color: "#BDBDBD",
  },
});

export default CreatePostScreen;
