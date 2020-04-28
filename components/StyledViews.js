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
import Moment from 'moment';

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

        <Card containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 25}}>
            <BasicSummaryRow props={{header: 'Tests', value: format(data.tests ?? 0)}}/>
            <BasicSummaryRow props={{header: 'Cases', value: format(data.cases ?? 0), subValue: data.todayCases}}/>
            <BasicSummaryRow props={{header: 'Recovered', value: format(data.recovered ?? 0)}}/>
            <BasicSummaryRow props={{header: 'Deaths', value: format(data.deaths ?? 0), subValue: data.todayDeaths}}/>
            <Text style={styles.lastUpdateFooterText}>Last update: {Moment(data.lastUpdate).format('D MMM HH:mm')}</Text>
        </Card>
    </View>
  );}
}

function BasicSummaryRow(props) {
    const data = props.props;
    const subValue = data.subValue ?? 0;
    return (
      <View>
          <Text style={styles.getStartedText}>{data.header}</Text>
          <View style={[styles.metricHighlightContainer, styles.homeScreenFilename, {alignItems: 'center'}]}>
              <MonoText style={{fontSize: 32, color: data.valueColor ?? 'black'}}>{data.value}</MonoText>
              {data.subValue > 0 && <Text style={[styles.lastUpdateFooterText, {marginBottom: 5}]}>+{format(subValue)} today</Text> }
          </View>
      </View>
    );
}

let defaultChartConfig = {
    backgroundColor: 'rgba(253, 155, 152, 0.6)',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
    borderRadius: 8
    }
}

export function LoadingSummaryRow(props) {
    return (
        <View style={{marginTop:35, alignItems: 'center', justifyContent: 'center'}}>
            <SkypeIndicator style={{marginBottom: 30}} color={Colors.primary} />
            <Text style={{color: '#AE3A37', fontSize: 17}}>Loading data...</Text>
        </View>
    );
  }

  export function ActiveCasesPieChart(props) {  
    const data = props.props ?? [];
    let chartConfig = data.chartConfig ?? defaultChartConfig
    return (
        <Card containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 25}}>
            <Text style={styles.countryNameHeaderText}>Confirmed Case Breakdown</Text>
            <PieChart
                style={{marginTop: 0}}
                data={data}
                // backgroundColor={'rgba(253, 155, 152, 0.6)'}
                width={Dimensions.get('window').width * .6}
                height={100}
                chartConfig={chartConfig}
                accessor="population"
                paddingLeft="0"
                hasLegend={true}
                absolute
            />
            <Text style={styles.lastUpdateFooterText}>Total confirmed cases: {format(27162)}</Text>
        </Card>
    );
  }

  export function TestsPieChart(props) {  
    const data = props.props ?? [];
    let chartConfig = data.chartConfig ?? defaultChartConfig
    return (
        <Card containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 25}}>
            <Text style={styles.countryNameHeaderText}>Tests Breakdown</Text>
            <PieChart
                style={{marginTop: 0}}
                data={data}
                // backgroundColor={'rgba(253, 155, 152, 0.6)'}
                width={Dimensions.get('window').width * .6}
                height={100}
                chartConfig={chartConfig}
                accessor="population"
                paddingLeft="0"
                hasLegend={true}
                absolute
            />
            <Text style={styles.lastUpdateFooterText}>Total tests taken: {format(637223)}</Text>
        </Card>
    );
  }

  // More on this: https://github.com/indiespirit/react-native-chart-kit
  // TODO: convert legend number to percentage
  export function CasesPieChart(props) {  
    const data = props.props.props ?? [];
    let chartConfig = data.chartConfig ?? defaultChartConfig

    return (
        <LinearGradient colors={['#FFDDDC']} style={[styles.gradientView, {marginTop: 30, padding: 0}]}>
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
