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
<br/>
'motionVariable'.newFrame(200,'ease') //在前一关键帧到新帧的过渡时间为200毫秒,运动曲线为'ease'
```
.....<br/>
* matrix (transform 矩阵类)
```javascript
/*
* translateAll
* @param1 {number} 元素X轴位移值
* @param2 {number} 元素Y轴位移值
* @param3 {number} 元素Z轴位移值
*/

'motionVariable'.newFrame(200,'ease')
                .translateAll(20,30) //在新帧中添加X轴移动20pxY轴移动30px动作
/*
* rotateZ
* @param1 {number} 元素Z轴旋转角度
*/

'motionVariable'.newFrame(200,'ease')
                .translateAll(20,30)
                .rotateZ(45) //添加Z轴上旋转45度动作
                
                
                
//还有更多matrix类api查看......
```
.....<br/>
* newAttribute 设置自定义动画属性
```javascript
'motionVariable'.newFrame(200,'ease')
                .translateAll(20,30)
                .rotateZ(45) 
                .newAttribute("opacity","0.5")//添加透明度变为0.5的动作
```
.....<br/>
* prepare 触发动画前准备
```javascript
'motionVariable'.newFrame(200,'ease')
                .translateAll(20,30)
                .rotateZ(45)
                .prepare() //动画触发前准备
```
.....<br/>
* move 播放动画
```javascript
/* 
* @param1 {number} 播放帧数
* @param2 {string} 关键帧运动方向
* @param3 {function} 回调函数
*/

'motionVariable'.move(2,'forward') //播放2帧动画
```
.....<br/>
* loop 动画循环播放
```javascript
/* 
* @param1 {number} 动画循环次数
* @param2 {function} 回调函数
*/

'motionVariable'.loop(3,function(){console.log('done!')}) //运行所有关键帧的动画并循环3次,打印'done!'
```
.....<br/>
* stop
```javascript
/* 
* @param1 {function} 回调函数
*/

'motionVariable'.stop() //
```
.....<br/>
* reset
```javascript
/* 
* @param1 {number} 动画停止的关键帧下标值
*/

'motionVariable'.reset('2') //停止在第二帧并且重置所有参数
```

## cubic-bezier 
关键帧的运动曲线采用的是transition-timing-function的值,默认值有以下几个:<br/>
<br/>
'linear'<br/>
'ease'<br/>
'ease-in'<br/>
'ease-out'<br/>
'ease-in-out'<br/>
<br/>
当然也可以使用贝塞尔曲线值来设置,预览其它贝塞尔曲线效果,可以浏览下面的连接:<br/>
http://cubic-bezier.com/

## compatibility
* 2d动画兼容:<br/>
IE 10.0+<br/>
chrome 4.0+<br/>
firefox 4.0+<br/>
safari 3.1+<br/>
opera 10.5+<br/>
.....<br/>
* 3d动画兼容:<br/>
IE 10.0+<br/>
chrome 12.0+<br/>
firefox 10.0+<br/>
safari 4.0+<br/>
opera 15.0+<br/>

## document
