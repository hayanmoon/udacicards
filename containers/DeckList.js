import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { getDecks } from '../utils/helpers'
import { RECEIVE_DECKS } from '../actions'
import DeckItem from '../components/DeckItem'
import { connect } from 'react-redux'

class DeckList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Decks'
  }

  componentDidMount() {
    getDecks().then(data => {
      console.log(data)
      this.props.dispatch({ type: RECEIVE_DECKS, decks: data })
    })
  }

  selectDeck = item => {
    this.props.navigation.navigate('Deck', { deck: item })
  }

  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        {decks.length < 1 ? (
          <Text>No Decks Available</Text>
        ) : (
          <FlatList
            data={Object.keys(decks).map(deck => {
              return { ...decks[deck] }
            })}
            renderItem={({ item }) => (
              <DeckItem
                key={item.title}
                onPress={() => this.selectDeck(item)}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    )
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
