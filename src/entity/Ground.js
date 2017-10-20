import React, { Component } from 'react';
import {ART} from 'react-native';
import Utils from '../utils/Utils';
import {CELL_HOR_COUNT, CELL_VER_COUNT, WIDTH, DIVIDER_WIDTH} from '../utils/Constants';

export default class Ground extends Component {
  constructor(props) {
    super(props);
    // data是CELL_VER_COUNT行CELL_HOR_COUNT列的二维数组
    let data = new Array();
    for (let row = 0; row < CELL_VER_COUNT; row++) {
      data[row] = new Array();
      for (let col = 0; col < CELL_HOR_COUNT; col++) {
        data[row][col] = 0;
      }
    }
    this.state = {
      data: data
    };
  }
  getData() {
    return this.state.data.slice(0);
  }
  eatShape(posX, posY, shapeData) { // 吃一个图形，shapeData是4x4的二维数组, posX, posY是图形的起始坐标
    let data = this.state.data.slice(0);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (shapeData[row][col] == 1) {
          data[row + posY][col + posX] = 1;
        }
      }
    }
    this.setState({data: data}, ()=>{
      this.checkLine();
    });
  }
  _isFullLine(rowIndex, arr) {
    let fullLine = true;
    for (let i = 0; i < CELL_HOR_COUNT; i++) {
      if (arr[rowIndex][i] == 0) {
        fullLine = false;
        break;
      }
    }
    return fullLine;
  }
  _moveLines(rowIndex, arr) {
    for (let row = rowIndex - 1; row >= 0; row--) {
      for (let col = 0; col < CELL_HOR_COUNT; col++) {
        arr[row + 1][col] = arr[row][col];
      }
    }
  }
  checkLine() {
    let data = this.state.data.slice(0);
    // 检查是否有成行的
    for (let row = CELL_VER_COUNT - 1; row >= 0; row--) {
      if (this._isFullLine(row, data)) {
        this._moveLines(row, data);
        row = row + 1;
      }
    }
    this.setState({data: data});
  }
  generateCell(indexX, indexY, fill) {
    const path = ART.Path();
    path.moveTo(indexX * WIDTH, indexY * WIDTH);
    path.lineTo((indexX + 1) * WIDTH, indexY * WIDTH);
    path.lineTo((indexX + 1) * WIDTH, (indexY + 1) * WIDTH);
    path.lineTo(indexX * WIDTH, (indexY + 1) * WIDTH);
    path.lineTo(indexX * WIDTH, indexY * WIDTH);
    path.close();
    if (fill) {
      return <ART.Shape d={path} fill="#E06C75" stroke="#FFFFFF" strokeWidth={DIVIDER_WIDTH} />
    } else {
      return <ART.Shape d={path} fill="#00000000" />
    }
  }
  render() {
    let ground = [];
    let data = this.state.data;
    // Utils.printArr(data, CELL_VER_COUNT, CELL_HOR_COUNT)
    for (let row = 0; row < CELL_VER_COUNT; row++) {
      for (let col = 0; col < CELL_HOR_COUNT; col++) {
        ground.push(this.generateCell(col, row, data[row][col]));
      }
    }
    return ground;
  }
}
