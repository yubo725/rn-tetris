import React, { Component } from 'react';
import {GAME_STATE_PLAYING} from '../utils/Constants';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ART,
  StatusBar
} from 'react-native';

export default class GameNotStartView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#282C34'
          barStyle="light-content"
          />
        <Image source={require('../../images/ic_cry.png')} style={styles.icon} />
        <Text style={[styles.text, {marginBottom: 100, marginTop: 10}]}>GAME OVER</Text>
        <TouchableOpacity style={styles.btn} onPress={this.startGame}>
          <Text style={styles.text}>RESTART</Text>
        </TouchableOpacity>
      </View>
    );
  }
  startGame = ()=>{
    this.props.changeGameState && this.props.changeGameState(GAME_STATE_PLAYING);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C34',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 100,
    height: 100
  },
  btn: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    padding: 15
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});
