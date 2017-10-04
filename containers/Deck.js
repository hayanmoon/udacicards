import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../utils/helpers'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deck
    }
  }
  state = {
    deck :{
      title:'',
      questions:[]
    }
  }

  componentDidMount(){
    getDeck(this.props.navigation.state.params.deck).then(deck => {
      this.setState({deck})
    })    
  }

  refreshOnGoBack(){
    getDeck(this.props.navigation.state.params.deck).then(deck => {
      this.setState({deck})
    }) 
  }

  addCard = (deck) =>{
    this.props.navigation.navigate('AddCard', { deck, update: () => this.refreshOnGoBack() })
  }

  startQuiz = ()=>{
    if(this.props.deck.questions.length > 0){
      this.props.navigation.navigate('Quiz')
    }else{
      Alert.alert('No Cards','Please add a card to start the quiz')
    }
  }
  
  render() {
    const { title, questions } = this.state.deck
    return (
      <View style={styles.container}>
        <View style={[{ flex: 1, padding: 40 }, styles.center]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.subtitle]}>{`${questions.length} cards`}</Text>
        </View>
        <View style={[{ flex: 1 }, styles.center]}>
          <TouchableOpacity
            style={[styles.btn, styles.addBtn]}
            onPress={()=>this.addCard(title)}>
            <Text style={{textAlign:'center'}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.btn, styles.startBtn]} 
            onPress={this.startQuiz}>
            <Text style={{ color: 'white',textAlign:'center' }}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect()(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginTop: 10
  },
  btn: {
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderWidth: 1,
    borderRadius: 5,
    width:180,

  },
  addBtn: {
    borderColor: 'gray'
  },
  startBtn: {
    backgroundColor: 'black'
  }
})
