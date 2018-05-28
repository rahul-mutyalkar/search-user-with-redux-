import React from 'react';
import {StyleSheet, Text, View,TextInput} from 'react-native';
import * as _ from 'lodash';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {text: '',userData:{}};
    this.changed = _.debounce(this.callMe.bind(this), 250)
  }

  handleChange = e => {
  const val = e;
  console.log("val : ", e)
  this.setState({
    text: val
  }, () => {

    this.changed(val)
  })
}

callMe() {
  console.log("call Me : ", this.state.text)
  if(this.state.text.length>0)
  {
    return fetch('https://api.github.com/users/' + this.state.text).then((response) => {
      if(response.status==200)
      {

        response.json().then((data)=>{
        console.log('success in responseJson : ',data)
        })

      }
      else {
        console.log('error in responseJson : ', response)

      }
      return response;
    }).catch((error) => {
      console.error(error);
    });
  }
  else {
    console.log("this.state.text : ",this.state.text.length);
  }

}

  render() {
    return (
      <View style={styles.container}>
      <TextInput style={{
          height: 40,
          width: '100%'
        }} placeholder="Type here to translate!" onChangeText={this.handleChange} placeholder="search user" ></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width:'70%',
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center'
  }
});
