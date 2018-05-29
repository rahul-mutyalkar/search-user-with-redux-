import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Input from './input';

const store = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '20%',
    // justifyContent: 'center'
  },
});
/* eslint-disable max-len */
export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <View style={styles.container}>
        <Text>Find user by name</Text>
        <Provider store={store}>
          <Input />
        </Provider>
      </View>);
  }
}
