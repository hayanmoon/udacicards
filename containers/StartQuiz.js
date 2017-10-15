import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../utils/helpers'

class StartQuiz extends Component {
  static navigationOptions = {
    title: 'Quiz'
  }
  state = {
    animatedValue: new Animated.Value(0),
    opacity: new Animated.Value(0),
    animatedOpacity: new Animated.Value(1),
    questionIndex: 0,
    score: 0,
    key: this.props.navigation.state.key,
    questions: []
  }

  componentDidMount() {
    getDeck(this.props.navigation.state.params.title)
      .then(deck => {
        const { title, questions } = deck
        this.setState({ questions, title })
      })
      .catch(e => {
        console.log('error fetch')
      })
  }

  flipCard = () => {
    if(Platform.OS === 'ios'){
      Animated.spring(this.state.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 3
      }).start()
    }else{
      Animated.timing(this.state.animatedOpacity,{ toValue:0, duration:500}).start()
    }
      
  }

  correct = () => {
    const score = this.state.score + 1
    const currentIndex = this.state.questionIndex + 1
    this.state.animatedValue.setValue(0)
    this.state.opacity.setValue(0)
    this.state.animatedOpacity.setValue(1)
    if (currentIndex === this.state.questions.length) {
      this.props.navigation.navigate('Score', { 
        score,
        key: this.state.key,
        title: this.state.title 
      })
      return
    }

    this.setState({
      questionIndex: currentIndex,
      score
    })
  }

  incorrect = () => {
    const currentIndex = this.state.questionIndex + 1
    this.state.animatedValue.setValue(0)
    this.state.opacity.setValue(0)
    this.state.animatedOpacity.setValue(1)
    if (currentIndex === this.state.questions.length) {
      this.props.navigation.navigate('Score', {
        score: this.state.score,
        key: this.state.key,
        title: this.state.title
      })
      return
    }
    this.setState({
      questionIndex: currentIndex
    })
  }

  render() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 1000 }).start()
    const { questions, questionIndex, animatedValue, opacity, animatedOpacity } = this.state

    const { question, answer } =
      questions.length > 0 ? questions[questionIndex] : {}

    let animatedFrontStyle = null
    let animatedBackStyle = null

    if(Platform.OS == 'ios'){
      const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
      })
  
      const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
      })
      animatedFrontStyle = {
        transform: [{ rotateY: frontInterpolate }]
      }
      animatedBackStyle =  {
        transform: [{ rotateY: backInterpolate }]
      }
    }else{
      const frontInterpolate = animatedOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
  
      const backInterpolate = animatedOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      })
      animatedFrontStyle = {
        opacity: frontInterpolate
      }
      animatedBackStyle =  {
        opacity:  backInterpolate
      }
    }


    return (
      <View style={styles.container}>
        <View style={styles.counter}>
          <Text style={{ fontSize: 20 }}>
            {`${questionIndex +1}/${questions.length}`}
          </Text>
        </View>
        <View style={styles.details}>
          <View
            style={[
              styles.container,
              { justifyContent: 'center', alignItems: 'center' }
            ]}>
            <Animated.View style={{ opacity: opacity, alignItems: 'center' }}>
              <Animated.View
                style={[
                  styles.flipCard,
                  animatedFrontStyle
                ]}>
                <Text style={styles.title}>
                  {`${question ? question : ''}?`}
                </Text>
                <Text style={styles.subtitle}>Question</Text>
              </Animated.View>
              <Animated.View
                style={[
                  animatedBackStyle,
                  styles.flipCard,
                  styles.flipCardBack
                ]}>
                <Text style={styles.title}>{answer ? answer : ''}</Text>
                <Text style={styles.subtitle}>Answer</Text>
              </Animated.View>
            </Animated.View>
          </View>
          <TouchableOpacity onPress={this.flipCard}>
            <Text>Show Answer</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    position: 'absolute',
    top: 0
  },
  title: {
    fontSize: 40,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10
  }
})

export default StartQuiz
