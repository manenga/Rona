//
// Author: Manenga Mungandi
// WorldViewScreen.js
// Rona
//
// Potential nice to have features:
// most affected countries by total deaths, new deaths, total cases, new cases
//
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles';
import Color from '../constants/Colors';
import { format } from '../constants/Extensions'
import * as FacebookAds from 'expo-ads-facebook';
import { BasicPieChart, BasicSummaryView, LoadingSummaryRow } from '../components/StyledViews';
import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from 'expo-linear-gradient';

const initialState = {
  dataSource: '',
  active: 0,
  critical: 0,
  lastUpdate: 0,
  worldTests: 0,
  todayDeaths: 0,
  todayCases: 0,
  worldDeaths: 0,
  worldConfirmed: 0,
  worldRecovered: 0,
  summaryLoaded: false,
}

export default class WorldViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount(){
    fetch('https://corona.lmao.ninja/v2/all')
      .then((response) => {
        // console.log('response: ' + response)
        return response.json()
      })
      .then((json) => {
        const tests = json.tests ?? 0;
        const active = json.active ?? 0;
        const critical = json.critical ?? 0;
        const deaths = json.deaths ?? 0;
        const todayDeaths = json.todayDeaths ?? 0;
        const confirmed = json.cases ?? 0;
        const todayCases = json.todayCases ?? 0;
        const recovered = json.recovered ?? 0;
        const lastUpdate = json.updated ?? 0;
        
        // Save state
        this.setState({dataSource: json})
        this.setState({worldTests: tests})
        this.setState({active: active})
        this.setState({critical: critical})
        this.setState({worldDeaths: deaths})
        this.setState({todayCases: todayCases})
        this.setState({todayDeaths: todayDeaths})
        this.setState({lastUpdate: lastUpdate})
        this.setState({worldConfirmed: confirmed})
        this.setState({worldRecovered: recovered})
        
        // Print Summary
        // console.log('Number of todayDeaths: ' + format(todayDeaths))
        // console.log('Number of confirmed cases: ' + format(confirmed))
        // console.log('Number of todayCases: ' + format(todayCases))
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // console.log('finally finished')
        this.setState({summaryLoaded: true})
      })
  }

  render() {
    // Data for BasicSummaryView
    // console.log('Number of todayDeaths: ' + format(this.state.todayDeaths))
    // console.log('Number of todayCases: ' + format(this.state.todayCases))
    const props = {
      tests: format(this.state.worldTests), 
      cases: format(this.state.worldConfirmed), 
      todayDeaths: this.state.todayDeaths, 
      todayCases: this.state.todayCases, 
      deaths: format(this.state.worldDeaths), 
      recovered: format(this.state.worldRecovered),
      lastUpdate: this.state.lastUpdate
    };

    // Mark: Chart Data

    const activeInactiveCaseData = [
      {
        name: "Active",
        population: this.state.active,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: 12
      },
      {
        name: "Inactive",
        population: this.state.worldConfirmed - this.state.active,
        color: 'rgba(253, 155, 152, 0.6)',
        legendFontColor: 'black',
        legendFontSize: 12
      },
    ];

    const mildSeriousCaseData = [
      {
        name: "Critical",
        population: this.state.critical,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: 12
      },
      {
        name: "Mild",
        population: this.state.active - this.state.critical,
        color: 'rgba(253, 155, 152, 0.6)',
        legendFontColor: 'black',
        legendFontSize: 12
      },
    ];

    const recoveryDiagnosedCaseData = [
      {
        name: "Cases",
        population: this.state.worldConfirmed,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: 12
      },
      {
        name: "Recovered",
        population: this.state.worldRecovered,
        color: 'rgba(253, 155, 152, 0.6)',
        legendFontColor: 'black',
        legendFontSize: 12
      },
    ];

    const deathsDiagnosedCaseData = [
      {
        name: "Cases",
        population: this.state.worldConfirmed,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: 12
      },
      {
        name: "Deaths",
        population: this.state.worldDeaths,
        color: 'rgba(253, 155, 152, 0.6)',
        legendFontColor: 'black',
        legendFontSize: 12
      },
    ];

    // TODO - use percentages instead
    const testsData = [
      {
        name: "Confirmed",
        population: this.state.worldConfirmed,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: 12
      },
      {
        name: "Unconfirmed",
        population: this.state.worldTests - this.state.worldConfirmed,
        color: 'rgba(253, 155, 152, 0.6)',
        legendFontColor: 'black',
        legendFontSize: 12
      },
    ];

    if (this.state.summaryLoaded) {
      return (
        <LinearGradient 
          style={[styles.gradientView, {height: '100%', width: '100%', borderRadius: 0}]}
          colors={['#600200', '#D35D5A', '#390100']}>
            <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, {alignItems: 'center'}]}>
              <BasicSummaryView props={props}/>
              <BasicPieChart props={{data: testsData, headerText: 'Tests Breakdown', footerText: 'Total tests taken cases', footerValue: this.state.worldTests}}/>
              <BasicPieChart props={{data: recoveryDiagnosedCaseData, headerText: 'Recovered / Diagnosed Cases', footerText: 'Total active cases', footerValue: this.state.active}}/>
              <BasicPieChart props={{data: deathsDiagnosedCaseData, headerText: 'Deaths / Diagnosed Cases', footerText: 'Total active cases', footerValue: this.state.active}}/>
              <BasicPieChart props={{data: activeInactiveCaseData, headerText: 'Active / Inactive Cases', footerText: 'Total cases', footerValue: this.state.worldConfirmed}}/>
              <BasicPieChart props={{data: mildSeriousCaseData, headerText: 'Mild / Serious Cases', footerText: 'Total active cases', footerValue: this.state.active}}/>
          </ScrollView>
          <ViewWithBanner/> 
        </LinearGradient>
      );
    } else {
      return <LoadingSummaryRow/>;
    }
  }
}

function ViewWithBanner(props) {
  return (
    <View style={{width: '100%', paddingBottom: 20}}>
      <FacebookAds.BannerAd
        placementId="237156577505364_237619077459114"
        type="standard"
        onPress={() => console.log('click')}
        onError={error => console.log('error', error)}
      />
    </View>
  );
}