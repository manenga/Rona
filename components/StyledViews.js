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
import { LinearGradient } from 'expo-linear-gradient';

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

        <LinearGradient colors={['#B03633', '#D35D5A', '#B03633']} style={[styles.gradientView, {width: "80%", aspectRatio: 1}]}>
            <BasicSummaryRow props={{header: 'Coronavirus Cases:', value: format(data.cases ?? 0)}}/>
            <BasicSummaryRow props={{header: 'Deaths:', value: format(data.deaths ?? 0), valueColor: 'red'}}/>
            <BasicSummaryRow props={{header: 'Recovered:', value: format(data.recovered ?? 0), valueColor: 'green'}}/>
        </LinearGradient>
    </View>
  );}
}

function BasicSummaryRow(props) {
    const data = props.props;
    return (
      <View>
          <Text style={styles.getStartedText}>{data.header}</Text>
          <View style={[styles.metricHighlightContainer, styles.homeScreenFilename, {alignItems: 'center'}]}>
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
  // TODO: convert legend number to percentage
  export function CasesPieChart(props) {  
    let defaultChartConfig = {
        backgroundColor: 'rgba(253, 155, 152, 0.6)',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
        borderRadius: 8
        }
    }
    const data = props.props.props ?? [];
    let chartConfig = data.chartConfig ?? defaultChartConfig

    return (
        <LinearGradient colors={['#B03633', '#D35D5A', '#B03633']} style={[styles.gradientView, {marginTop: 30, width: '80%', padding: 0}]}>
        <PieChart
            style={{marginTop: 0}}
            data={data}
            backgroundColor={'rgba(253, 155, 152, 0.6)'}
            width={Dimensions.get('window').width * .8}
            height={150}
            chartConfig={chartConfig}
            accessor="population"
            // backgroundColor="transparent"
            paddingLeft="0"
            hasLegend={true}
            absolute
        />
        </LinearGradient>
    );
  }

  
// https://github.com/thegamenicorus/react-native-timeline-listview
export function TimelineView(props) {  
  
}
