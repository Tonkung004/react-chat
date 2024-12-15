import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../config/constants";
import { auth } from '../config/firebase';
import Cell from "../components/Cell";
import { useNavigation } from "@react-navigation/native";
import { updateProfile } from 'firebase/auth';  // สำหรับอัปเดตชื่อและรูปโปรไฟล์
import * as ImagePicker from 'expo-image-picker';  // สำหรับเลือกภาพจากแกลเลอรี

const Profile = () => {
    const navigation = useNavigation();

    const changeName = async () => {
        let newName = prompt('Enter new name');
        if (newName && auth.currentUser) {
            try {
                await updateProfile(auth.currentUser, { displayName: newName });
                alert('Name updated successfully!');
            } catch (error) {
                console.error(error);
                alert('Failed to update name');
            }
        }
    };

    const changePP = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.uri;
            try {
                await updateProfile(auth.currentUser, { photoURL: imageUri });
                alert('Profile picture updated successfully!');
            } catch (error) {
                console.error(error);
                alert('Failed to update profile picture');
            }
        }
    };

    const showPP = () => {
        if (auth?.currentUser?.photoURL) {
            alert(`Profile Picture: ${auth.currentUser.photoURL}`);
        } else {
            alert('No profile picture set.');
        }
    };

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.avatar} onPress={showPP}>
                {auth?.currentUser?.photoURL ? (
                    <Image source={{ uri: auth.currentUser.photoURL }} style={styles.avatarImage} />
                ) : (
                    <View>
                        <Text style={styles.avatarLabel}>
                            {
                                auth?.currentUser?.displayName !== ''
                                    ? auth?.currentUser?.displayName.split(' ').reduce((prev, current) => `${prev}${current[0]}`, '')
                                    : auth?.currentUser?.email.split(' ').reduce((prev, current) => `${prev}${current[0]}`, '')
                            }
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={changePP}>
                <Ionicons name="camera-outline" size={30} color='white' />
            </TouchableOpacity>

            <Cell
                title='Name'
                icon='person-outline'
                iconColor="black"
                subtitle={auth?.currentUser?.displayName}
                secondIcon='pencil-outline'
                onPress={changeName}
                style={{ marginBottom: 5 }}
            />

            <Cell
                title='Email'
                subtitle={auth?.currentUser?.email}
                icon='mail-outline'
                iconColor="black"
                secondIcon='pencil-outline'
                style={{ marginBottom: 5 }}
                onPress={() => alert(`Email: ${auth?.currentUser?.email}`)}
            />

            <Cell
                title='About'
                subtitle={'Available'}
                icon='information-outline'
                iconColor="black"
                secondIcon='pencil-outline'
                style={{ marginBottom: 5 }}
                onPress={() => navigation.navigate('About')}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        marginTop: 2,
        color: '#565656'
    },
    avatar: {
        marginTop: 12,
        marginStart: 112,
        width: 168,
        height: 168,
        borderRadius: 84,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    avatarLabel: {
        fontSize: 20,
        color: 'white'
    },
    avatarImage: {
        width: 168,
        height: 168,
        borderRadius: 84
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.teal,
        marginStart: 224,
        bottom: 56,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: -36,
    },
})

export default Profile;
