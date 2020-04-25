import * as React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Icon } from "react-native-elements";
import styles from '../constants/Styles';
// import { AlphabetListView } from 'react-native-alphabetlistview';
import { format } from '../constants/Extensions'
import Colors from '../constants/Colors';

class CountryViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: '',
      countries: [],
      worldDeaths: 0,
      worldConfirmed: 0,
      WorldRecovered: 0,
    };
  }

  componentDidMount(){
    fetch('https://corona.lmao.ninja/v2/countries?sort=country')
      .then((response) => {
        // console.log('=============================')
        // console.log('response: ' + response)
        return response.json()
      })
      .then((json) => {
        const keys = Object.keys(json.sort((a, b) => a.country > b.country));

        // Save state
        this.setState({dataSource: json})
        this.setState({countries: keys})
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // console.log('finally finished')
      })
  }

  render() {
    return (
      // https://github.com/i6mi6/react-native-alphabetlistview
      // <AlphabetListView
      //   data={this.state.countries}
      //   cell={this.countryRow}
      //   cellHeight={100}
      //   sectionHeaderHeight={22.5}
      // />
      <FlatList
          style={{marginHorizontal: 5, alignSelf: 'center',}}
          data={this.state.countries}
          renderItem={this.countryRow}
          keyExtractor={(index) => index }
      />
    )};

    countryRow = ({index}) => {
      let item = this.state.dataSource[index];
      let isLastOption = false;
      // console.log('Rendering country: ' + key)

      var deaths = item.deaths ?? 0;
      var country = item.country;
      var confirmed = item.cases ?? 0;
      var recovered = item.recovered ?? 0;
      var flag = item.countryInfo.flag ?? '';
      
      return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption]}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4}}>
          <Image source={{uri: flag}} style={{width: 25, height: 16, resizeMode: 'contain'}}/>  
          <View style={{width: '80%'}}>
            <Text style={{fontWeight: 'bold', letterSpacing: 1.2, fontSize: 16}}>{country}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.optionText}>{'Confirmed:'}</Text>
                <Text style={styles.optionText}>{format(confirmed)}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.optionText}>{'Recovered:'}</Text>
                <Text style={[styles.optionText, {color: 'green'}]}>{format(recovered)}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.optionText}>{'Deaths:'}</Text> 
                <Text style={[styles.optionText, {color: 'red'}]}>{format(deaths)}</Text>
              </View>
              {/* <Text style={styles.optionText}>{'Last update: 1'}</Text> */}
          </View>
          <Icon name='right' type='antdesign' size={10} iconStyle={{padding: 6}}/>
        </View>
      </RectButton>
      );
  };
  }

export default CountryViewScreen;