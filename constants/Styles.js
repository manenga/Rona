//
// Author: Manenga Mungandi
// Styles.js
// Rona
//

import { StyleSheet, Platform } from 'react-native';
import Color from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 5,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      paddingHorizontal: 10,
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 5,
      paddingHorizontal: 4,
    },
    metricHighlightContainer: {
      backgroundColor: '#FFF1F1',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 14,
      lineHeight: 32,
      color: Color.darkGrey,
      textAlign: 'center',
    },
    countryNameHeaderText: {
      color: 'rgba(96,100,109, 1)',
      lineHeight: 32,
      textAlign: 'center',
      marginTop: 12, 
      marginBottom: 32, 
      fontWeight: 'bold', 
      fontSize: 18, 
      color: '#600200'
    },
    lastUpdateFooterText: {
      fontSize: 11,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
      marginTop: 4, 
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
    contentContainer: {
      paddingTop: 15,
    },
    optionIconContainer: {
      marginRight: 12,
    },
    option: {
      backgroundColor: '#fdfdfd',
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: Color.primary,
    },
    lastOption: {
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginTop: 1,
    },
    basicSummaryViewHeaderImage: {
      width: 70, 
      height: 40, 
      alignSelf: 'center',
      resizeMode: 'contain'
    },
    gradientView: {
      alignItems: 'center', 
      borderColor: 'transparent'
    }
  });

  export default styles;