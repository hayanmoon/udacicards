import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'

class NewDeck extends Component{
    static navigationOptions ={
        tabBarLabel: 'New Deck'
    }

    state = {
        text: ''
    }

    componentWillUnmount(){
        console.log('dasdasd')
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:50,textAlign:'center',marginBottom:50}}>What is the title of your new deck?</Text>
                <View style={[{flexDirection:'row'},styles.input]}>
                    <TextInput
                        style={{borderBottomColor:'black',borderBottomWidth:1,flex:1}}
                        placeholder="Deck Title"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        />
                </View>
            </View>
        )
    }
}

export default NewDeck


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius:5,
        height:50,
        padding:5,
        marginLeft:10,
        marginRight:10
    }
})