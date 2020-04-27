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
import { LinearGradient } from 'expo-linear-gradient';

export default class WorldViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: '',
      lastUpdate: 0,
      worldTests: 0,
      todayDeaths: 0,
      todayCases: 0,
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
        console.log('response: ' + response.todayCases)
        return response.json()
      })
      .then((json) => {
        const tests = json.tests ?? 0;
        const deaths = json.deaths ?? 0;
        const todayDeaths = json.todayDeaths ?? 0;
        const confirmed = json.cases ?? 0;
        const todayCases = json.todayCases ?? 0;
        const recovered = json.recovered ?? 0;
        const lastUpdate = json.updated ?? 0;
        // console.log('Json: ' + json.toString)
        
        // Save state
        this.setState({dataSource: json})
        this.setState({worldTests: tests})
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
    console.log('Number of todayDeaths: ' + format(this.state.todayDeaths))
    console.log('Number of todayCases: ' + format(this.state.todayCases))
    const props = {
      tests: format(this.state.worldTests), 
      cases: format(this.state.worldConfirmed), 
      todayDeaths: this.state.todayDeaths, 
      todayCases: this.state.todayCases, 
      deaths: format(this.state.worldDeaths), 
      recovered: format(this.state.worldRecovered),
      lastUpdate: this.state.lastUpdate
    };

    // Data for CasesPieChartView
    const data = [
      {
        name: "Confirmed",
        population: this.state.worldConfirmed,
        color: '#FD9B98',
        legendFontColor: "white",
        legendFontSize: 12
      },
      {
        name: "Tests",
        population: this.state.worldConfirmed,
        color: 'black',
        legendFontColor: 'white',
        legendFontSize: 12
      },
      {
        name: "Deaths",
        population: this.state.worldDeaths,
        color: Color.primary,
        legendFontColor: "#600200",
        legendFontSize: 12
      },
      {
        name: "Recoveries",
        population: this.state.worldRecovered,
        legend: '64%',
        color: "#509F5A",
        legendFontColor: "#02420A",
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
            {/* <CasesPieChartView props={data}/> */}
          </ScrollView>
          <ViewWithBanner/> 
        </LinearGradient>
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

/* Features
- todayCases, todayDeaths
- collapsible sections
    most affected countries by total deaths, new deaths, total cases, new cases
*/