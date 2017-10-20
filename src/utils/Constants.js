import { Dimensions, PixelRatio } from 'react-native';

// 屏幕尺寸
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const DIVIDER_WIDTH = 1 / PixelRatio.get();

// 游戏状态
const GAME_STATE_NOT_START = 0; // 未开始
const GAME_STATE_PLAYING = 1; // 正在游戏
const GAME_STATE_PAUSE = 2; // 暂停
const GAME_STATE_OVER = 3; // 游戏结束

// 一个小方格的宽度
const WIDTH = 20;
// 一个图形的宽度
const SHAPE_WIDTH = WIDTH * 4;
// 游戏区域的宽高对应的格子数
const CELL_HOR_COUNT = parseInt(width / WIDTH) - 5;
const CELL_VER_COUNT = parseInt(height / WIDTH) - 8;
// 游戏区域的宽高值
const GAME_WIDTH = CELL_HOR_COUNT * WIDTH;
const GAME_HEIGHT = CELL_VER_COUNT * WIDTH;
// 游戏控制区域的尺寸
const CONTROL_HEIGHT = SCREEN_HEIGHT - GAME_HEIGHT - 50;
const CONTROL_WIDTH = SCREEN_WIDTH / 3 - 30;

export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  DIVIDER_WIDTH,
  GAME_STATE_NOT_START,
  GAME_STATE_PLAYING,
  GAME_STATE_PAUSE,
  GAME_STATE_OVER,
  WIDTH,
  SHAPE_WIDTH,
  CELL_HOR_COUNT,
  CELL_VER_COUNT,
  GAME_WIDTH,
  GAME_HEIGHT,
  CONTROL_WIDTH,
  CONTROL_HEIGHT
}
