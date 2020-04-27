//
// Author: Manenga Mungandi
// StyledViews.js
// Rona
//

import * as React from 'react';
import { ActivityIndicator, Text, View, Image, Dimensions } from 'react-native';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';
import { format } from '../constants/Extensions';
import { MonoText } from '../components/StyledText';
import { Card } from 'react-native-elements'
import { DotIndicator, PulseIndicator, SkypeIndicator } from 'react-native-indicators';
import { LineChart, BarChart, PieChart, ProgressChart, StackedBarChart } from "react-native-chart-kit";
 
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

        <Card 
            containerStyle={{backgroundColor: '#FFC7C6', width: "80%", aspectRatio: 1, justifyContent: 'center'}}>
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

  // More on this: https://github.com/indiespirit/react-native-chart-kit
  export function CasesPieChart(props) {  
    let defaultChartConfig = {
        backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
        borderRadius: 8
        }
    }
    // console.log(props)
    const data = props.props.props ?? [];
    let chartConfig = data.chartConfig ?? defaultChartConfig
    // console.log(props.props.props)

    return (
        // <Card containerStyle={{backgroundColor: '#5B0200', width: "80%", aspectRatio: 1, alignItems: 'center', justifyContent: 'center'}}>
            <PieChart
                style={{marginTop: 20}}
                data={data}
                width={Dimensions.get('window').width * .8}
                height={150}
                chartConfig={chartConfig}
                accessor="population"
                // backgroundColor="transparent"
                paddingLeft="0"
                hasLegend={true}
                absolute
                />
        // </Card>
    );
  }

  
// https://github.com/thegamenicorus/react-native-timeline-listview
export function TimelineView(props) {  
  
}
