import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class Score extends Component {
    static navigationOptions = {
        headerLeft: null,
        title: 'Score'
    }

    backToDeck = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: this.props.navigation.state.params.key
        }))
    }

    restartQuiz = () =>{
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 2,
            actions:[
                NavigationActions.navigate({routeName:'Main'}),
                NavigationActions.navigate({routeName:'Deck',params:{deck:this.props.deck.title}}),
                NavigationActions.navigate({routeName:'Quiz'}),

            ]
        }))
    }
    render(){
        return(
               <View style={styles.container}>
                   <Text style={styles.title}>Your score</Text>
                   <Text style={styles.title}>{this.props.navigation.state.params.score}</Text>
                   <TouchableOpacity onPress={this.restartQuiz}>
                       <Text>Restart Quiz</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={this.backToDeck}>
                       <Text>Back to Deck</Text>
                   </TouchableOpacity>
               </View>
        )
    }
}

function mapStateToProps(state) {
    const { decks, selectedDeck } = state
    return {
      deck: decks[selectedDeck]
    }
  }

export default connect(mapStateToProps)(Score)


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