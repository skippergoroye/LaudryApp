import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { TouchableOpacity } from "react-native";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    getUser()
    removeUser()
  },[])
  

  const removeUser = async () => {
    try {
      const logout = await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true)
      const savedUser = await AsyncStorage.getItem("data")
      const userData = JSON.parse(savedUser)
      if(!userData){
        setLoading(false)
      }
      if(userData){
        navigation.replace("Home")
      }
      // console.log(userData)
    } catch (error) {
      console.log(error)
    }
  };



  const login = () => {
    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
      // console.log("user credential",userCredential);
      const user = userCredential.user;
      // console.log("user details",user)

      const regData = {
        email: email,
        password: password,
      }

      console.log("Login Screen", regData)

      AsyncStorage.setItem("data", JSON.stringify(regData));
      navigation.navigate("Home")
    })
  }

  




  // useEffect(() => {
  //   setLoading(true);
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if(!authUser){
  //       setLoading(false);
  //     }
  //     if(authUser){
  //       navigation.replace("Home");
  //     }
  //   });

  //   return unsubscribe;
  // },[])



  // const login = async () => {
  //   try {
  //     const userCredential = signInWithEmailAndPassword(auth, email, password)
  //     navigation.navigate("Home")

  //     const regData = {
  //       email: email,
  //       password: password,

  //     }

  //     await AsyncStorage.setItem("data", JSON.stringify(regData));
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      {loading ? (
        <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
          <Text style={{marginRight:10}}>Loading</Text>
          <ActivityIndicator size="large" color={"red"}/>
        </View>
      ) : (
        <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
            Sign In
          </Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Sign In to your account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>

          <TouchableOpacity
          onPress={login}
            style={{
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Login
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Don't have a account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
