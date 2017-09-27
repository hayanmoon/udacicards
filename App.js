import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './containers/DeckList'
import NewDeck from './containers/NewDeck'
import Deck from './containers/Deck'
import { Constants } from 'expo'

const store = createStore(reducer)

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList
    },
    NewDecks: {
      screen: NewDeck
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
)

const MainNavigator = StackNavigator({
  Main: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar translucent barStyle="dark-content" />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
