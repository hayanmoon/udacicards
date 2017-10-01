import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { getDecks } from '../utils/helpers'
import { RECEIVE_DECKS, selectDeck } from '../actions'
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

  selectDeck = ({title}) => {
    this.props.dispatch(selectDeck(title))
    this.props.navigation.navigate('Deck', { deck: title })
  }

  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        {decks === null ? (
          <View style={styles.center}>
            <Text style={{fontSize:50}}>No Decks Available</Text>
          </View>
        ) : (
          <FlatList
            data={Object.keys(decks).map(deck => {
              return { ...decks[deck] }
            })}
            renderItem={({ item }) => (
              <DeckItem
                key={item.title}
                deck={item}
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
  },
  center:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
