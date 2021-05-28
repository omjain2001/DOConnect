import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Icon, Input} from '@ui-kitten/components';

export default function App() {
  const [oldPassword, setoldPassword] = React.useState('');
  const [newPassword, setnewPassword] = React.useState('');
  const [confirmPassword, setconfirmPassword] = React.useState('');
  const [hidePassword, sethidePassword] = React.useState(true);
  const [hideOld, sethideOld] = React.useState(true);
  const [hideNew, sethideNew] = React.useState(true);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: -180,
        }}>
        <MaterialIcons name="lock-outline" size={100} color="#12C0B4" />
      </View>
      <View
        style={{
          padding: 20,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            paddingBottom: 20,
            width: '100%',
          }}>
          <TextInput
            style={styles.textBox}
            secureTextEntry={hideOld}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setoldPassword(text)}
            value={oldPassword}
            placeholder="Old Password"
          />
          <TouchableOpacity
            style={styles.visibilityBtn}
            onPress={() => sethideOld(!hideOld)}>
            {hideOld ? (
              <Ionicons name="ios-eye-off" size={24} color="#909EB3" />
            ) : (
              <Ionicons name="ios-eye" size={24} color="#909EB3" />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            paddingBottom: 20,
          }}>
          <TextInput
            style={styles.textBox}
            underlineColorAndroid="transparent"
            secureTextEntry={hideNew}
            onChangeText={(text) => setnewPassword(text)}
            value={newPassword}
            placeholder="New Password"
          />
          <TouchableOpacity
            style={styles.visibilityBtn}
            onPress={() => sethideNew(!hideNew)}>
            {hideNew ? (
              <Ionicons name="ios-eye-off" size={24} color="#909EB3" />
            ) : (
              <Ionicons name="ios-eye" size={24} color="#909EB3" />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20,
          }}>
          <TextInput
            style={styles.textBox}
            underlineColorAndroid="transparent"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setconfirmPassword(text)}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            style={styles.visibilityBtn}
            onPress={() => sethidePassword(!hidePassword)}>
            {hidePassword ? (
              <Ionicons name="ios-eye-off" size={24} color="#909EB3" />
            ) : (
              <Ionicons name="ios-eye" size={24} color="#909EB3" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}>
        <Button style={{fontSize: 16, borderRadius: 10}}>
          Change Password
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  textBox: {
    fontSize: 14,
    alignSelf: 'stretch',
    height: 50,
    width: '100%',
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 0.5,
    paddingVertical: 0,
    borderColor: '#909EB3',
    borderRadius: 10,
    backgroundColor: '#F8F9FD',
  },

  visibilityBtn: {
    position: 'absolute',

    right: -8,
    height: 45,
    width: 50,
  },
});
