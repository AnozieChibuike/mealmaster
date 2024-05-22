import { Alert, Image, Text, View, TouchableOpacity } from "react-native";
import Button from "../../components/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import constant, { style } from "../../lib/constants";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import model from "../../lib/gemini";

function Landing({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [food, setFood] = useState(null);
  const uploadImage = async (mode) => {
    try {
      setLoading(true);
      let result = null;
      if (mode === "gallery") {
        
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          //   cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
      setImage(result.assets[0].uri);
      //   if (!result.canceled) sendToBackend(result.assets[0].uri);
    } catch (error) {
      Alert(error);
    } finally {
      setFood(null)
      setLoading(false);
    }
  };

  function tellMeMore () {
    navigation.navigate("ImageFound", { food });
  }

  async function aiImageRun() {
    setLoading(true);
    try {
      const imageFile = await urlToBase64(image);
      // console.log(imageFile)
      const ploader = {
        inlineData: {
          data: imageFile,
          mimeType: "image/png",
        },
      };
      const result = await model.generateContent([constant.prompt, ploader]);
      const response = await result.response;
      const text = JSON.parse(response.text())
      console.log(text)
      if (!!Number(text.status))
        setFood({
          name: text.name,
          ingredients: text?.ingredients,
          steps: text?.steps,
          found: true,
        });
      else setFood({ found: false });
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "An error occurred while generating the image. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={[
        style.container,
        { flexDirection: "column", justifyContent: "space-between" },
      ]}
    >
      {/* <View>
        <Text style={{ color: "green" }}>Meal Master</Text>
      </View> */}
      <View>
        <View
          style={{
            backgroundColor: "#474747",
            height: constant.height / 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            overflow: "hidden",
            borderRadius: 10,
          }}
        >
          <Ionicons name="image" color="grey" size={30} style={{}} />
          {image ? (
            <Image
              source={{ uri: image }}
              height={constant.height / 3}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            height: 80,
            overflow: "hidden",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              height: "100%",
              borderBottomStartRadius: 20,
              borderTopLeftRadius: 20,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => uploadImage()} disabled={loading}>
              <View
                style={{
                  backgroundColor: "#fcad03",
                  height: 45,
                  width: 45,
                  //   position: "absolute",
                  //   bottom: -5,
                  //   right: 0,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="camera" color="white" size={30} style={{}} />
              </View>
            </TouchableOpacity>
            <Text style={{ color: "#232830" }}>Camera</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#474747",
              height: "100%",
              borderBottomEndRadius: 20,
              borderTopRightRadius: 20,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => uploadImage("gallery")}
              disabled={loading}
              // disabled={modal}
            >
              <View
                style={{
                  backgroundColor: "#0362fc",
                  height: 45,
                  width: 45,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="image" color="white" size={30} style={{}} />
              </View>
            </TouchableOpacity>
            <Text style={{ color: "#232830" }}>Gallery</Text>
          </View>
        </View>
      </View>

      {food && (
        <Text selectable style={{ color: "black", textAlign: "center", fontSize: 30, fontWeight: 'bold' }}>
          {food?.found ? food.name : "No meal found..."}
        </Text>
      )}
      {image && (
        <Button
          text={food?.found ? "Tell me more" : "Search Food in Image"}
          onPress={() => {
            if (!food?.found)
            aiImageRun();
          else tellMeMore();
          }}
          disabled={loading}
          bg={"#36517d"}
          color={"white"}
          textColor="white"
        />
      )}
    </SafeAreaView>
  );
}

const urlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };

    reader.onerror = () => {
      reject("Error reading image.");
    };

    reader.readAsDataURL(blob);
  });
};

export default Landing;
