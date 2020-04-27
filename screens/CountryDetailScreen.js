//
// Author: Manenga Mungandi
// CountryDetailScreen.js
// Rona
//

import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles';
import { BasicSummaryView, LoadingSummaryRow } from '../components/StyledViews';
import * as FacebookAds from 'expo-ads-facebook';

class CountryDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: '',
        summaryLoaded: false,
      };
  }

  componentDidMount(){ 
    fetch('https://corona.lmao.ninja/v2/countries/South%20Africa')
    .then((response) => {
    //   console.log('=============================')
    //   console.log('response: ' + response)
      return response.json()
    })
    .then((json) => {
      // Save state
      this.setState({dataSource: json})
    })
    .catch((error) => console.error(error))
    .finally(() => {
      // console.log('finally finished')
      this.setState({summaryLoaded: true})
    })
  }

  render() {
    let item = this.state.dataSource;
    // console.log('Rendering country: ' + item.country)
    // console.log('Rendering country: ' + item.cases);

    var todayCases = item.todayCases ?? 0;
    var todayDeaths = item.todayDeaths ?? 0;
    var flag = 'https://corona.lmao.ninja/assets/img/flags/za.png';
    const props = {
      headerText: 'South Africa', 
      headerImage: flag, 
      tests: item.tests,
      cases: item.cases,
      todayCases: todayCases, 
      deaths: item.deaths, 
      todayDeaths: todayDeaths,
      recovered: item.recovered
    };

    if (this.state.summaryLoaded) {
      return (
        <View style={[styles.container, {backgroundColor: '#FFF1F1'}]}>
            <ScrollView 
              style={[styles.container, {height: '100%'}]} 
              contentContainerStyle={styles.contentContainer}>
                <BasicSummaryView props={props}/>
            </ScrollView>
            <AdViewWithBanner/> 
        </View>
      ); 
    } else {
      return <LoadingSummaryRow/>;
    }
  }
}

function AdViewWithBanner(props) {
    return (
        <View style={props, {paddingBottom: 20}}>
        <FacebookAds.BannerAd
            placementId="237156577505364_237619077459114"
            type="standard"
            onPress={() => console.log('click')}
            onError={error => console.log('error', error)}
        />
        </View>
    );
}

export default CountryDetailScreen;

/* Features
- todayCases, todayDeaths
- active cases
- lockdown status
- news
- tweets
*/