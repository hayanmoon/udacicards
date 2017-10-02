import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native'
import { connect } from 'react-redux'

class StartQuiz extends Component {
  state = {
    animatedValue: new Animated.Value(0),
    opacity: new Animated.Value(0),
    questionIndex: 0,
    score: 0
  }

  flipCard = () => {
    if (this.state.animatedValue._value >= 90) {
      Animated.spring(this.state.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 3
      }).start()
    } else {
      Animated.spring(this.state.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 3
      }).start()
    }
  }

  correct = () =>{
    const score = this.state.score+1
    const currentIndex = this.state.questionIndex + 1
    this.state.animatedValue.setValue(0)
    this.state.opacity.setValue(0)
    if(currentIndex === this.props.deck.questions.length){
      this.props.navigation.navigate('Score',{score:score})
      return
    }
    
    this.setState({
      questionIndex: currentIndex,
      score
    })

  }

  incorrect = () =>{
    this.setState({
      questionIndex: this.state.questionIndex + 1
    })
  }

  render() {
    Animated.timing(this.state.opacity, {toValue:1,duration:1000}).start()
    const { title, questions } = this.props.deck
    const {question, answer} = questions[this.state.questionIndex]
    const frontInterpolate = this.state.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })

    const backInterpolate = this.state.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

    return (
      <View style={styles.container}>
        <View style={styles.counter}>
          <Text style={{ fontSize: 20 }}>{`${this.state.questionIndex+1}/${questions.length}`}</Text>
        </View>
        <View style={styles.details}>
          <View
            style={[
              styles.container,
              { justifyContent: 'center', alignItems: 'center' }
            ]}>
            <Animated.View style={{opacity:this.state.opacity}}>
              <Animated.View
                style={[
                  styles.flipCard,
                  {
                    transform: [{ rotateY: frontInterpolate }]
                  }
                ]}>
                <Text style={{fontSize:30, textAlign:'center'}}> {`${question}?`} </Text>
              </Animated.View>
              <Animated.View
                style={[
                  {
                    transform: [{ rotateY: backInterpolate }]
                  },
                  styles.flipCard,
                  styles.flipCardBack
                ]}>
                <Text style={{fontSize:30}}>Answer</Text>
                <Text style={{fontSize:30}}>{answer}</Text>
              </Animated.View>
            </Animated.View>

            <TouchableOpacity onPress={this.flipCard}>
              <Text>Flip!</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.container,
              { justifyContent: 'center', alignItems: 'center' }
            ]}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: 'green' }]}
              onPress={this.correct}>
              <Text style={styles.text}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.btn, { backgroundColor: 'red' }]}
              onPress={this.incorrect}>
              <Text style={styles.text}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  counter: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 5
  },
  details: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btn: {
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 5,
    width: 180
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    position: 'absolute',
    top: 0
  }
})

function mapStateToProps(state) {
  const { decks, selectedDeck } = state
  return {
    deck: decks[selectedDeck]
  }
}

export default connect(mapStateToProps)(StartQuiz)
