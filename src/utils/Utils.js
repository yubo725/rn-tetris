// 调试用工具类
export default class Utils {
  static printArr(arr, rowCount, colCount) {
    let str = '';
    for (let row = 0; row< rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        str += arr[row][col];
        str += ' ';
      }
      str += '\n';
    }
    console.log(str)
  }
}
