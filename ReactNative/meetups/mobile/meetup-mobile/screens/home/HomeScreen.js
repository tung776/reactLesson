import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { MeetupApi } from '../../constants/api';
import styles from './styles/HomeScreen';
import { MeetupList } from './components';

const meetupApi = new MeetupApi();

class HomeScreen extends Component {
  static defaultProps = {
    meetupApi:meetupApi
  }
  state = {
    loading: false,
    group: []
  }
  async componentDidMount(){
    this.setState({
      loading: true
    })
    try{
      const data = await meetupApi.fetchGroupMeetups();
      console.log("data = ", data);
       this.setState({group: data});
    }
    catch(err){
      console.log("=============  Đã có lỗi ========================");
      console.log(err);
      console.log("=================================================");
    }

    this.setState({
      loading: false
    });

  }
  render(){
    if(this.state){
      return(
        <View  style={styles.root} >
          <View style = {styles.topContainer}>
            <Text>HomeScreen</Text>
          </View>
          <View style = {styles.bottomContainer}>
            <MeetupList group = {this.state.group} />
          </View>
        </View>
      );
    }
    else {
      return (
        <View></View>
      );
    }

  }
}
export default HomeScreen;
