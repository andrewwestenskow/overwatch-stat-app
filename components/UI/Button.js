import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
const base = {
  fontFamily: 'Koverwatch',
  fontSize: 18,
};

const Button = props => {
  const isDisabled = props.disabled || props.loading;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={isDisabled}
      onLongPress={props.onLongPress}
      style={
        isDisabled
          ? {...styles.button, ...styles.disabled, ...props.buttonStyle}
          : {...styles.button, ...props.buttonStyle}
      }>
      <Text
        style={
          isDisabled
            ? {...styles.text, ...styles.textDisabled, ...props.textStyle}
            : {...styles.text, ...props.textStyle}
        }>
        {props.title}
      </Text>
      {props.loading && <ActivityIndicator style={styles.icon} color="#000" />}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 4,
    backgroundColor: '#dd5f19',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    position: 'relative',
  },
  disabled: {
    backgroundColor: 'grey',
    borderColor: '#979797',
  },
  text: {textAlign: 'center', ...base},
  textDisabled: {color: '#979797'},
  icon: {position: 'absolute', right: 10},
});
