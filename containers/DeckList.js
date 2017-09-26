import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Deck from '../components/Deck'

class DeckList extends Component {
    static navigationOptions = {
        tabBarLabel: 'Decks'
    }
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={[1,2,3]}
                    renderItem={({item}) => <Deck key={item}/>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

export default DeckList

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})