import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/helpers'

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
    saveDeckTitle(this.state.text).then((data)=>{
      this.props.dispatch(addDeck(data))
    }).catch((e)=> console.log('error save to deck',e))
    this.setState({text:''})
    this.props.navigation.goBack()
  }


  render() {
    return (
      <KeyboardAvoidingView   behavior='padding' style={styles.container}>
        <Text style={{ fontSize: 50, textAlign: 'center', marginBottom: 50 }}>
          What is the title of your new deck?
        </Text>
        <View  style={[{ flexDirection: 'row' }, styles.input]}>
          <TextInput
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              flex: 1
            }}
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

export default connect()(NewDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
