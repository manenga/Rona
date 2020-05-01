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
import Papa from 'papaparse';
import SegmentControl from 'react-native-segment-control';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const initialState = {
  dataSource: '',
  ZAProvincialData: '',
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
      console.log(results[0]);
      // console.log(results[results.length - 1]);
      this.setState({ZAProvincialData: results});
    }, 1500);
  }

  reloadData() {
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
    console.log('Index updated!');
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
    
    if (today != null) {
      console.log(today);
      console.log(today["EC"]);

      provincialData = [
        {
          name: "EC",
          population: parseInt(today['EC']) ?? 0,
          color: 'pink',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "FS",
          population: parseInt(today['FS']) ?? 0,
          color: 'grey',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "GP",
          population: parseInt(today['GP']) ?? 0,
          color: 'cyan',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "KZN",
          population: parseInt(today['KZN']) ?? 0,
          color: 'orange',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "LP",
          population: parseInt(today['LP']) ?? 0,
          color: 'red',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "MP",
          population: parseInt(today['MP']) ?? 0,
          color: 'yellow',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "NW",
          population: parseInt(today['NW']) ?? 0,
          color: 'pink',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "NC",
          population: parseInt(today['NC']) ?? 0,
          color: 'blue',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "WC",
          population: parseInt(today['WC']) ?? 0,
          color: 'purple',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
        {
          name: "UNKNOWN",
          population: parseInt(today['UNKNOWN']) ?? 0,
          color: 'black',
          legendFontColor: 'black',
          legendFontSize: legendFontSize
        },
      ];
      provincialData.sort((a,b) => a.population < b.population);
      provincialData = provincialData.filter(a => a.population > 0);
    }

    const view = (selectedIndex) => {
      console.log('selectedIndex ' + selectedIndex)
      const isZaTab = selectedIndex == 0 ? true : false;
      if (this.state.isZA != isZaTab) {
        // this.setState({isZA: isZaTab});
      }
      
      return (
        <ScrollView style={{backgroundColor: '#FFF1F1'}}>
          <BasicSummaryView props={props}/>
          <BasicPieChart props={{data: testsData, cardTitle: 'TESTS BREAKDOWN', footerText: 'Total tests taken', footerValue: item.tests}}/>
          <BasicPieChart props={{data: recoveryDeathsDiagnosedCaseData, cardTitle: 'OUTCOME BREAKDOWN', footerText: 'Total cases', footerValue: item.cases}}/>
          {this.state.isZA && 
              <BasicPieChart props={{data: provincialData, cardTitle: 'PROVINCIAL BREAKDOWN',  height: 175, isAbsolute: true}}/>
          }
        </ScrollView>
      );
    };
    
    const segments = [
      {
        title: 'South Africa',
        view: view
      },
      {
        title: 'Zambia',
        view: view
      }
    ];

    if (this.state.summaryLoaded) {
      return (
        <View style={[styles.container, {backgroundColor: '#FFF1F1'}]}>
          <SegmentControl segments={segments } color={Colors.primary} onRenderSegment={this.updateIndex}/>
            {/* <ScrollView style={[styles.container, {height: '100%'}]}> */}
                {/* <ButtonGroup
                    selectedIndex={this.state.isZA ? 0 : 1}
                    onPress={this.updateIndex}
                    buttons={['South Africa', 'Zambia']}
                    containerStyle={{height: 35, marginBottom: 25}}
                /> */}
                {/* <BasicPieChart props={{data: recoveryDiagnosedCaseData, cardTitle: 'Recovery Rate', footerText: 'Total cases', footerValue: item.cases}}/> */}
                {/* <BasicPieChart props={{data: deathsDiagnosedCaseData, cardTitle: 'Fatality Rate', footerText: 'Total cases', footerValue: item.cases}}/> */}
                {/* <BasicPieChart props={{data: activeInactiveCaseData, cardTitle: 'Cases Breakdown', footerText: 'Total cases', footerValue: item.cases}}/> */}
                {/* <BasicPieChart props={{data: mildSeriousCaseData, cardTitle: 'Mild / Critical Cases', footerText: 'Total active cases', footerValue: item.active}}/> */}
            {/* </ScrollView> */}
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