//
// Author: Manenga Mungandi
// Entensions.js
// Rona
//

import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';

export function format(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function DevelopmentModeNotice() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
  
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled: your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode: your app will run at full speed.
        </Text>
      );
    }
  }
  
  function handleLearnMorePress() {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
  }
  
  function handleHelpPress() {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
    );
  }

  // TODO
  // Object level function extensions
  // https://stackoverflow.com/questions/47630632/react-where-to-extend-object-prototype
  //