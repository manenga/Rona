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
import { Text, Switch, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles';
import Color from '../constants/Colors';
import { BasicPieChart, BasicSummaryView, LoadingSummaryRow } from '../components/StyledViews';
import * as FacebookAds from 'expo-ads-facebook';
import { ButtonGroup } from 'react-native-elements';

const initialState = {
  dataSource: '',
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
  }

  reloadData() {
    // console.log('loading data for ' + this.state.isZA ? "ZA" : "ZM")
    const country = this.state.isZA ? Country.ZA.query : Country.ZM.query;
    fetch('https://corona.lmao.ninja/v2/countries/' + country)
    .then((response) => {
      // console.log('response: ' + response)
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

  updateIndex (selectedIndex) {
    // this.setState({summaryLoaded: false})
    const country = selectedIndex == 0 ? Country.ZA.query : Country.ZM.query;

    fetch('https://corona.lmao.ninja/v2/countries/' + country)
    .then((response) => {
      // console.log('response: ' + response)
      return response.json()
    })
    .then((json) => {
      // Save state
      this.setState({dataSource: json})
      this.setState({isZA: selectedIndex == 0 ? true : false});
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({summaryLoaded: true})
    })
  }

  render() {
    let item = this.state.dataSource;
    
    // Percentages vs Africa vs World
    const legendFontSize = 11;
    var todayCases = item.todayCases ?? 0;
    var todayDeaths = item.todayDeaths ?? 0;
    var flag = this.state.isZA ? Country.ZA.flag : Country.ZM.flag;

    const props = {
      headerText: this.state.isZA ? Country.ZA.name : Country.ZM.name, 
      headerImage: flag, 
      tests: item.tests,
      cases: item.cases,
      todayCases: todayCases, 
      deaths: item.deaths, 
      todayDeaths: todayDeaths,
      recovered: item.recovered
    };

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

    const recoveryDiagnosedCaseData = [
      {
        name: "Recovered",
        population: item.recovered,
        color: 'green',
        legendFontColor: 'green',
        legendFontSize: legendFontSize
      },
      {
        name: "",
        population: item.cases - item.recovered,
        color: Color.lightGrey,
        legendFontColor: Color.darkGrey,
        legendFontSize: legendFontSize
      },
    ];

    const deathsDiagnosedCaseData = [
      {
        name: "Deaths",
        population: item.deaths,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: legendFontSize
      },
      {
        name: "",
        population: item.cases - item.deaths,
        color: Color.lightGrey,
        legendFontColor: Color.darkGrey,
        legendFontSize: legendFontSize
      },
    ];

    // TODO - use percentages instead
    const testsData = [
      {
        name: "Cases",
        population: item.cases,
        color: Color.primary,
        legendFontColor: Color.primary,
        legendFontSize: legendFontSize
      },
      {
        name: "",
        population: item.tests - item.cases,
        color: Color.lightGrey,
        legendFontColor: 'black',
        legendFontSize: legendFontSize
      },
    ];

    if (this.state.summaryLoaded) {
      return (
        <View style={[styles.container, {backgroundColor: '#FFF1F1'}]}>
            <ScrollView style={[styles.container, {height: '100%'}]} contentContainerStyle={styles.contentContainer}>
                <ButtonGroup
                    selectedIndex={this.state.isZA ? 0 : 1}
                    onPress={this.updateIndex}
                    buttons={['South Africa', 'Zambia']}
                    containerStyle={{height: 35, marginBottom: 25}}
                />
                <BasicSummaryView props={props}/>
                <BasicPieChart props={{data: testsData, headerText: 'Tests Breakdown', footerText: 'Total tests taken', footerValue: item.tests}}/>
                <BasicPieChart props={{data: recoveryDiagnosedCaseData, headerText: 'Recovery Rate', footerText: 'Total cases', footerValue: item.cases}}/>
                <BasicPieChart props={{data: deathsDiagnosedCaseData, headerText: 'Fatality Rate', footerText: 'Total cases', footerValue: item.cases}}/>
                <BasicPieChart props={{data: activeInactiveCaseData, headerText: 'Cases Breakdown', footerText: 'Total cases', footerValue: item.cases}}/>
                {/* <BasicPieChart props={{data: mildSeriousCaseData, headerText: 'Mild / Critical Cases', footerText: 'Total active cases', footerValue: item.active}}/> */}
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