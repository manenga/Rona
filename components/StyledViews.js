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
import { Card, Divider } from 'react-native-elements'
import { DotIndicator, PulseIndicator, SkypeIndicator } from 'react-native-indicators';
import { LineChart, BarChart, PieChart, ProgressChart, StackedBarChart } from "react-native-chart-kit";
import { LinearGradient } from 'expo-linear-gradient';
import Moment from 'moment';
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableHighlight } from 'react-native-gesture-handler';

const cardWidth = Dimensions.get('window').width * .90;

export class BasicSummaryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
      }

    leanMore () {

    }

    render() {
        const data = this.props.props ?? [];
        const headerText = data.headerText ?? "";
        const headerImage = data.headerImage ?? "";
        const hasHeaderText = headerText.trim() != "";

    return (
    <View >
        { hasHeaderText ? <Image source={{uri: headerImage}} style={styles.basicSummaryViewHeaderImage}/> : null }
        { hasHeaderText ? <Text style={styles.countryNameHeaderText}>{headerText}</Text> : null }
        <CardV3 props={data}/>
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

function CardV3(props) {
    const data = props.props ?? [];
    const subValue = data.subValue ?? 0;
    const icon = data.icon;
    const iconColor = data.iconColor ?? Colors.black;
    const screenName = data.screenName ?? "";
    return(
        <Card title={screenName.toString()} containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 15, width: cardWidth}}>
            <View style={{justifyContent: 'space-between', alignItems: 'center',  backgroundColor: 'rgba(253, 155, 152, 0.20)', margin: 4, padding: 12, borderRadius: 5}}>
                <Text style={[styles.getStartedText, {fontSize: 12, color: Colors.darkGrey, lineHeight: 12}]}>CASES</Text>
                <View style={{justifyContent: 'space-around'}}>
                    <Text style={{fontSize: 24, color: data.valueColor ?? iconColor ?? 'black'}}>{format(data.cases ?? 0)}</Text>
                    {subValue > 0
                        ? <Text style={[styles.lastUpdateFooterText, {marginTop: 5, marginBottom: 0, fontSize: 7}]}>+{format(data.todayCases)} today</Text>
                        : <Text style={[styles.lastUpdateFooterText, {marginTop: 5, marginBottom: 0, fontSize: 7}]}></Text>
                    }
                </View>
                <View style={{backgroundColor: Colors.lightGrey, height: 0.75, width: '100%', marginBottom: 10}}/>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'TESTS', value: format(data.tests ?? 0), icon: 'vials', iconColor: 'blue'}}/>
                    <MiniSummaryRow props={{header: 'CASES TODAY', value: format(data.todayCases ?? 0), icon: 'vials', iconColor: 'blue'}}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'RECOVERED', value: format(data.recovered ?? 0), icon: 'vials', iconColor: 'green'}}/>
                    <MiniSummaryRow props={{header: 'RECOVERY RATE', value: parseInt((data.recovered/data.cases) * 100) + '%', icon: 'vials', iconColor: 'green'}}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'ACTIVE', value: format(data.active ?? 0), icon: 'vials', iconColor: 'orange'}}/>
                    <MiniSummaryRow props={{header: 'CRITICAL', value: format(data.critical ?? 0), icon: 'vials', iconColor: 'orange'}}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'DEATHS', value: format(data.deaths ?? 0), icon: 'vials', iconColor: 'red'}}/>
                    <MiniSummaryRow props={{header: "DEATHS TODAY", value: format(data.todayDeaths ?? 0), icon: 'vials', iconColor: 'red'}}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'DEATH RATE', value: parseInt((data.deaths/data.cases) * 100) + '%', iconColor: 'red'}}/>
                </View>
            </View>
            <Text style={[styles.lastUpdateFooterText, {marginBottom: 0}]}>LAST UPDATE: {Moment(data.lastUpdate).format('D MMM HH:mm')}</Text>
        </Card>
    );
}

// Rows

function MiniSummaryRow(props) {
    const data = props.props;
    const subValue = data.subValue ?? 0;
    const icon = data.icon;
    const iconColor = data.iconColor ?? Colors.black;

    return (
        <View style={{justifyContent: 'space-between', alignItems: 'center', padding: 10, width: Dimensions.get('window').width * .31}}>
            {/* <FontAwesome5 name={icon} size={12} color={iconColor}/> */}
            <Text style={[styles.getStartedText, {fontSize: 8, color: 'black', lineHeight: 12,}]}>{data.header}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 15, color: data.valueColor ?? iconColor ?? 'black'}}>{data.value}</Text>
                {subValue > 0
                    ? <Text style={[styles.lastUpdateFooterText, {marginTop: 2, marginBottom: 0, fontSize: 7}]}>+{format(subValue)} TODAY</Text>
                    : <Text style={[styles.lastUpdateFooterText, {marginTop: 2, marginBottom: 0, fontSize: 7}]}></Text>
                }
            </View>
        </View>
    );
}

function SquareSummaryRow(props) {
    const data = props.props;
    const subValue = data.subValue ?? 0;
    const icon = data.icon;
    const iconColor = data.iconColor ?? Colors.black;

    return (
        <View style={{aspectRatio: 1, justifyContent: 'space-between', alignItems: 'center',  backgroundColor: 'rgba(253, 155, 152, 0.20)', margin: 4, padding: 12, borderRadius: 5, height: 120}}>
            <FontAwesome5 name={icon} size={16} color={iconColor}/>
            <View style={{backgroundColor: Colors.lightGrey, height: 0.75, width: '100%'}}/>
            <View style={{justifyContent: 'space-around'}}>
                <Text style={{fontSize: 15, color: data.valueColor ?? iconColor ?? 'black'}}>{data.value}</Text>
                {subValue > 0
                    ? <Text style={[styles.lastUpdateFooterText, {marginTop: 5, marginBottom: 0, fontSize: 7}]}>+{format(subValue)} today</Text>
                    : <Text style={[styles.lastUpdateFooterText, {marginTop: 5, marginBottom: 0, fontSize: 7}]}></Text>
                }
            </View>
            <View style={{backgroundColor: Colors.lightGrey, height: 0.75, width: '100%'}}/>
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
    const footerValue = props.props.footerValue ?? '';
    const height = props.props.height ?? 100;
    const isAbsolute = props.props.isAbsolute ?? false;
    const backgroundColor = 'rgba(253, 155, 152, 0.6)';
    const cardTitle = props.props.cardTitle ?? "";
    // console.log(props);
    let chartConfig = data.chartConfig ?? defaultChartConfig

    

    return (
        <Card 
            title={
                <View style={{justifyContent: 'center', height: 35}}>
                    <Text style={{margin: 4, color: Colors.darkGrey, alignSelf: 'center', fontWeight: '600'}}>{cardTitle.toString()}</Text>
                    <Divider style={{margin: 4}}></Divider>
                </View>
            } 
            containerStyle={{borderRadius: 2, shadowRadius: 2, paddingBottom: 10, width: cardWidth}}>
            <PieChart
                style={{marginTop: 0}}
                data={data}
                width={Dimensions.get('window').width * .75}
                height={height}
                chartConfig={chartConfig}
                accessor="population"
                paddingLeft="0"
                absolute={isAbsolute}
                hasLegend={true}
            />
            <Text style={styles.lastUpdateFooterText}>{footerText} {format(footerValue)}</Text>
            {/* <TouchableHighlight style={{padding: 12}} onPress={() => this.leanMore()}>
                <FontAwesome5 name={'info-circle'} size={16} color={Colors.primary} style={{alignSelf: 'flex-end'}}/>
            </TouchableHighlight> */}
        </Card>
    );
  }

  
// https://github.com/thegamenicorus/react-native-timeline-listview
export function TimelineView(props) {  
  
}

// Nice to have charts
// Cases over time / Recoveries / Deaths
// New cases over time / Deaths