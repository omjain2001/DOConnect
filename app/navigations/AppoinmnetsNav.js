import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const CompleteAppoinmentScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Complete</Text>
  </Layout>
);

const PendingAppoinmentScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Pending</Text>
  </Layout>
);

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    style={{marginTop:"8%"}}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='Complete'/>
    <Tab title='Pending'/>
  </TabBar>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen  name='Complete' component={CompleteAppoinmentScreen}/>
    <Screen name='Pending' component={PendingAppoinmentScreen}/>
  </Navigator>
);

export const AppoinmentNav = () => (
  <NavigationContainer independent={true}>
    <TabNavigator/>
  </NavigationContainer>
);