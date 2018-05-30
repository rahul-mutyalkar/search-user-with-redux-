import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import configureStore from './configureStore';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '70%',
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center'
  },
});

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.store = configureStore();
    this.delayedText = _.debounce(this.findUser.bind(this), 250);
  }

  handleChange = (e) => {
    this.props.changeSearchString(e);
    this.delayedText(e);
  }

  findUser() {

    console.log('findUser() : ', this.props.appData)
    if (this.props.appData.searchText.length > 0) {
      this.props.fetchData(this.props.appData.searchText);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
          height: 40,
          width: '100%',
        }}
          onChangeText={this.handleChange}
          placeholder="eg. mojombo"
        />
        { this.props.appData.dataFetched === false && this.props.appData.data !== null ?
          <View>
            <Text>{this.props.appData.data.name !== null ? this.props.appData.data.name : 'No name to show'}</Text>
            <Text>{this.props.appData.data.company !== null ? this.props.appData.data.company : 'No company to show'}</Text>
            <Text>{this.props.appData.data.email !== null ? this.props.appData.data.email : 'No email to show'}</Text>
            {/* eslint-disable max-len */}
            {this.props.appData.data.avatar_url !== undefined && this.props.appData.data.avatar_url.length > 0 ? <Image style={{ width: 50, height: 50 }} source={{ uri: this.props.appData.data.avatar_url }} /> : <Text>No image to show</Text> }
          </View> : null}
        {this.props.appData.isFetching === true ? <Text>Loading</Text> : null}
        { this.props.appData.searchText.length > 0 && this.props.appData.isFetching === false && this.props.appData.data === null ? <Text>No user Found</Text> : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log("store : ", state);
  return { appData: state.appData };
}


function mapDispatchToProps(dispatch) {
  // console.log('dispatch : ',dispatch)
  return {
    fetchData: text => dispatch(fetchData(text)),
    changeSearchString: (text) => {
      // console.log('changeSearchString : ',text)
      dispatch({ type: 'CHANGE_SEARCH_STRING', text });
    },

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Input);
