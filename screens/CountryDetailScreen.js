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
                <BasicPieChart props={{data: testsData, headerText: 'Tests Breakdown', footerText: 'Total tests taken cases'}}/>
                <BasicPieChart props={{data: recoveryDiagnosedCaseData, headerText: 'Recovered / Diagnosed Cases', footerText: 'Total active cases'}}/>
                <BasicPieChart props={{data: deathsDiagnosedCaseData, headerText: 'Deaths / Diagnosed Cases', footerText: 'Total active cases'}}/>
                <BasicPieChart props={{data: activeInactiveCaseData, headerText: 'Active / Inactive Cases', footerText: 'Total confirmed cases'}}/>
                <BasicPieChart props={{data: mildSeriousCaseData, headerText: 'Mild / Serious Cases', footerText: 'Total active cases'}}/>
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

// Mark: Chart Data

const activeInactiveCaseData = [
  {
    name: "Active",
    population: 55,
    color: Color.primary,
    legendFontColor: Color.primary,
    legendFontSize: 12
  },
  {
    name: "Inactive",
    population: 200,
    color: 'rgba(253, 155, 152, 0.6)',
    legendFontColor: 'black',
    legendFontSize: 12
  },
];

const mildSeriousCaseData = [
  {
    name: "Serious",
    population: 25,
    color: Color.primary,
    legendFontColor: 'black',
    legendFontSize: 12
  },
  {
    name: "Mild",
    population: 175,
    color: 'rgba(253, 155, 152, 0.6)',
    legendFontColor: 'black',
    legendFontSize: 12
  },
];

const recoveryDiagnosedCaseData = [
  {
    name: "Diagnosed",
    population: 25,
    color: Color.primary,
    legendFontColor: Color.primary,
    legendFontSize: 12
  },
  {
    name: "Recovered",
    population: 175,
    color: 'rgba(253, 155, 152, 0.6)',
    legendFontColor: 'black',
    legendFontSize: 12
  },
];

const deathsDiagnosedCaseData = [
  {
    name: "Diagnosed",
    population: 180,
    color: Color.primary,
    legendFontColor: Color.primary,
    legendFontSize: 12
  },
  {
    name: "Deaths",
    population: 25,
    color: 'rgba(253, 155, 152, 0.6)',
    legendFontColor: 'black',
    legendFontSize: 12
  },
];

// TODO - use percentages instead
const testsData = [
  {
    name: "Confirmed",
    population: 5,
    color: Color.primary,
    legendFontColor: Color.primary,
    legendFontSize: 12
  },
  {
    name: "Unconfirmed",
    population: 95,
    color: 'rgba(253, 155, 152, 0.6)',
    legendFontColor: 'black',
    legendFontSize: 12
  },
];

export default CountryDetailScreen;