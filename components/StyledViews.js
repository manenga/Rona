//
// Author: Manenga Mungandi
// StyledViews.js
// Rona
//

import * as React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import styles from '../constants/Styles';
import Colors from '../constants/Colors';
import { format } from '../constants/Extensions';
import { MonoText } from '../components/StyledText';
import { Card, Divider, Overlay, TouchableHighlight } from 'react-native-elements'
import { DotIndicator, PulseIndicator, SkypeIndicator } from 'react-native-indicators';
import { LineChart, BarChart, PieChart, ProgressChart, StackedBarChart } from "react-native-chart-kit";
import { LinearGradient } from 'expo-linear-gradient';
import Moment from 'moment';
import { FontAwesome5 } from "@expo/vector-icons";
import Hyperlink from 'react-native-hyperlink'

export const cardWidth = Dimensions.get('window').width * .90;

export class BasicSummaryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
      }

    leanMore () { }

    render() {
        const data = this.props.props ?? [];
        const headerText = data.headerText ?? "";
        const headerImage = data.headerImage ?? "";
        const hasHeaderText = headerText.trim() != "";
        const hasHeaderImage = headerImage.trim() != "";

    return (
    <View >
        { hasHeaderImage ? <Image source={{uri: headerImage}} style={[styles.basicSummaryViewHeaderImage, {marginTop: 15, marginBottom: 5}]}/> : null }
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
    const recovered = data.recovered ?? 0;
    const cases = data.cases ?? 0;
    const deaths = data.deaths ?? 0;
    const todayCases = data.todayCases ?? 0;
    const todayDeaths = data.todayDeaths ?? 0;
    const active = data.active ?? 0;
    const critical = data.critical ?? 0;
    const icon = data.icon;
    const iconColor = data.iconColor ?? Colors.black;
    const screenName = data.screenName ?? "";
    return(
        <Card title={screenName.toString()} containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 15, width: cardWidth}}>
            <View style={{justifyContent: 'space-between', alignItems: 'center',  backgroundColor: 'rgba(253, 155, 152, 0.20)', margin: 4, padding: 12, borderRadius: 5}}>
                <Text style={[styles.getStartedText, {fontSize: 12, color: Colors.darkGrey, fontWeight: '700', lineHeight: 12}]}>CASES</Text>
                <View style={{justifyContent: 'space-around'}}>
                    <Text style={{fontSize: 32, fontWeight: 'bold', color: Colors.primary}}>{format(data.cases ?? 0)}</Text>
                    {subValue > 0
                        ? <Text style={[styles.lastUpdateFooterText, {marginTop: 5, marginBottom: 0, fontSize: 7}]}>+{format(data.todayCases)} today</Text>
                        : <Text style={[styles.lastUpdateFooterText, {marginTop: 5, marginBottom: 0, fontSize: 7}]}></Text>
                    }
                </View>
                <View style={{backgroundColor: Colors.lightGrey, height: 0.75, width: '100%', marginBottom: 10}}/>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'RECOVERED', value: format(recovered), icon: 'heartbeat', iconColor: 'green'}}/>
                    <MiniSummaryRow props={{header: 'DEATHS', value: format(deaths), icon: 'praying-hands', iconColor: 'red'}}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'CASES TODAY', value: format(todayCases), icon: 'search-plus', iconColor: Colors.navy}}/>
                    <MiniSummaryRow props={{header: "DEATHS TODAY", value: format(todayDeaths), icon: 'praying-hands', iconColor: Colors.navy}}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'RECOVERY RATE', value: Math.round((recovered/cases) * 100) + '%', icon: 'heartbeat', iconColor: 'green'}}/>
                    <MiniSummaryRow props={{header: 'DEATH RATE', value: Math.round((deaths/cases) * 100) + '%', icon: 'praying-hands', iconColor: 'red'}}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <MiniSummaryRow props={{header: 'ACTIVE', value: format(active), icon: 'first-aid', iconColor: 'orange'}}/>
                    <MiniSummaryRow props={{header: 'CRITICAL', value: format(critical), icon: 'procedures', iconColor: 'orange'}}/>
                </View>
            </View>
            <Text style={[styles.lastUpdateFooterText, {marginBottom: 0}]}>Last update: {Moment(data.lastUpdate).format('D MMM HH:mm')}</Text>
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
            <FontAwesome5 name={icon} size={17} color={Colors.darkGrey} style={{marginBottom: 7}}/>
            <Text style={[styles.getStartedText, {fontSize: 10, color: 'black', fontWeight: '600', lineHeight: 11,}]}>{data.header}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '300', color: data.valueColor ?? iconColor ?? 'black'}}>{data.value}</Text>
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

// Examples: 
// Death rate
// Average death age, min death age, max death age
export function MetricInfoCard(props) {  
    const data = props.props.data ?? [];
    const value = props.props.value ?? '';
    const cardTitle = props.props.cardTitle ?? "";

    return (
        <Card 
            title={
                <View style={{justifyContent: 'center', height: 35}}>
                    <Text style={{margin: 4, color: Colors.darkGrey, alignSelf: 'center', fontWeight: '600'}}>{cardTitle.toString()}</Text>
                    <Divider style={{margin: 4}}></Divider>
                </View>
            } 
            containerStyle={{borderRadius: 2, shadowRadius: 2, paddingBottom: 10, width: cardWidth}}>
            <Text style={{fontSize: 21, textAlign: 'center'}}>{value}</Text>
        </Card>
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

  export function BasicPieChart(props) {  
    const data = props.props.data ?? [];
    const headerText = props.props.headerText ?? '';
    const footerText = props.props.footerText ?? '';
    const footerValue = props.props.footerValue ?? '';
    const height = props.props.height ?? 100;
    const isAbsolute = props.props.isAbsolute ?? false;
    const backgroundColor = 'rgba(253, 155, 152, 0.6)';
    const cardTitle = props.props.cardTitle ?? "";
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
        </Card>
    );
  }


export function CountryHeader(props) {
    let name = props.props.name ?? 'SOUTH AFRICA';
    let flag = props.props.flag ?? '';
    const hasFlag = flag.trim() != "";

    return(
        <TouchableOpacity
            underlayColor='transparent'>
            <Card containerStyle={{borderRadius: 2, shadowRadius: 2, paddingBottom: 10, width: cardWidth}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    {hasFlag && <Image source={{uri: flag}} style={[styles.basicSummaryViewHeaderImage, {height: 14, width: 28}]}/>}
                    <Text style={{color: Colors.darkGrey, fontWeight: '500', alignSelf: 'center'}}>{name}</Text>
                    <FontAwesome5 name={'caret-square-down'} size={16} color={Colors.primary} style={{}}/>
                </View>
            </Card>
        </TouchableOpacity>
    );
}

function DeveloperRows() {
    return(
        <View style={{justifyContent: 'space-between', marginVertical: 15}}>
            <TouchableOpacity 
                style={{flexDirection: 'row'}}>
                {/* onPress={Linking.openURL('https://github.com/manenga')}> */}
                <FontAwesome5 name={'github'} size={21} style={{marginHorizontal: 10}}/>
                <Text style={{color: Colors.darkGrey, fontWeight: '500', fontSize: 15}}>manenga</Text>
            </TouchableOpacity>
            <Divider style={{marginVertical: 15, height: 0}}></Divider>
            <TouchableOpacity 
                onPress={Linking.openURL('https://www.linkedin.com/in/mungandi/')} 
                style={{flexDirection: 'row'}}>
                <FontAwesome5 name={'linkedin'} size={21} color={'#0072b1'} style={{marginHorizontal: 10}}/>
                <Text style={{color: Colors.darkGrey, fontWeight: '500', fontSize: 15}}>mungandi</Text>
            </TouchableOpacity>
            <Divider style={{marginVertical: 15, height: 0}}></Divider> */}
            <TouchableOpacity style={{flexDirection: 'row'}}>
                <FontAwesome5 name={'instagram'} size={21} color={'#0072b1'} style={{marginHorizontal: 10}}/>
                <Text style={{color: Colors.darkGrey, fontWeight: '500', fontSize: 15}}>mungandi</Text>
            </TouchableOpacity>
            <Divider style={{marginVertical: 15, height: 0}}></Divider>
            <DonateButton/>
        </View>
    );
}

function DonateButton() {
    return(
        <TouchableOpacity 
            style={{alignSelf: 'center'}}
            onPress={(url) => {Linking.openURL('https://paypal.me/Mungandi')}}> 
            <LinearGradient style={[styles.gradientView, {borderRadius: 0, height: 37, width: 108, justifyContent: 'center'}]}
                colors={['#FFC439', '#f7f7a1', '#FFC439']}>
                <Text style={{color: Colors.darkGrey, fontWeight: '500', fontSize: 18, fontStyle: 'italic'}}>Donate</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

export function DeveloperAcknowledgmentsView(props) {
    
    return(
        <Card 
            title={
                <View style={{justifyContent: 'center', height: 35}}>
                    <Text style={{margin: 4, color: Colors.darkGrey, alignSelf: 'center', fontWeight: '600'}}>DEVELOPER INFO</Text>
                    <Divider style={{margin: 4}}></Divider>
                </View>
            } 
            containerStyle={{borderRadius: 2, shadowRadius: 2, padding: 15, width: cardWidth}}>
            <DeveloperRows/>
        </Card>
    );
}

export function AcknowledgmentsView(props) {
    return(
        <Card 
            title={
                <View style={{justifyContent: 'center', height: 35}}>
                    <Text style={{margin: 4, color: Colors.darkGrey, alignSelf: 'center', fontWeight: '600'}}>ACKNOWLEDGMENTS</Text>
                    <Divider style={{margin: 4}}></Divider>
                </View>
            } 
            containerStyle={{borderRadius: 2, shadowRadius: 2, paddingBottom: 10, width: cardWidth}}>
            <View style={{marginTop: 8, justifyContent: 'space-between', alignItems: 'center'}}>
                <Hyperlink
                    linkDefault={ true }
                    linkStyle={ { color: '#2980b9'} }
                    linkText={ url =>  {
                        switch (url) {
                            case 'https://github.com/NovelCOVID/API':
                              return 'Novel COVID API';
                            case 'https://www.worldometers.info/coronavirus/':
                                return 'Worldometers';
                            case 'https://github.com/dsfsi/covid19za':
                                return 'Covid19za';
                            case 'https://corona.rickkln.com/data/':
                                return '@rickkln';
                            case 'https://www.instagram.com/hillzy911/':
                                return 'Hillzy';
                            case 'https://www.instagram.com/atangamungandi/':
                                return 'Atanga Mungandi'
                            case 'https://www.instagram.com/alhybrido/':
                                return 'Llewellyn Iyer'
                            default:
                                return url;
                          }
                    }}>
                    <Text style={ { fontSize: 15 } }>
                    Data was sourced from https://github.com/NovelCOVID/API and https://github.com/dsfsi/covid19za. It's updated each time you open the app.
                    </Text>
                    <Text style={ { fontSize: 15, marginTop: 5 } }>
                    Inspiration from https://www.worldometers.info/coronavirus/ and https://corona.rickkln.com/data/ 🎉
                    </Text>
                    <Text style={ { fontSize: 15, marginTop: 5 } }>
                    Special thanks to https://www.instagram.com/hillzy911/, https://www.instagram.com/atangamungandi/ and https://www.instagram.com/alhybrido/ 🤝
                    </Text>
                </Hyperlink>
                <Divider style={{marginVertical: 8, height: 0}}></Divider>
                <DonateButton/>
            </View>
        </Card>
    );
}

// https://github.com/thegamenicorus/react-native-timeline-listview
export function TimelineView(props) {  
  
}

// TODO: Cases over time / Recoveries / Deaths
// TODO: New cases over time / Deaths