import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
class DeckItem extends Component {
    render(){
        return(
            <TouchableOpacity onPress={()=>this.props.onPress()}>
                <View style={[styles.container,{borderBottomColor:"gray", borderBottomWidth:.5}]}>
                    <Text style={{fontSize:20}}>{this.props.deck.title}</Text>
                    <Text stlye={{fontSize:10}}>{this.props.deck.questions.length}</Text>
                </View> 
            </TouchableOpacity>
            
        )
    }
}

export default DeckItem


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:40,
        marginTop:17,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:20,
    }
})