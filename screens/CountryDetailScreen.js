//
// Author: Manenga Mungandi
// CountryDetailScreen.js
// Rona
//
// Potential nice to have features:
// lockdown status
// news / tweets
//
import * as React from 'react';
import { Text, Switch, TouchableOpacity, View, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles';
import Color from '../constants/Colors';
import { AcknowledgmentsView, BasicPieChart, BasicSummaryView, LoadingSummaryRow } from '../components/StyledViews';
import * as FacebookAds from 'expo-ads-facebook';
import { ButtonGroup } from 'react-native-elements';
import Papa from 'papaparse';
import SegmentControl from 'react-native-segment-control';
// import { AppBar, Tab, Tabs, TabPanel } from '@material-ui/core';

const initialState = {
  dataSourceZA: '',
  dataSourceZM: '',
  ZAProvincialData: '',
  selectedIndex: 0,
  isZA: true,
  summaryLoaded: false,
}

var Country = { 
  ZA: {name: "South Africa", query: "South%20Africa", flag: 'https://corona.lmao.ninja/assets/img/flags/za.png'},
  ZM: {name: "Zambia", query: "Zambia", flag: 'https://corona.lmao.ninja/assets/img/flags/zm.png'}, 
};

class CountryDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.reloadData = this.reloadData.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
  }

  componentDidMount(){ 
    this.reloadData()

    let results;
    Papa.parse('https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_provincial_cumulative_timeline_confirmed.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(data) {
        results = data.data ?? 'none'
        errors = data.errors ?? 'none'
        meta = data.meta ?? 'none'
        
        // console.log('/n/nPapaparse data ' + JSON.stringify(data) + '/n/n')
      }
    });

    setTimeout(()=> {
      // console.log(results[0]);
      // console.log(results[results.length - 1]);
      this.setState({ZAProvincialData: results});
    }, 1500);
  }

  reloadData() {
    fetch('https://corona.lmao.ninja/v2/countries/South%20Africa')
    .then((response) => {
      // console.log('response: ' + response)
      return response.json()
    })
    .then((json) => {
      // Save state
      this.setState({dataSourceZA: json})
    })
    .catch((error) => console.error(error))
    .finally(() => {
      // console.log('finally finished')
      this.setState({summaryLoaded: true})
    })

    fetch('https://corona.lmao.ninja/v2/countries/Zambia')
    .then((response) => {
      // console.log('response: ' + response)
      return response.json()
    })
    .then((json) => {
      // Save state
      this.setState({dataSourceZM: json})
    })
    .catch((error) => console.error(error))
    .finally(() => {
      // console.log('finally finished')
      this.setState({summaryLoaded: true})
    })
  }

  updateIndex(selectedIndex) {
    if (this.state.selectedIndex != selectedIndex) {
      this.setState({selectedIndex: selectedIndex});
      this.setState({isZA: selectedIndex == 0});
    }
  }

  render() {
    let item = this.state.selectedIndex == 0 ? this.state.dataSourceZA : this.state.dataSourceZM;

      // Mark: Chart Data

      const activeInactiveCaseData = [
        {
          name: "Active",
          population: item.active,
          color: Color.primary,
          legendFontColor: Color.primary,
          legendFontSize: legendFontSize
        },
        {
          name: "Inactive",
          population: item.cases - item.active,
          color: 'rgba(253, 155, 152, 0.6)',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
      ];

      const mildSeriousCaseData = [
        {
          name: "Critical",
          population: item.critical,
          color: Color.primary,
          legendFontColor: Color.primary,
          legendFontSize: legendFontSize
        },
        {
          name: "Mild",
          population: item.active - item.critical,
          color: 'rgba(253, 155, 152, 0.6)',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
      ];

      const recoveryDeathsDiagnosedCaseData = [
        {
          name: "Recovered",
          population: item.recovered,
          color: 'green',
          legendFontColor: 'green',
          legendFontSize: legendFontSize
        },
        {
          name: "Deaths",
          population: item.deaths,
          color: Color.primary,
          legendFontColor: Color.primary,
          legendFontSize: legendFontSize
        },
        {
          name: "",
          population: item.cases - (item.deaths + item.recovered),
          color: Color.lightGrey,
          legendFontColor: Color.darkGrey,
          legendFontSize: legendFontSize
        },
      ];

      const testsData = [
        {
          name: "Cases",
          population: item.cases,
          color: Color.primary,
          legendFontColor: Color.primary,
          legendFontSize: legendFontSize
        },
        {
          name: "Unknown",
          population: item.tests - item.cases,
          color: Color.lightGrey,
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
      ];

      var provincialData = []
      const array = this.state.ZAProvincialData ?? [];
      const today = array[array.length - 1];
      
      if (today != null && this.state.isZA) {
        // console.log(today);
        // console.log(today["EC"]);

        provincialData = [
          {
            name: "EC",
            population: parseInt(today['EC'] ?? 0),
            color: 'pink',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "FS",
            population: parseInt(today['FS'] ?? 0),
            color: 'grey',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "GP",
            population: parseInt(today['GP'] ?? 0),
            color: 'cyan',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "KZN",
            population: parseInt(today['KZN'] ?? 0),
            color: 'orange',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "LP",
            population: parseInt(today['LP'] ?? 0),
            color: 'red',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "MP",
            population: parseInt(today['MP'] ?? 0),
            color: 'yellow',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "NW",
            population: parseInt(today['NW'] ?? 0),
            color: 'pink',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "NC",
            population: parseInt(today['NC'] ?? 0),
            color: 'blue',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "WC",
            population: parseInt(today['WC'] ?? 0),
            color: 'purple',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "UNKNOWN",
            population: parseInt(today['UNKNOWN'] ?? 0),
            color: 'black',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
        ];
        provincialData.sort((a,b) => a.population < b.population);
        provincialData = provincialData.filter(a => a.population > 0);
      }

      // Percentages vs Africa vs World
      const legendFontSize = 11;
      var todayCases = item.todayCases ?? 0;
      var todayDeaths = item.todayDeaths ?? 0;
      var flag = this.state.selectedIndex == 0 ? Country.ZA.flag : Country.ZM.flag;

      const props = {
        headerImage: flag, 
        tests: item.tests,
        cases: item.cases,
        todayCases: todayCases, 
        deaths: item.deaths, 
        todayDeaths: todayDeaths,
        recovered: item.recovered,
        screenName: 'LOCAL SUMMARY',
        active: item.active,
        critical: item.critical,
      };

    const Empty = () => {
      return <Text style={{height: 0, width: 0}}></Text>;
    };
    const segments = [
      {
        index: 0,
        title: 'South Africa',
        view: Empty
      },
      {
        index: 1,
        title: 'Zambia',
        view: Empty
      }
    ];

    if (this.state.summaryLoaded) {
      return (
        <View style={[styles.container, {backgroundColor: '#FFF1F1'}]}>
          <SegmentControl segments={segments } color={'#024b30'} onIndexChange={this.updateIndex}/>
          <ScrollView style={{backgroundColor: '#FFF1F1'}} contentContainerStyle={[{alignItems: 'center'}]}>
            <BasicSummaryView props={props}/>
            <BasicPieChart props={{data: testsData, cardTitle: 'TESTS BREAKDOWN', footerText: 'Total tests taken', footerValue: item.tests}}/>
            <BasicPieChart props={{data: recoveryDeathsDiagnosedCaseData, cardTitle: 'OUTCOME BREAKDOWN', footerText: 'Total cases', footerValue: item.cases}}/>
            {this.state.isZA && 
                <BasicPieChart props={{data: provincialData, cardTitle: 'PROVINCIAL BREAKDOWN',  height: 175, isAbsolute: true}}/>
            }
            <AcknowledgmentsView/>
            {/* <TouchableOpacity
                onPress={this.handleClick('https://github.com/manenga')}> */}
                <Text style={{color: 'black', fontSize: 14, fontWeight: '300', marginVertical: 14}}>Made with 🖤 by Manenga </Text>
            {/* </TouchableOpacity> */}
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