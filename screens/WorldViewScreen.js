//
// Author: Manenga Mungandi
// WorldViewScreen.js
// Rona
//

import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles';
import Color from '../constants/Colors';
import { format } from '../constants/Extensions'
import * as FacebookAds from 'expo-ads-facebook';
import { BasicSummaryView, CasesPieChart, LoadingSummaryRow } from '../components/StyledViews';
import { LineChart, BarChart, PieChart, ProgressChart, StackedBarChart } from "react-native-chart-kit";

export default class WorldViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: '',
      worldTests: 0,
      worldDeaths: 0,
      worldConfirmed: 0,
      worldRecovered: 0,
      summaryLoaded: false,
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
        const tests = json.tests ?? 0;
        const deaths = json.deaths ?? 0;
        const confirmed = json.cases ?? 0;
        const recovered = json.recovered ?? 0;
        const lastUpdate = json.updated ?? 0;
        // console.log('Json: ' + json.toString)
        
        // Save state
        this.setState({dataSource: json})
        this.setState({worldTests: tests})
        this.setState({worldDeaths: deaths})
        this.setState({worldConfirmed: confirmed})
        this.setState({worldRecovered: recovered})
        
        // Print Summary
        console.log('Number of deaths: ' + format(deaths))
        console.log('Number of confirmed cases: ' + format(confirmed))
        console.log('Number of recovered cases: ' + format(recovered))
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log('finally finished')
        this.setState({summaryLoaded: true})
      })
  }

  render() {
    // Data for BasicSummaryView
    const props = {
      cases: format(this.state.worldConfirmed), 
      deaths: format(this.state.worldDeaths), 
      recovered: format(this.state.worldRecovered)
    };

    // Data for CasesPieChartView
    const data = [
      {
        name: "Confirmed",
        population: 34, //this.state.worldConfirmed,
        color: 'yellow',
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },
      {
        name: "Deaths",
        population: 2, //this.state.worldDeaths,
        color: Color.primary,
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },
      {
        name: "Recoveries",
        population: 64, //this.state.worldRecovered,
        legend: '64%',
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10
      },
      // {
      //   name: "Tests",
      //   population: this.state.worldTests,
      //   color: "rgba(131, 167, 234, 1)",
      //   legendFontColor: "#7F7F7F",
      //   legendFontSize: 10
      // }
    ];

    if (this.state.summaryLoaded) {
      return (
        <View style={[styles.container, {backgroundColor: '#FFF1F1'}]}>
          <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, {alignItems: 'center'}]}>
            <Image
              source={require('../assets/images/coronavirus.png')}
              style={styles.welcomeImage}
            />
            <BasicSummaryView props={props}/>
            <CasesPieChartView props={data}/>
          </ScrollView>
          <ViewWithBanner/> 
        </View>
      );
    } else {
      return <LoadingSummaryRow/>;
    }
  }
}

function CasesPieChartView(props) {
  return (
    <CasesPieChart props={props} />
  );
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