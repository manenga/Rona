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
import { 
  AcknowledgmentsView, 
  DeveloperAcknowledgmentsView, 
  BasicPieChart, 
  BasicSummaryView, 
  LoadingSummaryRow 
} from '../components/StyledViews';
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

const legendFontSize = 11;

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
      tests: this.state.worldTests, 
      cases: this.state.worldConfirmed, 
      todayDeaths: this.state.todayDeaths, 
      todayCases: this.state.todayCases, 
      deaths: this.state.worldDeaths, 
      recovered: this.state.worldRecovered,
      lastUpdate: this.state.lastUpdate,
      screenName: 'WORLD SUMMARY',
      active: this.state.active,
      critical: this.state.critical,
    };

    // Mark: Chart Data
    
    const activeInactiveCaseData = [
      {
        name: "Active",
        population: this.state.active,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: legendFontSize
      },
      {
        name: "Inactive",
        population: this.state.worldConfirmed - this.state.active,
        color: 'rgba(253, 155, 152, 0.6)',
        legendFontColor: 'black',
        legendFontSize: legendFontSize
      },
    ];

    const mildSeriousCaseData = [
      {
        name: "Critical",
        population: this.state.critical,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: legendFontSize
      },
      {
        name: "Mild",
        population: this.state.active - this.state.critical,
        color: 'rgba(253, 155, 152, 0.6)',
        legendFontColor: 'black',
        legendFontSize: legendFontSize
      },
    ];

    const recoveryDiagnosedCaseData = [
      {
        name: "Recovered",
        population: this.state.worldRecovered,
        color: 'green',
        legendFontColor: 'green',
        legendFontSize: legendFontSize
      },
      {
        name: "",
        population: this.state.worldConfirmed,
        color: Color.lightGrey,
        legendFontColor: Color.black,
        legendFontSize: legendFontSize
      },
    ];

    const recoveryDeathsDiagnosedCaseData = [
      {
        name: "Recovered",
        population: this.state.worldRecovered,
        color: 'green',
        legendFontColor: 'green',
        legendFontSize: legendFontSize
      },
      {
        name: "Deaths",
        population: this.state.worldDeaths,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: legendFontSize
      },
      {
        name: "",
        population: this.state.worldConfirmed- (this.state.worldDeaths + this.state.worldRecovered),
        color: Color.lightGrey,
        legendFontColor: Color.darkGrey,
        legendFontSize: legendFontSize
      },
    ];

    // TODO - use percentages instead
    const testsData = [
      {
        name: "Cases",
        population: this.state.worldConfirmed,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: 12
      },
      {
        name: "Unknown",
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
              <BasicPieChart props={{data: testsData, cardTitle: 'TESTS BREAKDOWN', footerText: 'Total tests taken', footerValue: this.state.worldTests}}/>
              <BasicPieChart props={{data: recoveryDeathsDiagnosedCaseData, cardTitle: 'OUTCOME BREAKDOWN', footerText: 'Total cases', footerValue: this.state.worldConfirmed}}/>
              {/* <BasicPieChart props={{data: recoveryDiagnosedCaseData, cardTitle: 'RECOVERY RATE', footerText: 'Total cases', footerValue: this.state.worldConfirmed}}/>
              <BasicPieChart props={{data: deathsDiagnosedCaseData, cardTitle: 'DEATH RATE', footerText: 'Total cases', footerValue: this.state.worldConfirmed}}/> */}
              {/* <BasicPieChart props={{data: activeInactiveCaseData, cardTitle: 'CASES BREAKDOWN', footerText: 'Total cases', footerValue: this.state.worldConfirmed}}/> */}
              <BasicPieChart props={{data: mildSeriousCaseData, cardTitle: 'CASES BREAKDOWN', footerText: 'Total active cases', footerValue: this.state.active}}/>
              <AcknowledgmentsView/>
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