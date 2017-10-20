import React, { Component } from 'react';
import Shape from '../entity/Shape';
import Ground from '../entity/Ground';
import Utils from '../utils/Utils';
import {GAME_WIDTH, GAME_HEIGHT, CONTROL_HEIGHT, CELL_HOR_COUNT, CELL_VER_COUNT, SCREEN_WIDTH, CONTROL_WIDTH, GAME_STATE_OVER} from '../utils/Constants';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ART,
  TouchableOpacity,
  PixelRatio,
  StatusBar
} from 'react-native';

export default class GamePlayingView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#282C34'
          barStyle="light-content"
         />
        <View style={styles.gamePanel}>
          <ART.Surface width={GAME_WIDTH} height={GAME_HEIGHT}>
            <Ground ref="groundRef" />
            <Shape
              ref="shapeRef"
              onShapeDieListener={this.onShapeDieListener}
              onGameOverListener={this.onGameOverListener}
              canShapeMoveDown={this.canShapeMoveDown} />
          </ART.Surface>
        </View>
        <View style={styles.controlView}>
          <TouchableOpacity onPress={this.leftMove} style={[{height: CONTROL_HEIGHT}, styles.controlCellBorder]}>
            <Text style={styles.btnText}>Left</Text>
          </TouchableOpacity>
          <View style={styles.controlCenterView}>
            <TouchableOpacity onPress={this.transformMove} style={[styles.controlCellBorder, {height: CONTROL_HEIGHT / 2 - 10}]}>
              <Text style={styles.btnText}>Transform</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.downMove} style={[styles.controlCellBorder, {marginTop: 10, height: CONTROL_HEIGHT / 2 - 10}]}>
              <Text style={styles.btnText}>Down</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.rightMove} style={[{height: CONTROL_HEIGHT}, styles.controlCellBorder]}>
            <Text style={styles.btnText}>Right</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  canShapeMoveDown = ()=> {
    // 判断shape是否能下落
    let canMoveDown = true;
    let shapeData = this.refs.shapeRef.getData();
    let groundData = this.refs.groundRef.getData();
    let shapePos = this.refs.shapeRef.getPosition();
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        if (shapeData[row][col] == 1) {
          // 落下到底了，不能继续下落
          if (shapePos.posY + row + 1 >= CELL_VER_COUNT) {
            canMoveDown = false;
            break;
          }
          // 落下跟Ground冲突了
          if (groundData[row + shapePos.posY + 1][col + shapePos.posX] == 1) {
            canMoveDown = false;
            break;
          }
        }
      }
    }
    return canMoveDown;
  }
  enableMoveLeft() { // 判断shape是否可以左移
    let canMoveLeft = true;
    let shapeData = this.refs.shapeRef.getData();
    let shapePos = this.refs.shapeRef.getPosition();
    let groundData = this.refs.groundRef.getData();
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        if (shapeData[row][col] == 1) {
          // 左移超出游戏区域左边界
          if (shapePos.posX + col - 1 < 0) {
            canMoveLeft = false;
            break;
          }
          // 左移跟Ground区域冲突
          if (groundData[row + shapePos.posY][shapePos.posX + col - 1] == 1) {
            canMoveLeft = false;
            break;
          }
        }
      }
    }
    return canMoveLeft;
  }
  enableMoveRight() { // 判断shape是否可以右移
    let canMoveRight = true;
    let shapeData = this.refs.shapeRef.getData();
    let shapePos = this.refs.shapeRef.getPosition();
    let groundData = this.refs.groundRef.getData();
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        if (shapeData[row][col] == 1) {
          // 右超出游戏区域右边界
          if (shapePos.posX + col + 1 >= CELL_HOR_COUNT) {
            canMoveRight = false;
            break;
          }
          // 右移跟Ground区域冲突
          if (groundData[row + shapePos.posY][shapePos.posX + col + 1] == 1) {
            canMoveRight = false;
            break;
          }
        }
      }
    }
    return canMoveRight;
  }
  enableTransform() { // 判断shape是否可以变形
    let canTransform = true;
    let shapeData = this.refs.shapeRef.getNextShapeData();
    let groundData = this.refs.groundRef.getData();
    let shapePos = this.refs.shapeRef.getPosition();
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        if (shapeData[row][col] == 1) {
          // 变形后超出左右下边界
          if ((shapePos.posX + col >= CELL_HOR_COUNT|| shapePos.posX + col < 0)
              || shapePos.posY + row + 1 >= CELL_VER_COUNT) {
            canTransform = false;
            break;
          }
          // 变形后跟ground冲突
          if (groundData[row + shapePos.posY][col + shapePos.posX]) {
            canTransform = false;
            break;
          }
        }
      }
    }
    return canTransform;
  }
  onShapeDieListener = (x, y, data)=>{ // shape死亡的回调
    this.refs.groundRef.eatShape(x, y, data);
  }
  onGameOverListener = ()=>{
    this.props.changeGameState && this.props.changeGameState(GAME_STATE_OVER);
  }
  downMove = ()=>{
    if (!this.canShapeMoveDown()) {
      return;
    }
    this.refs.shapeRef.moveDown();
  }
  leftMove = ()=>{
    if (!this.enableMoveLeft()) {
      return;
    }
    this.refs.shapeRef.moveLeft();
  }
  transformMove = ()=>{
    if (!this.enableTransform()) {
      return;
    }
    this.refs.shapeRef.transform();
  }
  rightMove= ()=>{
    if (!this.enableMoveRight()) {
      return;
    }
    this.refs.shapeRef.moveRight();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#282C34',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gamePanel: {
    width: GAME_WIDTH + 2,
    height: GAME_HEIGHT + 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  controlView: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  controlCellBorder: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: CONTROL_WIDTH
  },
  controlCenterView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  btn: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white'
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
});
