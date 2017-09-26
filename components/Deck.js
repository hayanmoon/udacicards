import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class Deck extends Component {
    static navigationOptions = {
        tabBarLabel: 'Decks'
    }
    render(){
        return(
            <View style={[styles.container,{borderBottomColor:"black", borderBottomWidth:.5}]}>
                <Text style={{fontSize:20}}>Deck title</Text>
                <Text stlye={{fontSize:10}}>Deck card number</Text>
            </View>
        )
    }
}

export default Deck


const styles = StyleSheet.create({
    container:{
        flex:1,
        // borderRadius: 16,
        padding:40,
        // marginLeft:10,
        // marginRight:10,
        marginTop:17,
        justifyContent:'center',
        alignItems:'center'
        // shadowRadius:3,
        // shadowOpacity: 0.8,
        // shadowColor: 'black',
        // shadowOffset:{
        //     width:0,
        //     height:3
        // }
    },
    title:{
        fontSize:20,
    }
})