import React, {useState, useContext} from 'react';
import {PlayersContext} from '../../context/stores/players';
import {GameDataContext} from '../../context/stores/gameData';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import UI from '../UI';
import SafeView from '../../hocs/SafeView';
import containers from '../../styles/container';
import typography from '../../styles/typography';
import httpRequest from '../../utils/httpRequest';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {setPlayer, setPlayers, getPlayers} = useContext(PlayersContext);
  const {getGameData} = useContext(GameDataContext);

  const handleLogin = () => {
    setIsLoading(true);
    httpRequest({method: 'POST', data: {email, password}, url: '/auth/login'})
      .then(async res => {
        await AsyncStorage.setItem('token', res.token);
        await getGameData();
        getPlayers().then(players => {
          setPlayers(players);
          if (players[0]) {
            setPlayer(players[0]);
            navigation.navigate('ResultsContainer');
          } else {
            navigation.navigate('ResultsContainer', {
              screen: 'Results',
              params: {
                screen: 'Drawer',
                params: {
                  screen: 'Add Player',
                },
              },
            });
          }
        });
      })
      .catch(err => console.log('ERROR ', err))
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={containers.container}>
      <UI.FormWrapper>
        <>
          <Text style={typography.heading}>Login</Text>
          <UI.Input
            textContentType="emailAddress"
            autoFocus={true}
            autoCapitalize="none"
            autoCompleteType="email"
            onChangeText={value => setEmail(value)}
            placeholder="Email"
          />
          <UI.Input
            secureTextEntry={true}
            textContentType="password"
            onChangeText={value => setPassword(value)}
            placeholder="Password"
          />
          <UI.Button loading={isLoading} onPress={handleLogin} title="Log In" />
        </>
      </UI.FormWrapper>
    </View>
  );
};
export default SafeView(Login);
