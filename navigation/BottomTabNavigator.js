//
// Author: Manenga Mungandi
// BottomTabNavigator.js
// Rona
//

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import WorldViewScreen from '../screens/WorldViewScreen';
import CountryListScreen from '../screens/CountryListScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';
import Colors from '../constants/Colors';
import { TabBar } from "react-native-animated-nav-tab-bar";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'World';

const Tabs = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return ( 
    <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: "#2F7C6E",
      inactiveTintColor: "#222222"
    }}
    tabBar={props => (
      <TabBar
        activeColors={"#2F7C6E"}
        activeTabBackgrounds={"#DFF7F6"}
        {...props}
      />
    )}
  >
    <Tabs.Screen
      name="World View"
      component={WorldViewScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon focused={focused} name="globe-africa" />
        )
      }}
    />
    <Tabs.Screen
      name="Country View"
      component={CountryDetailScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon focused={focused} name="map-marked-alt" />
        )
      }}
    />
    </Tabs.Navigator>
    // Optional TODO - Prevention Tab
  );
}

function getHeaderTitle(route) {
  // const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  return 'COVID-19 CORONAVIRUS PANDEMIC';
}
