//
// Author: Manenga Mungandi
// StyledViews.js
// Rona
//

import * as React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';
import { format } from '../constants/Extensions';
import { MonoText } from '../components/StyledText';
import { Card } from 'react-native-elements'
import { DotIndicator, PulseIndicator, SkypeIndicator } from 'react-native-indicators';
import { LineChart, BarChart, PieChart, ProgressChart, StackedBarChart } from "react-native-chart-kit";
import { LinearGradient } from 'expo-linear-gradient';
import Moment from 'moment';
import { FontAwesome5 } from "@expo/vector-icons";

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

        <CardV2 props={data}/>
    </View>
  );}
}

function BasicSummaryRow(props) {
    const data = props.props;
    const subValue = data.subValue ?? 0;
    const icon = 'vials';

    return (
      <View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            {/* hidden for now <FontAwesome5 name={icon} size={17} color={Colors.darkGrey}/> */}
            <Text style={[styles.getStartedText, {marginLeft: 12}]}>{data.header}</Text>
          </View>
          <View style={[styles.metricHighlightContainer, styles.homeScreenFilename, {alignItems: 'center'}]}>
              <MonoText style={{fontSize: 32, color: data.valueColor ?? 'black'}}>{data.value}</MonoText>
              {data.subValue > 0 && <Text style={[styles.lastUpdateFooterText, {marginBottom: 5}]}>+{format(subValue)} today</Text> }
          </View>
      </View>
    );
}

// Card Versions

function CardV1(props) {
    const data = props.props ?? [];
    return(
        <Card containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 25}}>
            <BasicSummaryRow props={{header: 'Tests', value: format(data.tests ?? 0)}}/>
            <BasicSummaryRow props={{header: 'Cases', value: format(data.cases ?? 0), subValue: data.todayCases}}/>
            <BasicSummaryRow props={{header: 'Recovered', value: format(data.recovered ?? 0)}}/>
            <BasicSummaryRow props={{header: 'Deaths', value: format(data.deaths ?? 0), subValue: data.todayDeaths}}/>
            <Text style={styles.lastUpdateFooterText}>Last update: {Moment(data.lastUpdate).format('D MMM HH:mm')}</Text>
        </Card>
    );
}

function CardV2(props) {
    const data = props.props ?? [];
    return(
        <Card containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 25}}>
            <View style={{flexDirection: 'row'}}>
                <SquareSummaryRow props={{header: 'Tests', value: format(data.tests ?? 0), icon: 'vials', iconColor: 'blue'}}/>
                <SquareSummaryRow props={{header: 'Cases', value: format(data.cases ?? 0), subValue: data.todayCases, icon: 'vials', iconColor: 'orange'}}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <SquareSummaryRow props={{header: 'Recovered', value: format(data.recovered ?? 0), icon: 'vials', iconColor: 'green'}}/>
                <SquareSummaryRow props={{header: 'Deaths', value: format(data.deaths ?? 0), subValue: data.todayDeaths, icon: 'vials', iconColor: 'red'}}/>
            </View>
            <Text style={[styles.lastUpdateFooterText, {marginBottom: 0}]}>Last update: {Moment(data.lastUpdate).format('D MMM HH:mm')}</Text>
        </Card>
    );
}

// Rows

function SquareSummaryRow(props) {
    const data = props.props;
    const subValue = data.subValue ?? 0;
    const icon = data.icon;
    const iconColor = data.iconColor ?? Colors.black;

    return (
        <View style={{aspectRatio: 1, justifyContent: 'space-between', alignItems: 'center',  backgroundColor: 'rgba(253, 155, 152, 0.20)', margin: 4, padding: 12, borderRadius: 5, height: 120}}>
            <FontAwesome5 name={icon} size={16} color={iconColor}/>
            <View style={{justifyContent: 'space-around'}}>
                <Text style={{fontSize: 15, color: data.valueColor ?? iconColor ?? 'black'}}>{data.value}</Text>
                {subValue > 0
                    ? <Text style={[styles.lastUpdateFooterText, {marginTop: 5, marginBottom: 0, fontSize: 7}]}>+{format(subValue)} today</Text>
                    : <Text style={[styles.lastUpdateFooterText, {marginTop: 5, marginBottom: 0, fontSize: 7}]}></Text>
                }
            </View>
            <Text style={[styles.getStartedText, {marginLeft: 12, fontSize: 8, color: 'black', lineHeight: 12,}]}>{data.header}</Text>
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

  export function BasicPieChart(props) {  
    const data = props.props.data ?? [];
    const headerText = props.props.headerText ?? '';
    const footerText = props.props.footerText ?? '';
    const footerValue = props.props.footerValue ?? 0;
    const height = props.props.height ?? 100;
    const isAbsolute = props.props.isAbsolute ?? false;
    const backgroundColor = 'rgba(253, 155, 152, 0.6)';
    // console.log(props);
    let chartConfig = data.chartConfig ?? defaultChartConfig
    return (
        <Card containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 25}}>
            <Text style={styles.countryNameHeaderText}>{headerText}</Text>
            <PieChart
                style={{marginTop: 0}}
                data={data}
                width={Dimensions.get('window').width * .7}
                height={height}
                chartConfig={chartConfig}
                accessor="population"
                paddingLeft="0"
                absolute={isAbsolute}
                hasLegend={true}
            />
            <Text style={styles.lastUpdateFooterText}>{footerText} {format(footerValue)}</Text>
        </Card>
    );
  }

  
// https://github.com/thegamenicorus/react-native-timeline-listview
export function TimelineView(props) {  
  
}

// Nice to have charts
// Cases over time / Recoveries / Deaths
// New cases over time / Deaths