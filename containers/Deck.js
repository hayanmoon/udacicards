import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

class Deck extends Component {
  static navigationOptions = {
    title: 'udacicards',
  }

  render() {
    const { deck } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 20 }}>{deck.title}</Text>
          <Text stlye={{ fontSize: 10 }}>Deck card number</Text>
        </View>
        <TouchableOpacity>
          <View>
            <Text>Add Card</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>Start Quiz</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Deck

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 16,
    padding: 40,
    // marginLeft:10,
    // marginRight:10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
    // shadowRadius:3,
    // shadowOpacity: 0.8,
    // shadowColor: 'black',
    // shadowOffset:{
    //     width:0,
    //     height:3
    // }
  },
  title: {
    fontSize: 20
  }
})
