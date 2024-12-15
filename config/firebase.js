import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBmu9Y9oUTQx9CqNcvTxWDAlVeyl-Q-5m0",
    authDomain: "noreply@native-chat-1f4e9.firebaseapp.com",
    projectId: "native-chat-1f4e9",
    storageBucket: "gs://native-chat-1f4e9.appspot.com",
    messagingSenderId: "528118388336",
    appId: "1:528118388336:web:c4f08f6d353fbdbeddc6b5",
    databaseURL: "https://native-chat-1f4e9-default-rtdb.asia-southeast1.firebasedatabase.app/",
    measurementId: "G-0GGHL54ZXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export const database = getFirestore();