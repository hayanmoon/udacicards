import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'

class StartQuiz extends Component {
  state = {
    animatedValue : new Animated.Value(0)
  }
  componentDidMount(){

    this.frontInterpolate = this.state.animatedValue.interpolate({
      inputRange:[0,180],
      outputRange:['0deg','180deg']
    })


    this.backInterpolate = this.state.animatedValue.interpolate({
      inputRange:[0,180],
      outputRange:['180deg','360deg']
    })
  }

  flipCard = () =>{
    console.log(this.state.animatedValue)
    if(this.state.animatedValue._value >= 90){
      Animated.spring(this.state.animatedValue,{
        toValue:0,
        friction:8,
        tension:10
      }).start()
    }else{
      Animated.spring(this.state.animatedValue,{
        toValue:180,
        friction:8,
        tension:10
      }).start()
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.counter}>
          <Text style={{ fontSize: 20 }}>2/2</Text>
        </View>
        <View style={styles.details}>
          <View style={[styles.container,{ justifyContent: 'center', alignItems: 'center' }]}>
            <View>
              <Animated.View style={[styles.flipCard,{
                transform:[
                  {rotateY: this.state.animatedValue.interpolate({
                    inputRange:[0,180],
                    outputRange:['0deg','180deg']
                  })}
                ]
              }]}>
                <Text> Does React Native work with Android? </Text>
              </Animated.View>
              <Animated.View style={[{
                transform:[
                  {rotateY: this.state.animatedValue.interpolate({
                    inputRange:[0,180],
                    outputRange:['180deg','360deg']
                  })}
                ]
              },styles.flipCard, styles.flipCardBack]}>
                <Text> Yes! </Text>
              </Animated.View>
            </View>

            <TouchableOpacity onPress={this.flipCard}>
              <Text>Answer</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.container,
              { justifyContent: 'center', alignItems: 'center' }
            ]}
          >
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: 'green' }]}
            >
              <Text style={styles.text}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: 'red' }]}>
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
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0
  }
})

export default StartQuiz
