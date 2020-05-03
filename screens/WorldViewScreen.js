//
// Author: Manenga Mungandi
// WorldViewScreen.js
// Rona
//

import * as React from 'react';
import { Image, Text, View, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
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
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({summaryLoaded: true})
      })
  }

  LoveClick = () => {
    const url = 'https://github.com/manenga';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  render() {
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
        color: Colors.primary,
        legendFontColor: Colors.primary,
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
        color: Colors.primary,
        legendFontColor: Colors.primary,
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
        color: Colors.lightGrey,
        legendFontColor: Colors.black,
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
        color: Colors.primary,
        legendFontColor: Colors.primary,
        legendFontSize: legendFontSize
      },
      {
        name: "",
        population: this.state.worldConfirmed- (this.state.worldDeaths + this.state.worldRecovered),
        color: Colors.lightGrey,
        legendFontColor: Colors.darkGrey,
        legendFontSize: legendFontSize
      },
    ];

    // TODO - use percentages instead
    const testsData = [
      {
        name: "Cases",
        population: this.state.worldConfirmed,
        color: Colors.primary,
        legendFontColor: Colors.primary,
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
          style={[Styles.gradientView, {height: '100%', width: '100%', borderRadius: 0}]}
          colors={['#600200', '#D35D5A', '#390100']}>
            <ScrollView style={Styles.container} contentContainerStyle={[Styles.contentContainer, {alignItems: 'center'}]}>
              <BasicSummaryView props={props}/>
              <BasicPieChart props={{data: testsData, cardTitle: 'TESTS BREAKDOWN', footerText: 'Total tests taken', footerValue: this.state.worldTests}}/>
              <BasicPieChart props={{data: recoveryDeathsDiagnosedCaseData, cardTitle: 'OUTCOME BREAKDOWN', footerText: 'Total cases', footerValue: this.state.worldConfirmed}}/>
              <BasicPieChart props={{data: mildSeriousCaseData, cardTitle: 'CASES BREAKDOWN', footerText: 'Total active cases', footerValue: this.state.active}}/>
              <AcknowledgmentsView/>
              <TouchableOpacity
                onPress={this.LoveClick}>
                <Text style={{color: 'white', fontSize: 14, fontWeight: '300', marginTop: 14, marginBottom: 8}}>Made with ♥ by Manenga </Text>
              </TouchableOpacity>
          </ScrollView>
          <AdWithBanner/> 
        </LinearGradient>
      );
    } else {
      return <LoadingSummaryRow/>;
    }
  }
}

function AdWithBanner(props) {
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

// TODO: most affected countries by number of cases
// TODO: most affected countries by total deaths
// TODO: most affected countries by new deaths
// TODO: most affected countries by new cases