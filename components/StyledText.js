//
// Author: Manenga Mungandi
// StyledText.js
// Rona
//

import * as React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
