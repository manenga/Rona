//
// Author: Manenga Mungandi
// TabBarIcon.js
// Rona
//

import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import Colors from '../constants/Colors';
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabBarIcon(props) {
  return (
    <FontAwesome5 
      name={props.name} 
      size={24} 
      color={props.focused ? Colors.primary : Colors.tabIconDefault}
    />
  );
}
