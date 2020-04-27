//
// Author: Manenga Mungandi
// CountryDetailScreen.js
// Rona
//

import * as React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles';
import { MonoText } from '../components/StyledText'
import { format } from '../constants/Extensions'
import * as FacebookAds from 'expo-ads-facebook';

class CountryDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: ''
      };
  }

  componentDidMount(){ 
    fetch('https://corona.lmao.ninja/v2/countries/South%20Africa')
    .then((response) => {
    //   console.log('=============================')
    //   console.log('response: ' + response)
      return response.json()
    })
    .then((json) => {
      // Save state
      this.setState({dataSource: json})
    })
    .catch((error) => console.error(error))
    .finally(() => {
      // console.log('finally finished')
    })
  }

  render() {
    let item = this.state.dataSource;
    // console.log('Rendering country: ' + item.country)

    var todayCases = item.todayCases ?? 0;
    var todayDeaths = item.todayDeaths ?? 0;
    var flag = 'https://corona.lmao.ninja/assets/img/flags/za.png';

    return (
        <View style={styles.container}>
            <ScrollView style={[styles.container, {height: '100%'}]} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Image source={{uri: flag}} style={{width: 70, height: 40, resizeMode: 'contain'}}/>  
                    <Text style={[styles.getStartedText, {marginTop: 12, marginBottom: 32, fontWeight: 'bold', fontSize: 18}]}>South Africa</Text>

                    <Text style={styles.getStartedText}>Coronavirus Cases:</Text>
                    <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                        <MonoText style={{fontSize: 32}}>{format(item.cases ?? 0)}</MonoText>
                        {/* <MonoText style={{fontSize: 32}}>{format(item.cases ?? 0) + todayCases > 0 ? '(+' + todayCases + 'change)' : ''}</MonoText> */}
                    </View>

                    {/* <Text style={styles.getStartedText}>Tests:</Text>
                    <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                        <MonoText style={{fontSize: 32}}>{format(item.tests ?? 0)}</MonoText>
                    </View> */}

                    <Text style={styles.getStartedText}>Deaths:</Text>
                    <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                        <MonoText style={{fontSize: 32, color: 'red'}}>{format(item.deaths ?? 0)}</MonoText>
                        {/* <MonoText style={{fontSize: 32, color: 'red'}}>{format(item.deaths ?? 0)  + '(+2 change)'}</MonoText> */}
                    </View>

                    <Text style={styles.getStartedText}>Recovered:</Text>
                    <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                        <MonoText style={{fontSize: 32, color: 'green'}}>{format(item.recovered ?? 0)}</MonoText>
                    </View>
                </View>
            </ScrollView>
            <AdViewWithBanner/> 
        </View>
    )}; 
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

/* Features
- todayCases, todayDeaths
- active cases
- lockdown status
- news
- tweets
*/