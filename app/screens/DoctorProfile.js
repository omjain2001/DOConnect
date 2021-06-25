import { Text } from '@ui-kitten/components';
import React from 'react';
import { View,StyleSheet } from 'react-native';

function DoctorProfile(props) {
    return (
        <View style={styles.container } >
            <Text>Hii</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }
});

export default DoctorProfile;