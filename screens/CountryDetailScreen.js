//
// Author: Manenga Mungandi
// CountryDetailScreen.js
// Rona
//

import * as React from 'react';
import { Text, Switch, TouchableOpacity, View, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles';
import Color from '../constants/Colors';
import { AcknowledgmentsView, BasicPieChart, BasicSummaryView, LoadingSummaryRow } from '../components/StyledViews';
import * as FacebookAds from 'expo-ads-facebook';
import Papa from 'papaparse';
import TabbedControl from 'react-native-tabbed-control';

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

export default class CountryDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.reloadData = this.reloadData.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount(){ 
    this.reloadData()
  }

  reloadData() {
    fetch('https://corona.lmao.ninja/v2/countries/South%20Africa')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      // Save state
      this.setState({dataSourceZA: json})
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({summaryLoaded: true})
    })

    fetch('https://corona.lmao.ninja/v2/countries/Zambia')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      // Save state
      this.setState({dataSourceZM: json})
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({summaryLoaded: true})
    })

    let results;
    Papa.parse('https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_provincial_cumulative_timeline_confirmed.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(data) {
        results = data.data ?? 'none'
      }
    });

    setTimeout(()=> {
      this.setState({ZAProvincialData: results});
    }, 1500);
  }

  updateIndex(selectedIndex) {
    if (this.state.selectedIndex != selectedIndex) {
      this.setState({selectedIndex: selectedIndex});
      this.setState({isZA: selectedIndex == 0});
    }
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
    let item = this.state.selectedIndex == 0 ? this.state.dataSourceZA : this.state.dataSourceZM;

      // Mark: Chart Data

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

      var provincialData = [];
      const array = this.state.ZAProvincialData ?? [];
      const today = array[array.length - 1];
      
      if (today != null && this.state.isZA) {

        provincialData = [
          {
            name: "EC",
            population: parseInt(today['EC'] ?? '0'),
            color: 'orange',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "FS",
            population: parseInt(today['FS'] ?? '0'),
            color: 'grey',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "GP",
            population: parseInt(today['GP'] ?? '0'),
            color: '#c41e3a',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "KZN",
            population: parseInt(today['KZN'] ?? '0'),
            color: Color.blue,
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "LP",
            population: parseInt(today['LP'] ?? '0'),
            color: 'green',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "MP",
            population: parseInt(today['MP'] ?? '0'),
            color: '#ffa6c9',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "NW",
            population: parseInt(today['NW'] ?? '0'),
            color: 'purple',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "NC",
            population: parseInt(today['NC'] ?? '0'),
            color: 'brown',
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "WC",
            population: parseInt(today['WC'] ?? '0'),
            color: Color.navy,
            legendFontColor: 'black',
            legendFontSize: legendFontSize
          },
          {
            name: "UNKNOWN",
            population: parseInt(today['UNKNOWN'] ?? '0'),
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

    const tabs = [
      {
        title: 'South Africa',
      },
      {
        title: 'Zambia',
      }
    ];

    if (this.state.summaryLoaded) {
      return (
        <View style={[styles.container, {backgroundColor: '#FFF1F1'}]}>
          <TabbedControl tabs={tabs} color={'#024b30'} onIndexChange={this.updateIndex}/>
          <ScrollView style={{backgroundColor: '#FFF1F1'}} contentContainerStyle={[{alignItems: 'center'}]}>
            <BasicSummaryView props={props}/>
            <BasicPieChart props={{data: testsData, cardTitle: 'TESTS BREAKDOWN', footerText: 'Total tests taken', footerValue: item.tests}}/>
            <BasicPieChart props={{data: recoveryDeathsDiagnosedCaseData, cardTitle: 'OUTCOME BREAKDOWN', footerText: 'Total cases', footerValue: item.cases}}/>
            {this.state.isZA && provincialData.length > 1 &&
                <BasicPieChart props={{data: provincialData, cardTitle: 'PROVINCIAL BREAKDOWN',  height: 175, isAbsolute: true}}/>
            }
            <AcknowledgmentsView/>
            <TouchableOpacity
                onPress={this.LoveClick}>
                <Text style={{color: 'black', fontSize: 14, fontWeight: '300', marginTop: 14, marginBottom: 8}}>Made with 🖤 by Manenga </Text>
            </TouchableOpacity>
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
            onPress={() => {}}
            onError={error => console.log('error', error)}
        />
        </View>
    );
}

// TODO: lockdown status
// TODO: news / tweets