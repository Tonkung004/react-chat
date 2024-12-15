import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { colors } from "../config/constants";
import Separator from "../components/Separator";
import Cell from "../components/Cell";
import { auth } from '../config/firebase';

const Help = ({ navigation }) => {

    return (
        <View>
            <Cell
                title='Contact us'
                subtitle='Questions? Need help?'
                icon='people-outline'
                tintColor={colors.primary}
                onPress={() => {
                    alert('Help touched');
                }}
                showForwardIcon={false}
                style={{ marginTop: 20 }}
            />
            <Cell
                title='App info'
                icon='information-circle-outline'
                tintColor={colors.pink}
                onPress={() => {
                    Alert.alert(
                      "React Native Chat App",
                      "Developed by \nChonticha Wangtaemklang 6514110003 \nNitithorn Thongsai 6514110018",
                      [
                        {
                          text: "Ok",
                          onPress: () => {},
                        },
                      ],
                      { cancelable: true }
                    );
                }}
                showForwardIcon={false}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    contactRow: {
        backgroundColor: 'white',
        marginTop: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border
    }
})

export default Help;
