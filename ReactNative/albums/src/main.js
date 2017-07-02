import React, { Component } from 'react';
import {Header} from './components/commons';
import {View} from 'react-native';
import firebase from 'firebase';
import LoginForm from './components/loginForm';

class Main extends Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAUaYNtSm2JrP-QNWt8ftG8Pmm5lbM5qpc',
            authDomain: 'authentication-c97b0.firebaseapp.com',
            databaseURL: 'https://authentication-c97b0.firebaseio.com',
            projectId: 'authentication-c97b0',
            storageBucket: 'authentication-c97b0.appspot.com',
            messagingSenderId: '973039468572'
        });
    }
    render() {
        return (
            <View>
                <Header headerText = {'Authentication'} />
                <LoginForm />
            </View>
        );
    }
}

export default Main;