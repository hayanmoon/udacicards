import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/helpers'
import { Entypo } from '@expo/vector-icons'


class NewDeck extends Component {
  static navigationOptions = {
    tabBarLabel: 'New Deck'
  }

  componentWillUnmount(){
    this.setState({title:''})
  }
  state = {
    text: ''
  }

  addDeck = () => {
    const { text } = this.state
    saveDeckTitle(text).then((data)=>{
      this.props.addDeck(data)
      this.props.navigation.navigate('Deck', { title: text })
    }).catch((e)=> console.log('error save to deck',e))
    this.setState({text:''})
  }


  render() {
    return (
      <KeyboardAvoidingView   behavior='padding' style={styles.container}>
        <Text style={{ fontSize: 50, textAlign: 'center', marginBottom: 50 }}>
          What is the title of your new deck?
        </Text>
        <View  style={[{ flexDirection: 'row' }, styles.input]}>
          <TextInput
            style={[Platform.OS === 'ios' ? {borderBottomColor: 'gray',
              borderBottomWidth: 1,
             }: {},{
               flex: 1
            }]}
            placeholder="Deck Title"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <TouchableOpacity style={[styles.button,{marginBottom:10}]} onPress={this.addDeck}>
          <Text style={{ color: 'white' }}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(null, {addDeck})(NewDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    height: 50,
    padding: 5,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    marginTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 1
  }
})
