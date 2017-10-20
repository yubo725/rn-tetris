import React, { Component } from 'react';
import {ART, View} from 'react-native';
import ShapeFactory from './ShapeFactory';
import {CELL_HOR_COUNT, WIDTH, DIVIDER_WIDTH} from '../utils/Constants';

let shapeIndex = 0;
const shapeFactory = new ShapeFactory();
let shapeArrData = shapeFactory.getRandomShapeData();

export default class Shape extends Component {
  constructor(props) {
    super(props);
    this.initX = parseInt(CELL_HOR_COUNT / 2) - 2;
    this.initY = 5;
    this.state = {
      posX: this.initX,
      posY: this.initY
    }
  }
  getPosition() {
    return {
      posX: this.state.posX,
      posY: this.state.posY
    };
  }
  getData() {
    return shapeArrData[shapeIndex];
  }
  getNextShapeData() {
    return shapeArrData[(shapeIndex + 1) % 4];
  }
  _reset() { // 被Ground吃掉后重置
    shapeArrData = shapeFactory.getRandomShapeData();
    shapeIndex = 0;
    this.setState({
      posX: this.initX,
      posY: this.initY
    }, ()=>{
      this.autoMoveDown();
    });
  }
  generateCell(posX, posY, indexX, indexY, fill) { // 生成一个小方格，根据fill判断是否填充颜色
    const path = ART.Path();
    path.moveTo((posX + indexX) * WIDTH, (posY + indexY) * WIDTH);
    path.lineTo((posX + indexX + 1) * WIDTH, (posY + indexY) * WIDTH);
    path.lineTo((posX + indexX + 1) * WIDTH, (posY + indexY + 1) * WIDTH);
    path.lineTo((posX + indexX) * WIDTH, (posY + indexY + 1) * WIDTH);
    path.lineTo((posX + indexX) * WIDTH, (posY + indexY) * WIDTH);
    path.close();
    if (fill) {
      return <ART.Shape d={path} fill="#33CC99" stroke="#6699CC" strokeWidth={DIVIDER_WIDTH} />
    } else {
      return <ART.Shape d={path} fill="#00000000" />
    }
  }
  generateShape(shapeArr) { // 生成一个形状
    let shape = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        shape.push(this.generateCell(this.state.posX, this.state.posY, col, row, shapeArr[row][col]));
      }
    }
    return shape;
  }
  autoMoveDown() { // 自动下落
    this.moveFun = ()=>{
      if (this.props.canShapeMoveDown && this.props.canShapeMoveDown()) {
        this.setState({
          posX: this.state.posX,
          posY: 1 + this.state.posY
        });
      } else {
        // 不能下落了
        this._clearInterval();
        this.props.onShapeDieListener && this.props.onShapeDieListener(this.state.posX, this.state.posY, shapeArrData[shapeIndex]);
        // 判断是否游戏结束，结束条件是shape被吃时的posY坐标跟初始的posY坐标相同
        if (this.state.posY == this.initY) {
          // 游戏结束
          this.props.onGameOverListener && this.props.onGameOverListener();
        } else {
          // 游戏未结束
          this._reset();
        }
        return ;
      }
    }
    this.intervalId = setInterval(this.moveFun, 600);
  }
  componentWillMount() {
    this.autoMoveDown();
  }
  render() {
    return this.generateShape(shapeArrData[shapeIndex % 4]);
  }
  transform() { // 图形变形
    shapeIndex = (++shapeIndex) % 4;
  }
  moveLeft() {
    this.setState({posX: this.state.posX - 1});
  }
  moveRight() {
    this.setState({posX: this.state.posX + 1});
  }
  moveDown() {
    this.setState({posY: this.state.posY + 1});
  }
  _clearInterval() {
    this.intervalId && clearInterval(this.intervalId);
  }
  componentWillUnmount() {
    this._clearInterval();
  }
}
