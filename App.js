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
} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
// import RNGooglePlaces from 'react-native-google-places';
// import RNGooglePlaces from 'react-native-google-places';


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
            json:null,
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

    onRegionChange = (region) => {
        Geocoder.getFromLatLng(region.latitude, region.longitude).then(
            json => {
                var address_component = json.results[0].address_components[1];
                // alert(JSON.stringify(json));
                console.log("ROAD NAME", address_component);
                this.setState({place:{name:address_component.long_name},region, json});
            },
            error => {
                alert('error aaya hai ' + error);
            }
        );
        this.setState({region});
    }

    render() {
        return (
            <MapView style={styles.container}
                     initialRegion={this.state.region}
                     onRegionChange={this.onRegionChange}
                     region={this.state.region}
            >
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => this.openSearchModal()}
                >
                    <Text>Pick a Place</Text>
                </TouchableOpacity>
                {/*<Text style={styles.title}>{this.state.json}</Text>*/}
                <View style={styles.box}>
                    <Text /*style={styles.tit}*/>Place name</Text>
                    <Text /*style={styles.plastic}*/>{this.state.place.name}</Text>
                </View>

            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: width,
        height: height,
    },
    box: {
        // width: '100%',
        height: 100,
        margin: 10,
        backgroundColor: '#FF00FF',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    input:{
        // width: '100%',
        height: 50,
        margin: 10,
        marginTop:40,
        backgroundColor: '#FF0033',
        // fontSize:15,
    },
    tit:{
        fontSize:14,
        marginTop:5,
        marginLeft:5,
    },
    plastic:{
        fontSize:20, fontWeight:'bold',margin:5,
    }
});

//style={{fontSize:20,borderColor:'#fff', borderWidth:2,alignSelf:'flex-end', }}

//Google Geocoding key: AIzaSyARVStcGaPDi8siWzfIep1p3Gksm5pDyXY