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

export default class PredictionItem extends Component<Props> {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity style={styles.container}
                /*onPress={}*/>
                <Text style={styles.plastic}>{this.props.result.primaryText}</Text>
                <Text style={styles.tit}>{this.props.result.secondaryText}</Text>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',
        marginBottom:2,
        marginLeft:10,
        marginRight:10,
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
        margin: 10,
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