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
/*使用new关键字,传入一个元素作为参数,新建一个Motion对象,即可在使用motionCubeJs的api设置元素的动画效果*/
```
## API:
* newFrame
```javascript
/*
* @param {number} 动画过渡时间
* @param {string or array} 动画运动曲线
*/
'motionElement'.newFrame(200,[0.22,1,0.22,1]);
/*在前一关键帧到新帧的过渡时间为200毫秒,运动曲线为'cubic-bezier(0.22,1,0.22,1)'*/
```
* translateAll
