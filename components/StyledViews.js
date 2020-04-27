//
// Author: Manenga Mungandi
// StyledViews.js
// Rona
//

import * as React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../constants/Styles';
import { format } from '../constants/Extensions';
import { MonoText } from '../components/StyledText';
import { Card } from 'react-native-elements'

export function BasicSummaryView(props) {
    const data = props.props ?? [];
    const headerText = data.headerText ?? "";
    const headerImage = data.headerImage ?? "";
    const hasHeaderText = headerText.trim() != "";

    return (
    <View style={styles.getStartedContainer}>
        { hasHeaderText ? <Image source={{uri: headerImage}} style={styles.basicSummaryViewHeaderImage}/> : null }
        { hasHeaderText ? <Text style={styles.countryNameHeaderText}>{headerText}</Text> : null }

        <Card containerStyle={{backgroundColor: '#FFC7C6', width: "80%"}}>
            <BasicSummaryRow props={{header: 'Coronavirus Cases:', value: format(data.cases ?? 0)}}/>
            <BasicSummaryRow props={{header: 'Deaths:', value: format(data.deaths ?? 0), valueColor: 'red'}}/>
            <BasicSummaryRow props={{header: 'Recovered:', value: format(data.recovered ?? 0), valueColor: 'green'}}/>
        </Card>
    </View>
  );
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