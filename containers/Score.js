import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
class Score extends Component {
    render(){
        console.log(this.props)
        return(
               <View style={styles.container}>
                   <Text style={styles.title}>Your score</Text>
                   <Text style={styles.title}>{this.props.navigation.state.params.score}</Text>
                   <TouchableOpacity>
                       <Text>Restart Quiz</Text>
                   </TouchableOpacity>
                   <TouchableOpacity>
                       <Text>Retrun To Menu</Text>
                   </TouchableOpacity>
               </View>
        )
    }
}

export default Score


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
    },
    score:{
        fontSize:70,
    }
})