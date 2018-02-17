/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import RNGooglePlaces from 'react-native-google-places';

import PredictionItem from './components/PredictionItem';


const {height, width} = Dimensions.get('window');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        Geocoder.setApiKey('AIzaSyARVStcGaPDi8siWzfIep1p3Gksm5pDyXY');

        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            place: {
                name: 'No name yet',
            },
            predictions: null,
        }

    }

    openSearchModal = () => {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                console.log(place);
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    autocompleteText = (text) => {
        RNGooglePlaces.getAutocompletePredictions(text)
            .then((results) => this.setState({predictions: results}))
            .catch((error) => console.log(error.message));
    }


    onRegionChange = (region) => {
        Geocoder.getFromLatLng(region.latitude, region.longitude).then(
            json => {
                var address_component = json.results[0].address_components[1];
                // alert(JSON.stringify(json));
                console.log("ROAD NAME", address_component);
                this.setState({place: {name: address_component.long_name}, region, json});
            },
            error => {
                alert('error aaya hai ' + error);
            }
        );
        this.setState({region});
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         initialRegion={this.state.region}
                         onRegionChange={this.onRegionChange}
                         region={this.state.region}
                />
                <View>
                    <TextInput style={styles.input} onChangeText={this.autocompleteText}/>
                    {/*<Text>{JSON.stringify(this.state.predictions)}</Text>*/}
                    <FlatList
                        data={this.state.predictions}
                        keyExtractor={(index) => {
                            return index
                        }}
                        renderItem={({item}) => {
                            return <PredictionItem result={item}/>
                        }}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.tit}>Place name</Text>
                    <Text style={styles.plastic}>{this.state.place.name}</Text>
                </View>
            </View>


        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: width,
        height: height,
        position: 'absolute',
    },
    box: {
        // width: '100%',
        height: 100,
        margin: 10,
        backgroundColor: '#FF00FF',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    input: {
        // width: '100%',
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 50,
        backgroundColor: '#FF0033',
        // fontSize:15,
    },
    tit: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 5,
    },
    plastic: {
        fontSize: 20, fontWeight: 'bold', margin: 5,
    }
});

//style={{fontSize: 20, borderColor: '#fff', borderWidth: 2, alignSelf: 'flex-end',}}

//Google Geocoding key: AIzaSyARVStcGaPDi8siWzfIep1p3Gksm5pDyXY