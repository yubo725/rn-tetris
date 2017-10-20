import React, { Component } from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import GameOverView from './src/view/GameOverView';
import GameNotStartView from './src/view/GameNotStartView';
import GamePauseView from './src/view/GamePauseView';
import GamePlayingView from './src/view/GamePlayingView';
import {GAME_STATE_NOT_START, GAME_STATE_PLAYING, GAME_STATE_PAUSE, GAME_STATE_OVER} from './src/utils/Constants';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      gameState: GAME_STATE_NOT_START
    };
  }
  render() {
    switch (this.state.gameState) {
      case GAME_STATE_NOT_START:
        return <GameNotStartView changeGameState={this.changeGameState} />;
        break;
      case GAME_STATE_PLAYING:
        return <GamePlayingView changeGameState={this.changeGameState} />;
        break;
      case GAME_STATE_PAUSE:
        return <GamePauseView changeGameState={this.changeGameState} />;
        break;
      case GAME_STATE_OVER:
        return <GameOverView changeGameState={this.changeGameState} />;
        break;
    }
  }
  changeGameState = (state)=>{
    this.setState({
      gameState: state
    });
  }
}
