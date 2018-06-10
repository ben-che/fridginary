import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
const axios = require('axios')

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  handleSubmit = () => {
    console.log(this.state.text)
    let formatText = this.state.text.replace(/\s+/g, '');
    console.log(formatText);
    // axios.get(`http://localhost:8080//findRecipe?items=${this.state.inputText}`)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>List all your leftover ingredients here!</Text>
        <Text>ex: chicken,bread,juice,jellybeans</Text>
        <FormLabel>Seach</FormLabel>
        <TextInput value={this.state.text} onChangeText={(text) => this.setState({text})}/>
        <Text style={styles.mainText}>Shake your phone to open the developer menu.</Text>
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
