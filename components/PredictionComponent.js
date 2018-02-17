import React, {Component} from 'react';
import {View, TextInput, FlatList} from 'react-native';
import PredictionItem from './PredictionItem'

export default class FlatListComponent extends Component {
    render() {
        return (
            <View>
                <TextInput /*style={styles.input}*/ onChangeText={this.props.onText}/>
                <FlatList
                    data={this.props.predictions}
                    keyExtractor={(index) => {
                        return index
                    }}
                    renderItem={({item}) => {
                        return <PredictionItem result={item}/>
                    }}
                />
            </View>
        )
    };
}