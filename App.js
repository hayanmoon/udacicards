import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './containers/DeckList'
import NewDeck from './containers/NewDeck'
import Deck from './containers/Deck'
import AddCard from './containers/AddCard'
import StartQuiz from './containers/StartQuiz'
import Score from './containers/Score'
import { Constants } from 'expo'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

const store = createStore(reducer)

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions:{
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name='cards' style={{fontSize:30}}/>
        )
      }
    },
    NewDecks: {
      screen: NewDeck,
      navigationOptions:{
        tabBarIcon: ({tintColor}) => (
          <Entypo name="plus" style={{fontSize:30}}/>
        )
      }
      
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
)

const MainNavigator = StackNavigator({
  Decks: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen:StartQuiz
  },
  Score:{
    screen: Score
  }
})

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar translucent barStyle="dark-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
