//
// Author: Manenga Mungandi
// StyledViews.js
// Rona
//

import * as React from 'react';
import { ActivityIndicator, Text, View, Image } from 'react-native';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';
import { format } from '../constants/Extensions';
import { MonoText } from '../components/StyledText';
import { Card } from 'react-native-elements'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
    
export class BasicSummaryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
      }

    render() {
        const data = this.props.props ?? [];
        const headerText = data.headerText ?? "";
        const headerImage = data.headerImage ?? "";
        const hasHeaderText = headerText.trim() != "";

    return (
    <View style={styles.getStartedContainer}>
        { hasHeaderText ? <Image source={{uri: headerImage}} style={styles.basicSummaryViewHeaderImage}/> : null }
        { hasHeaderText ? <Text style={styles.countryNameHeaderText}>{headerText}</Text> : null }

        <Card containerStyle={{backgroundColor: '#FFC7C6', width: "80%", aspectRatio: 1, justifyContent: 'center'}}>
            <BasicSummaryRow props={{header: 'Coronavirus Cases:', value: format(data.cases ?? 0)}}/>
            <BasicSummaryRow props={{header: 'Deaths:', value: format(data.deaths ?? 0), valueColor: 'red'}}/>
            <BasicSummaryRow props={{header: 'Recovered:', value: format(data.recovered ?? 0), valueColor: 'green'}}/>
        </Card>
    </View>
  );}
}

function BasicSummaryRow(props) {
    const data = props.props;
    return (
      <View>
          <Text style={styles.getStartedText}>{data.header}</Text>
          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename, {alignItems: 'center'}]}>
              <MonoText style={{fontSize: 32, color: data.valueColor ?? 'black'}}>{data.value}</MonoText>
          </View>
      </View>
    );
}

export function LoadingSummaryRow(props) {
    return (
        <View style={{marginTop:35, alignItems: 'center', justifyContent: 'center'}}>
            <SkypeIndicator style={{marginBottom: 30}} color={Colors.primary} />
            <Text style={{color: '#AE3A37', fontSize: 17}}>Loading data...</Text>
        </View>
    );
  }