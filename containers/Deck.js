import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deck
    }
  }

  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <View style={[{ flex: 1, padding: 40 }, styles.center]}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={[styles.subtitle]}>{`${deck.questions
            .length} cards`}</Text>
        </View>
        <View style={[{ flex: 1 }, styles.center]}>
          <TouchableOpacity
            style={[styles.btn, styles.addBtn]}
            onPress={() =>
              this.props.navigation.navigate('AddCard', { deck: deck.title })}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.startBtn]}>
            <Text style={{ color: 'white' }}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps)(Deck)

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
    borderRadius: 5
  },
  addBtn: {
    borderColor: 'gray'
  },
  startBtn: {
    backgroundColor: 'black'
  }
})
