import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import SafeView from '../hocs/SafeView';
import containers from '../styles/container';
import typography from '../styles/typography';
import Button from './UI/Button';
import httpRequest from '../utils/httpRequest';

const Landing = ({navigation}) => {
  useEffect(() => {
    httpRequest({method: 'GET', url: '/auth'})
      .then(res => {
        navigation.navigate('Dashboard');
      })
      .catch(() => console.log('Invalid auth token'));
  }, []);

  return (
    <View style={containers.container}>
      <Text style={typography.heading}>Welcome to Overwatch Match Tracker</Text>
      <Button onPress={() => navigation.navigate('Register')} title="Sign Up" />
      <Button onPress={() => navigation.navigate('Login')} title="Log In" />
    </View>
  );
};

export default SafeView(Landing);
