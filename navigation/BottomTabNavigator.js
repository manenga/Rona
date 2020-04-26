import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import WorldViewScreen from '../screens/WorldViewScreen';
import CountryListScreen from '../screens/CountryListScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'World';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return ( 
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="World"
        component={WorldViewScreen}
        options={{
          title: 'World View',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-globe" />,
        }}
      />
      <BottomTab.Screen
        name="Country"
        component={CountryDetailScreen}
        options={{
          title: 'South Africa',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pin" />, // ios-compass
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  // const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  return 'COVID-19 CORONAVIRUS PANDEMIC';
}
