;(function(){

    // 模块管理器

    function require(n) {
        var  module = require.modules[n];
        if(!module){ throw new Error("module "+n+" is not  exist!")}
        if(!module["exports"]){
            module.exports = {};
            module.define.call(module,module,module.exports);
            delete module.define
        }
        return module.exports
    }

    require.modules = {};

    require.register = function (n,fn) {
        this.modules[n] = {};
        this.modules[n].define = fn
    };


    /*
    * 浏览器是否支持transform属性和是否有前缀
    *
    * @exports {string} transform属性名称
    * */

    require.register("transformTest",function (module,exports) {

        var styles = [
            'webkitTransform',
            'MozTransform',
            'msTransform',
            'OTransform',
            'transform'
        ];

        var target = getComputedStyle(document.createElement("div"));

        var style;
        for(var i = 0;i<styles.length;i++){
            if(styles[i] in target){
                style = styles[i];
                break
            }
        }
        module.exports =  style == undefined?false:style
    });



    /*
     * 浏览器是否支持transition3d动画
     *
     * @exports {boolean} 是否支持3d
     * */

    require.register("threeDTest",function (module,exports) {

        /*依赖模块*/
        var transformTest = require("transformTest");

        var result;

        if(transformTest){
            var target = document.createElement("div");
            document.body.appendChild(target);
            target.style[transformTest] = "translate3d(1px,1px,1px)";
            var threeDTest = getComputedStyle(target)[transformTest];
            if(threeDTest!="none"){
               result = true;
            } else {
                result = false
            }
        } else {
            result = false
        }

        module.exports = result
    });



    /*
     * 浏览器是否支持transition属性和是否有前缀
     *
     * @exports {string} transition属性名称
     * */

    require.register("transitionTest",function (module,exports) {

        var styles = [
            'webkitTransition',
            'MozTransition',
            'msTransition',
            'OTransition',
            'transition'
        ];
        var target = getComputedStyle(document.createElement("div"));
        var style;
        for(var i = 0;i<styles.length;i++){
            if(styles[i] in target){
                style = styles[i];
                break
            }
        }
        module.exports = style == undefined?false:style
    });




    /*
     * 浏览器是否完全支持transition动画效果
     *
     * @exports {boolean} 是否完全支持动画
     * */
    require.register("testResult",function (module,exports) {

        /*依赖模块*/
        var first= require("transformTest"),
            second = require("threeDTest"),
            third = require("transitionTest");

        module.exports = first && second && third
    });



    /*
     * 浏览器的transitionEnd事件和前缀
     *
     * @exports {string} transitionEnd事件名称
     * */
    require.register("endEvent",function (module,exports) {

        var transitionTest = require("transitionTest");

        var events = {
            webkitTransition:"webkitTransitionEnd",
            MozTransition:"MozTransitionEnd",
            msTransition:"transitionend",
            OTransition:"OTransitionEnd",
            transition:"transitionend"
        };

        module.exports = events[transitionTest]
    });



    /*
     * transform矩阵设置函数库
     *
     * @exports {object,function} 包含矩阵设置函数的对象
     * @param {number} transform设置参数
     * @return {object} 矩阵
     * @api {private}
     * */
    require.register("matrixLibrary",function (module,exports) {

        module.exports = {
            translateAll: function (x, y, z) {
                return [1,0,0,0,0,1,0,0,0,0,1,0,x,y?y:0,z?z:0,1]
            },
            translateX: function (x) {
                return [1,0,0,0,0,1,0,0,0,0,1,0,x,0,0,1]
            },
            translateY: function (y) {
                return [1,0,0,0,0,1,0,0,0,0,1,0,0,y,0,1]
            },
            translateZ: function (z) {
                return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,z,1]
            },
            scale: function (x, y, z) {
                return [x,0,0,0,0,y?y:1,0,0,0,0,z?z:1,0,0,0,0,1]
            },
            scaleX: function (x) {
                return [x,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            },
            scaleY: function (y) {
                return [1,0,0,0,0,y,0,0,0,0,1,0,0,0,0,1]
            },
            scaleZ: function (z) {
                return [1,0,0,0,0,1,0,0,0,0,z,0,0,0,0,1]
            },
            rotate: function (x, y, z, deg) {
                var sin = Math.sin(Math.PI / (180 / deg)),
                    cos = Math.cos(Math.PI / (180 / deg)),
                    norm = Math.sqrt(x * x + y * y + z * z);

                var nx = x / norm,
                    ny = x / norm,
                    nz = z / norm;

                return [
                    nx*nx*(1-cos)+cos,nx*ny*(1-cos)+nz*sin,nx*nz*(1-cos)-ny*sin,0,
                    nx*ny*(1-cos)-nz*sin,ny*ny*(1-cos)+cos,ny*nz*(1-cos)+nx*sin,0,
                    nx*nz*(1-cos)+ ny*sin,ny*nz*(1-cos)-nx*sin,nz*nz*(1-cos)+cos,0,
                    0,0,0,1]
            },
            rotateX: function (deg) {
                var sin = Math.sin(Math.PI / (180 / deg)),
                    cos = Math.cos(Math.PI / (180 / deg));

                return [1,0,0,0,0,cos,sin,0,0,-sin,cos,0,0,0,0,1]
            },
            rotateY: function (deg) {
                var sin = Math.sin(Math.PI / (180 / deg)),
                    cos = Math.cos(Math.PI / (180 / deg));

                return [cos,0,-sin,0,0,1,0,0,sin,0,cos,0,0,0,0,1]
            },
            rotateZ: function (deg) {
                var sin = Math.sin(Math.PI / (180 / deg)),
                    cos = Math.cos(Math.PI / (180 / deg));

                return [cos,sin,0,0,-sin,cos,0,0,0,0,1,0,0,0,0,1]
            },
            skew: function (x, y) {
                return [
                    1,y?Math.tan(Math.PI/(180/y)):Math.tan(Math.PI/(180/x)),0,0,
                    Math.tan(Math.PI/(180/x)),1,0,0,
                    0,0,1,0,
                    0,0,0,1]
            },
            skewX: function (x) {
                return [1,0,0,0,Math.tan(Math.PI/(180/x)),1,0,0,0,0,1,0,0,0,0,1]
            },
            skewY: function (y) {
                return [1,Math.tan(Math.PI/(180/y)),0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            }
        }

    });



    /*
     * 两个三阶矩阵相乘的函数
     *
     * @exports {function} 矩阵组合函数
     * @ param {object} 矩阵
     * @ return {object} 矩阵
     * @ api {private}
     * */
    require.register("matrixCombine",function (module,exports) {

        module.exports = function (a1,a2) {
            return [
                a1[0]*a2[0]+a1[4]*a2[1]+a1[8]*a2[2]+a1[12]*a2[3],
                a1[1]*a2[0]+a1[5]*a2[1]+a1[9]*a2[2]+a1[13]*a2[3],
                a1[2]*a2[0]+a1[6]*a2[1]+a1[10]*a2[2]+a1[14]*a2[3],
                a1[3]*a2[0]+a1[7]*a2[1]+a1[11]*a2[2]+a1[15]*a2[3],
                a1[0]*a2[4]+a1[4]*a2[5]+a1[8]*a2[6]+a1[12]*a2[7],
                a1[1]*a2[4]+a1[5]*a2[5]+a1[9]*a2[6]+a1[13]*a2[7],
                a1[2]*a2[4]+a1[6]*a2[5]+a1[10]*a2[6]+a1[14]*a2[7],
                a1[3]*a2[4]+a1[7]*a2[5]+a1[11]*a2[6]+a1[15]*a2[7],
                a1[0]*a2[8]+a1[4]*a2[9]+a1[8]*a2[10]+a1[12]*a2[11],
                a1[1]*a2[8]+a1[5]*a2[9]+a1[9]*a2[10]+a1[13]*a2[11],
                a1[2]*a2[8]+a1[6]*a2[9]+a1[10]*a2[10]+a1[14]*a2[11],
                a1[3]*a2[8]+a1[7]*a2[9]+a1[11]*a2[10]+a1[15]*a2[11],
                a1[0]*a2[12]+a1[4]*a2[13]+a1[8]*a2[14]+a1[12]*a2[15],
                a1[1]*a2[12]+a1[5]*a2[13]+a1[9]*a2[14]+a1[13]*a2[15],
                a1[2]*a2[12]+a1[6]*a2[13]+a1[10]*a2[14]+a1[14]*a2[15],
                a1[3]*a2[12]+a1[7]*a2[13]+a1[11]*a2[14]+a1[15]*a2[15]
            ]
        }
    });



    /*
     * 字符转化矩阵函数
     *
     * @exports {function} 转化函数
     * @ param {string} transform的matrix或者matrix3d值
     * @ return {object} 矩阵
     * @ api {private}
     * */
    require.register("stringToMatrix",function (module,exports) {

        module.exports = function (t) {

            if(t == "none"){
                return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
            } else {
                var i = t.indexOf("3d")<0?7:9;
                var m = t.substring(i,t.length-1);
                m = m.split(",");
                for(var i = 0;i<m.length;i++){
                    m[i] = parseFloat(m[i])
                }
                if(m.length==6){
                    return [m[0],m[1],0,0,m[2],m[3],0,0,0,0,1,0,m[4],m[5],0,1]
                } else {
                    return [
                        m[0],m[1],m[2],m[3],
                        m[4],m[5],m[6],m[7],
                        m[8],m[9],m[10],m[11],
                        m[12],m[13],m[14],m[15]]
                }
            }
        }

    });



    /*
     * 矩阵字符转化函数
     *
     * @exports {function} 转化函数
     * @ param {object} 矩阵
     * @ return {string} transform的matrix或者matrix3d值
     * @ api {private}
     * */
    require.register("matrixToString",function (module,exports) {

        module.exports = function (m) {
            return "matrix3d("+m.join(",")+")"
        }

    });



    /*
     * 贝塞尔曲线
     *
     * @exports {function} 贝塞尔曲线函数
     * @ param {string,array} 贝塞尔曲线默认值或者曲线数组
     * @ return {string} transitionTimingFunction值
     * @ api {private}
     * */
    require.register("cubicBezier",function (module,exports) {

        module.exports = function (f) {

            if(typeof f == "string"){
                return f
            }
            return "cubic-bezier("+f.join(",")+")"
        }

    });



    /*
     * style设置函数
     *
     * @exports {function} style设置函数
     * @ param {object} 贝塞尔曲线默认值或者曲线数组
     * @ api {private}
     * */
    require.register("styleSet",function (module,exports) {

        module.exports = function (o) {
            for(var k in o){
                if(this.style[k] != o[k]){
                    this.style[k] = o[k]
                }
            }
        }

    });



    /*
     * 属性赋值函数
     *
     * @exports {function} 属性赋值函数
     * @ param {object} 传授属性的对象和被传授的对象
     * @ api {private}
     * */
    require.register("extendProperty",function (module,exports) {

        module.exports = function (target,giver) {
            for(var k in giver){
                if(!target[k]){
                    target[k] = giver[k]
                }
            }
        }

    });



    /*
     * 事件管理器
     *
     * @exports {object,function} 属性赋值函数
     * @ param {object,string,function} 设置发射器的对象,事件名称,回调函数等
     * @ api {private}
     * */
    require.register("eventBank",function (module,exports) {

        module.exports = {
            addAction:function(event,func){
                var eventBank = this._bank || (this._bank = {}),
                    bankCase = eventBank[event] || (eventBank[event] = []);
                bankCase.push(func)
            },
            trigger:function(event){
                var args = Array.prototype.slice.call(arguments,1);
                var eventBank = this._bank,bankCase;
                if(!eventBank|| !(bankCase=eventBank[event])) return;
                for(var i = 0;i<bankCase.length;i++){
                    return bankCase[i].apply(this,args)
                }
            }
        }

    });



    /*
    * 事件监听封装
    *
    * @exports {object,function} 浏览器事件监听器的封装函数
    * @param {element,string,function,boolean} 设置监听器的对象,事件名称,回调函数等
    * @ api {private}
    * */
    require.register("eventTools",function (module,exports) {
        
        var add = window.addEventListener?"addEventListener":"attachEvent",
            sub = window.removeEventListener?"removeEventListener":"detachEvent",
            header = add == "attachEvent"?"on":"";
        
        exports.add = function (el,eName,fn,catcher) {
            el[add](header+eName,fn,catcher || false)
        };

        exports.sub = function (el,eName,fn,catcher) {
            el[sub](header+eName,fn,catcher || false)
        }
        
    });



    // 主程序
    require.register("motion",function (module,exports) {

        /* 依赖模块 */
        var tf = require("transformTest"),  //transform名称
            ts = require("transitionTest"), //transition名称
            tr = require("testResult"),  //动画支持结果
            endE = require("endEvent"), //transitionEnd事件名称
            ml = require("matrixLibrary"), //transform矩阵函数库
            mc = require("matrixCombine"), //矩阵结合函数
            mts = require("matrixToString"), //矩阵转字符函数
            stm = require("stringToMatrix"), //字符转矩阵函数
            ep = require("extendProperty"), //属性复制函数
            eb = require("eventBank"), //事件管理器
            ss = require("styleSet"), //style设置函数
            cb = require("cubicBezier"), //贝塞尔曲线函数
            et = require("eventTools"); //事件监听器封装


        /* 支持检测 */
        if(!tr){
            alert("您的浏览器版本过低，动画效果可能无法正常展现！")
        }

        //motion对象构造函数
        function Motion(target) {

            this.el = target;

            this._init();

            return this
        }

        Motion.prototype = {

            //动画用于设置matrix矩阵的方法,包含transform的所有过渡效果
            translateAll:function (x,y,z) {
                return this.trigger("matrixSet","translateAll",x,y,z)
            },
            translateX:function (x) {
                return this.trigger("matrixSet","translateX",x)
            },
            translateY:function (y) {
                return this.trigger("matrixSet","translateY",y)
            },
            translateZ:function (z) {
                return this.trigger("matrixSet","translateZ",z)
            },
            scale:function (x,y,z) {
                return this.trigger("matrixSet","scale",x,y,z)
            },
            scaleX:function (x) {
                return this.trigger("matrixSet","scaleX",x)
            },
            scaleY:function (y) {
                return this.trigger("matrixSet","scaleY",y)
            },
            scaleZ:function (z) {
                return this.trigger("matrixSet","scaleZ",z)
            },
            rotate:function (x,y,z,deg) {
                return this.trigger("matrixSet","rotate",x,y,z,deg)
            },
            rotateX:function (x) {
                return this.trigger("matrixSet","rotateX",x)
            },
            rotateY:function (y) {
                return this.trigger("matrixSet","rotateY",y)
            },
            rotateZ:function (z) {
                return this.trigger("matrixSet","rotateZ",z)
            },
            skew:function (x,y) {
                return this.trigger("matrixSet","skew",x,y)
            },
            skewX:function (x) {
                return this.trigger("matrixSet","skewX",x)
            },
            skewY:function (y) {
                return this.trigger("matrixSet","skewY",y)
            },


            //motion对象api
            _init:function () {
                this.trigger("initElement")
            },
            newFrame:function (t,f) {
                return this.trigger("newFrame",t,f)
            },
            newAttribute:function (n,v) {
                return this.trigger("newAttribute",n,v)
            },
            prepare:function () {
                return this.trigger("prepare")
            },
            move:function (i,d,f) {
                return this.trigger("move",i,d,f)
            },
            loop:function (i,f) {
                return this.trigger("loop",i,f)
            },
            stop:function (f) {
                this.trigger("stop",f)
            },
            reset:function (i) {
                return this.trigger("reset",i)
            }

        };

        ep(Motion.prototype,eb);


        /*
        * motion初始化事件
        * 新建一个对象,包含动画的对象元素,关键帧储存器,还有各种状态属性设置;
        * */
        Motion.prototype.addAction("initElement",function () {

            this.direction = "forward";
            this.status = "stop";
            this.endCount = 0;
            this.motionCount = 0;
            this.keyFrames = [{}];

            this.moveFrame = this.keyFrames[0];

            this.moveFrame[tf] = getComputedStyle(this.el)[tf];

        });


        /*
         * motion新建关键帧事件
         * 给motion对象新建一个关键帧,并设置该帧与前帧之间的运动时间和运动曲线
         *
         * @ param1 {number} transitionDuration
         * @ param2 {string,array} transitionTimingFunction
         * @ api {public}
         * */
        Motion.prototype.addAction("newFrame",function (t,f) {

            if(this.status == "moving" ){
                return false
            } else {
                this.status = "setting"
            }

            var k = this.keyFrames,
                i = k.length;

            k[i] = {};
            k[i+1] = {};
            k[i][ts+"Property"] = "all";
            k[i][ts+"Duration"] = t?t+"ms" :this.el.style[ts+"Duration"] || "1000ms";
            k[i][ts+"TimingFunction"] = f?cb(f):this.el.style[ts+"TimingFunction"] || "linear";

            Object.defineProperty(k[i],"eventCount",{
                numerable:false,
                writable:true,
                value:0
            });

            if(k[i-1]){
                for(var key in k[i-1]){
                    k[i+1][key] = k[i-1][key]
                }
            }

            return this
        });



        /*
         * motion关键帧矩阵设置事件
         * 调用transform矩阵函数库,用于设置关键帧矩阵
         * 传入函数为调用的函数名称,传入函数的参数
         *
         * @ param1 {string} 矩阵函数名称
         * @ param2 {number} 传入矩阵函数的参数
         * @ api {public}
         * */
        Motion.prototype.addAction("matrixSet",function () {

            if(this.status == "setting"){
                var k = this.keyFrames,
                    i  = k.length-1,
                    n = Array.prototype.shift.call(arguments,0);

                var om = stm(k[i][tf]);
                var nm = ml[n].apply(null,arguments);

                k[i][tf] = mts(mc(om,nm));

                return this
            }
            return false

        });



        /*
         * motion关键帧其它属性设置事件
         * 设置目标元素除transform外其它属性值
         * 传入属性名称和值
         *
         * @ param1 {string} 属性名称
         * @ param2 {string} 属性值
         * @ api {public}
         * */
        Motion.prototype.addAction("newAttribute",function (n,v) {
            if(this.status == "setting"){
                var k = this.keyFrames;
                k[k.length-1][n] = v;
                for(var i =k.length-3;i>=0;i-=2){
                    if(!k[i][n]){
                        k[i][n] = ""
                    }
                }

                return this
            }
            return false
        });



        /*
         * motion动画循环播放时间
         * 让元素所以关键帧动画循环播放
         *
         * @ param1 {number} 循环次数
         * @ param2 {function} 循环完成后的回调函数
         * @ api {public}
         * */
        Motion.prototype.addAction("loop",function (i,f) {

            if(i == 0){
                this.motionCount = NaN
            } else {
                this.motionCount = i?i*(((this.keyFrames.length-1)/2+1)*2-2):0.5*(((this.keyFrames.length-1)/2+1)*2-2)
            }

            this.trigger("motionMove",f)
        });



        /*
         * motion单帧播放时间
         * 让元素只播放一个关键帧的动画
         *
         * @ param1 {number} 动画运动帧数
         * @ param1 {string} 动画运动方向
         * @ param1 {function} 动画完成或的回调函数
         * @ api {public}
         * */
        Motion.prototype.addAction("move",function (i,d,f) {

            this.motionCount = i;

            if(d && d != null){
                this.direction = d
            }

            this.trigger("motionMove",f)

        });



        /*
         * motion预备事件
         * motion对象同级所有帧之间过渡需要触发的transitionEnd事件数并且记录
         *
         * @ api {public}
         * */
        Motion.prototype.addAction("prepare",function () {
            if(this.status == "setting"){

                this.status = "prepare";

                var k = this.keyFrames;

                for(var i = 1;i<this.keyFrames.length;i+=2){
                    for(var key in k[i-1]){
                        if(k[i-1][key] != k[i+1][key]){
                            k[i].eventCount++
                        }
                    }
                }

                return this
            }
            return false
        });



        /*
         * motion方向检测事件
         * 检测动画是否需要转换播放方向并且设定方向
         *
         * @ api {private}
         * */
        Motion.prototype.addAction("directionTest",function () {

            var k = this.keyFrames,
                o = this.moveFrame,
                i = k.indexOf(o);

            if(i == 0){
                this.direction = "forward"
            } else if(i == k.length-1){
                this.direction = "backward"
            }
        });



        /*
         * motion关键帧检测事件
         * 检测动画的播放帧和过渡帧
         *
         * @ api {private}
         * */
        Motion.prototype.addAction("frameTest",function () {

            var i = this.keyFrames.indexOf(this.moveFrame);

            if(this.direction == "forward"){
                this.transFrame = this.keyFrames[i+1];
                this.moveFrame = this.keyFrames[i+2]
            } else {
                this.transFrame = this.keyFrames[i-1];
                this.moveFrame = this.keyFrames[i-2]
            }

            if(!this.moveFrame || !this.transFrame){
                this.motionCount = 0;
                return
            }

        });




        /*
         * motion帧运动时间
         * 读取motion对象的播放帧和过渡帧并且赋值给目标元素以触发动画效果
         *
         * @ api {private}
         * */
        Motion.prototype.addAction("frameRun",function () {

            ss.call(this.el,this.transFrame);
            ss.call(this.el,this.moveFrame)

        });





        /*
         * motion停止事件
         * 让动画停止播放,并且重置部分属性
         *
         * @ param {string} 动画停止后的播放方向
         * @ api {public}
         * */
        Motion.prototype.addAction("stop",function (f) {

            et.sub(this.el,endE,this.endEvent,false);
            this.endEvent = null;
            this.el.style[ts+"Duration"] = "0ms";
            this.status = "prepare";
            ss.call(this.el,this.moveFrame);
            this.motionCount = 0;
            if(f){
                f()
            }
            return this
        });




        /*
         * motion重置事件
         * 让动画停止在选定的关键帧状态,并且重置所有motion属性
         *
         * @ param {number} 动画停止的关键帧下标
         * @ api {public}
         * */
        Motion.prototype.addAction("reset",function (n) {

            et.sub(this.el,endE,this.endEvent,false);
            this.endEvent = null;

            this.el.style[ts+"Duration"] = "0ms";
            this.status = "stop";
            this.direction = "forward";
            this.motionCount = 0;

            this.keyFrames = [this.keyFrames[n*2-2] || this.moveFrame];
            this.moveFrame = this.keyFrames[0];
            this.transFrame = {};

            for( var k in this.moveFrame){
                if(this.moveFrame[k] == ""){
                    delete this.moveFrame[k]
                } else if(this.el.style[k] != this.moveFrame[k]) {
                    this.el.style[k] = this.moveFrame[k]
                }
            }

            return this
        });


        /*
        * motion移动事件
        *
        * @param {function} 回调函数
        *
        * */
        Motion.prototype.addAction("motionMove",function (f) {
            if(this.status == "prepare"){

                this.status = "moving";

                this.endEvent = this.trigger("motionEnd",f).bind(this);

                et.add(this.el,endE,this.endEvent,false);

                this.trigger("directionTest");
                this.trigger("frameTest");
                this.trigger("frameRun");
            }
        });

        /*
         * motion动画完成事件
         * 设定动画每次transitionEnd后的动作和触发回调函数
         *
         * @ param {function} 回调函数
         * @ api {private}
         * */
        Motion.prototype.addAction("motionEnd",function (f) {

            return function () {
                this.endCount++;
                if(this.transFrame.eventCount==this.endCount){
                    this.endCount = 0;
                    this.motionCount--;
                    if(this.motionCount == 0){
                        return this.trigger("stop",f)
                    } else {
                        this.trigger("directionTest");
                        this.trigger("frameTest");
                        this.trigger("frameRun");
                    }
                }
            }

        });

        module.exports = Motion

    });

    window.Motion = require("motion")
})();