import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>List all your leftover ingredients here!</Text>
        <Text>ex: chicken,bread,juice,jellybeans</Text>
        <FormLabel>Name</FormLabel>
        <FormInput />
        <FormValidationMessage>Error message</FormValidationMessage>
        <FormValidationMessage>{'This field is required'}</FormValidationMessage>
        <Text>Shake your phone to open the developer menu.</Text>
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
});
