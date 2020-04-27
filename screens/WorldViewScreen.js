//
// Author: Manenga Mungandi
// WorldViewScreen.js
// Rona
//

import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles';
import { format } from '../constants/Extensions'
import * as FacebookAds from 'expo-ads-facebook';
import { BasicSummaryView } from '../components/StyledViews';

export default class WorldViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: '',
      countries: [],
      worldDeaths: 0,
      worldConfirmed: 0,
      WorldRecovered: 0,
    };
  }

  componentDidMount(){
    fetch('https://corona.lmao.ninja/v2/all')
      .then((response) => {
        console.log('=============================')
        // console.log('response: ' + response)
        return response.json()
      })
      .then((json) => {
        var deaths = 0;
        var confirmed = 0;
        var recovered = 0;
        var lastUpdate = 0;
        var countries = [];
        // console.log('Json: ' + json.toString)

        deaths += json.deaths
        recovered += json.recovered
        confirmed += json.cases
        
        // Save state
        this.setState({dataSource: json})
        this.setState({worldDeaths: deaths})
        this.setState({countries: countries})
        this.setState({worldConfirmed: confirmed})
        this.setState({WorldRecovered: recovered})
        
        // Print Summary
        console.log('Number of deaths: ' + format(deaths))
        console.log('Number of confirmed cases: ' + format(confirmed))
        console.log('Number of recovered cases: ' + format(recovered))
        console.log('Number of countries: ' + countries.length)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log('finally finished')
      })
  }

  render() {
    const props = {
      cases: format(this.state.worldConfirmed), 
      deaths: format(this.state.worldDeaths), 
      recovered: format(this.state.WorldRecovered)
    };

    return (
      <View style={[styles.container, {backgroundColor: '#FFF1F1'}]}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/coronavirus.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {/* <DevelopmentModeNotice /> */}
            <BasicSummaryView props={props}/>
          </View>
        </ScrollView>
        <ViewWithBanner/> 
      </View>
    );
  }
}

function ViewWithBanner(props) {
  return (
    <View style={{paddingBottom: 20}}>
      <FacebookAds.BannerAd
        placementId="237156577505364_237619077459114"
        type="standard"
        onPress={() => console.log('click')}
        onError={error => console.log('error', error)}
      />
    </View>
  );
}

/* Features
- todayCases, todayDeaths
- collapsible sections
    most affected countries by total deaths, new deaths, total cases, new cases
*/