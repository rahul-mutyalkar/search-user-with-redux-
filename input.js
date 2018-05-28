import React from 'react';
import {StyleSheet, Text, View,TextInput,Image} from 'react-native';
import * as _ from 'lodash';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {text: '',userData:{},isFetching:false,userExist:false};
    this.changed = _.debounce(this.findUser.bind(this), 250)
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

findUser() {
  console.log("call Me : ", this.state.text)
  if(this.state.text.length>0)
  {
    this.setState({isFetching:true})
    return fetch('https://api.github.com/users/' + this.state.text).then((response) => {
      if(response.status==200)
      {
        this.setState({isFetching:false})
        response.json().then((data)=>{
        console.log('success in responseJson : ',data)
        this.setState({userData:data})
        })
        this.setState({userExist:true})
      }
      else {
        console.log('error in responseJson : ', response)
        this.setState({isFetching:false})
        this.setState({userExist:false})

      }
      return response;
    }).catch((error) => {
      this.setState({isFetching:false})
      this.setState({userExist:false})
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
        }} onChangeText={this.handleChange} placeholder="eg. mojombo" >
        </TextInput>
        { this.state.isFetching==false && this.state.userExist==true ?   <View>
            <Text>{this.state.userData.name!=null ? this.state.userData.name : "No name to show"}</Text>
            <Text>{this.state.userData.company!=null ? this.state.userData.company : "No company to show"}</Text>
            <Text>{this.state.userData.email!=null ? this.state.userData.email : "No email to show"}</Text>
            {this.state.userData.avatar_url!=undefined && this.state.userData.avatar_url.length>0 ?<Image style={{width: 50, height: 50}} source={{uri: this.state.userData.avatar_url}}/> : <Text>No image to show</Text> }
          </View> : null}
          {this.state.isFetching==true ? <Text>Loading</Text>:null}
          { this.state.text.length>0 && this.state.isFetching==false && this.state.userExist==false ? <Text>No user Found</Text>:null}
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
