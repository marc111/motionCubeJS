# motionCubeJS
  一个简单易用的CSS3动画轻量库。
## About:
  使用motionCubeJs可以快速的对元素进行简单的动画效果设置，还可以进行多个关键帧的连续动画设置和动画关键帧的管理。

## Usage:
  直接在页面引用即可
```javascript
<script src = "motionCube.js"></script>
```
## Build:
```javascript
var 'newVariable' = new Motion('element');

//使用new关键字传入一个目标元素新建一个Motion对象,即可使用motionCubeJs的api设置元素的动画效果
```
## API:
* newFrame (新建关键帧)
```javascript
/*
* @param1 {number} 动画过渡时间
* @param2 {string or array} 动画运动曲线
*/
'motionVariable'.newFrame(200,'ease') //在前一关键帧到新帧的过渡时间为200毫秒,运动曲线为'ease'
```
<br/>
* matrix (transform 矩阵类)
```javascript


'motionVariable'.newFrame(200,'ease')
                .translateAll(20,30) //在新帧中添加X轴移动20pxY轴移动30px动作
```
