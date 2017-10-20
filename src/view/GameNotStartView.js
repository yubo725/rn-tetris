import React, { Component } from 'react';
import {GAME_STATE_PLAYING} from '../utils/Constants';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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
        <Image source={require('../../images/ic_smile.png')} style={styles.icon} />
        <TouchableOpacity style={styles.btn} onPress={this.startGame}>
          <Text style={styles.text}>START GAME</Text>
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
    height: 100,
    marginBottom: 100
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
