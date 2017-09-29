import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Card'
  })
  state = {
    question: '',
    answer: ''
  }
  addCard = () => {
    this.props.dispatch(
      addCard(this.props.navigation.state.params.deck, { ...this.state })
    )
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={[{ flexDirection: 'row' }, styles.input]}>
          <TextInput
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              flex: 1
            }}
            placeholder="Question?"
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />
        </View>
        <View style={[{ flexDirection: 'row' }, styles.input]}>
          <TextInput
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              flex: 1
            }}
            placeholder="Answer"
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
        <TouchableOpacity style={[styles.button]} onPress={this.addCard}>
          <Text style={{ color: 'white' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(AddCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    height: 50,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30
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
