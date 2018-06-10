import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
const axios = require('axios');
const internalIp = require('./secrets.js').ip;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  handleSubmit = () => {
    let formatText = String(this.state.text).split(" ").join('');
    // with android emulators: change localhost to http://10.0.2.2:8080
    // with a real device, use ip address of the device the express server is hosted on
    axios.get(`http://${internalIp}:8080/findRecipe?items=${formatText}`)
    .then(response => {
      console.log(response)
      this.setState(
        response.data
      )
    }, setTimeout(()=>{console.log(this.state)},2000) )
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>List all your leftover ingredients here!</Text>
        <Text>ex: chicken,bread,juice,jellybeans</Text>
        <FormLabel>Seach</FormLabel>
        <FormInput value={this.state.text} onChangeText={(text) => this.setState({text})}/>
        <Text style={styles.mainText}>{this.state.recipes? "Recipe here" : "Waiting to render recipes"}</Text>
        <Button 
          onPress = {() => {this.handleSubmit()}}
          title="Find Recipes" 
          icon={{name:'search'}} 
          raised   
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
            }} 
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    'backgroundColor': 'red',
  },
  mainText: {
    color: 'red'
  }
});
