import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Linking, Alert} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
const axios = require('axios');
const internalIp = require('./secrets.js').ip;


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  static navigationOptions = {
    title: 'Refriginary',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  handleSubmit = () => {
    let formatText = String(this.state.text).split(" ").join('');
    // with android emulators: change localhost to http://10.0.2.2:8080
    // with a real device, use ip address of the device the express server is hosted on
    axios.get(`http://${internalIp}:8080/findRecipe?items=${formatText}`)
    .then(response => {
      console.log(response.data)
      this.setState(
        response.data
      )
    })
    .then(response => {
      // Nav to results, pass entire state
      console.log(this.state)
      if (this.state.recipes.length === 0) {
        alert('No results found, check your spelling or try again with less parameters', {text: 'Okay', onPress: () => console.log('Okay Pressed'), style: 'cancel'})
      }
      else {
        this.props.navigation.navigate('Results', this.state)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount = () => {
    
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
          <Button
          title="Go to Results"
          onPress={() => this.props.navigation.navigate('Results')}
        />
      </View>
    );
  }
}

class ResultsScreen extends React.Component {
  static navigationOptions = {
    title: "Search Results",
  };

  componentDidMount = () => {
    console.log('ResultsScreen mounted!')
    // console.log(this.props.naviggation.state);
    console.log(this.props) // state as prop is found here

    // Linking:
    Linking.addEventListener('url', this._handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  // _handleOpenURL(event) {
  //   console.log(event.url);
  //   Linking.openURL(this.props.navigation.state.params.recipes.source_url).catch(err => console.error('An error occurred', err));
  // }

  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        
        <FlatList
          data = {this.props.navigation.state.params.recipes}
          renderItem={({item}) => 
          <View key={item.recipe_id} >
            <Image
                style={{width: 125, height: 125}}
                source={{uri: item.image_url}}
            />
            <Text>Recipe #{item.recipe_id}: {item.title}</Text>
            <Text>Popularity:{item.social_rank}</Text>
          </View>
          }
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

const RootStack = createStackNavigator({
    Home:HomeScreen,
    Results: ResultsScreen
  },
  {
    initialRouteName: 'Home',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}