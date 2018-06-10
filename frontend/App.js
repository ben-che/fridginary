import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
const axios = require('axios')

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
  }

  handleInput = (text) => {
    console.log('Text field currently: ', text)
    this.setState = ({
      inputText : text
    })
  }

  handleSubmit = () => {
    let formatText = this.state.inputText.replace(/\s+/g, '');
    console.log(formatText);
    // axios.get(`http://localhost:8080//findRecipe?items=${this.state.inputText}`)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>List all your leftover ingredients here!</Text>
        <Text>ex: chicken,bread,juice,jellybeans</Text>
        <FormLabel>Seach</FormLabel>
        <FormInput onChangeText={(text) => this.handleInput(text)}/>
        <Text style={styles.mainText}>Shake your phone to open the developer menu.</Text>
        <Button 
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
