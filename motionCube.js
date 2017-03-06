;(function(){

    /***@@@ 模块管理器 @@@***/

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

    require.register("testResult",function (module,exports) {

        /*依赖模块*/
        var first= require("transformTest"),
            second = require("threeDTest"),
            third = require("transitionTest");

        module.exports = first && second && third
    });

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

    require.register("matrixLibrary",function (module,exports) {

        module.exports = {
            translateAll: function (x, y, z) {
                return {
                    m11: 1,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: x,
                    m42: y ? y : 0,
                    m43: z ? z : 0,
                    m44: 1
                };
            },
            translateX: function (x) {
                return {
                    m11: 1,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: x,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            translateY: function (y) {
                return {
                    m11: 1,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: 0,
                    m42: y,
                    m43: 0,
                    m44: 1
                }
            },
            translateZ: function (z) {
                return {
                    m11: 1,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: z,
                    m44: 1
                }
            },
            scale: function (x, y, z) {
                return {
                    m11: x,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: y ? y : 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: z ? z : 1,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            scaleX: function (x) {
                return {
                    m11: x,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            scaleY: function (y) {
                return {
                    m11: 1,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: y,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            scaleZ: function (z) {
                return {
                    m11: 1,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: z,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            rotate: function (x, y, z, deg) {
                var sin = Math.sin(Math.PI / (180 / deg)),
                    cos = Math.cos(Math.PI / (180 / deg)),
                    norm = Math.sqrt(x * x + y * y + z * z);

                var nx = x / norm,
                    ny = x / norm,
                    nz = z / norm;

                return {
                    m11: nx * nx * (1 - cos) + cos,
                    m12: nx * ny * (1 - cos) + nz * sin,
                    m13: nx * nz * (1 - cos) - ny * sin,
                    m14: 0,
                    m21: nx * ny * (1 - cos) - nz * sin,
                    m22: ny * ny * (1 - cos) + cos,
                    m23: ny * nz * (1 - cos) + nx * sin,
                    m24: 0,
                    m31: nx * nz * (1 - cos) + ny * sin,
                    m32: ny * nz * (1 - cos) - nx * sin,
                    m33: nz * nz * (1 - cos) + cos,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            rotateX: function (deg) {
                var sin = Math.sin(Math.PI / (180 / deg)),
                    cos = Math.cos(Math.PI / (180 / deg));

                return {
                    m11: 1,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: cos,
                    m23: sin,
                    m24: 0,
                    m31: 0,
                    m32: -sin,
                    m33: cos,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            rotateY: function (deg) {
                var sin = Math.sin(Math.PI / (180 / deg)),
                    cos = Math.cos(Math.PI / (180 / deg));

                return {
                    m11: cos,
                    m12: 0,
                    m13: -sin,
                    m14: 0,
                    m21: 0,
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: sin,
                    m32: 0,
                    m33: cos,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            rotateZ: function (deg) {
                var sin = Math.sin(Math.PI / (180 / deg)),
                    cos = Math.cos(Math.PI / (180 / deg));

                return {
                    m11: cos,
                    m12: sin,
                    m13: 0,
                    m14: 0,
                    m21: -sin,
                    m22: cos,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            skew: function (x, y) {
                return {
                    m11: 1,
                    m12: y ? Math.tan(Math.PI / (180 / y)) : Math.tan(Math.PI / (180 / x)),
                    m13: 0,
                    m14: 0,
                    m21: Math.tan(Math.PI / (180 / x)),
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            skewX: function (x) {
                return {
                    m11: 1,
                    m12: 0,
                    m13: 0,
                    m14: 0,
                    m21: Math.tan(Math.PI / (180 / x)),
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            },
            skewY: function (y) {
                return {
                    m11: 1,
                    m12: Math.tan(Math.PI / (180 / y)),
                    m13: 0,
                    m14: 0,
                    m21: 0,
                    m22: 1,
                    m23: 0,
                    m24: 0,
                    m31: 0,
                    m32: 0,
                    m33: 1,
                    m34: 0,
                    m41: 0,
                    m42: 0,
                    m43: 0,
                    m44: 1
                }
            }
        }

    });

    require.register("matrixCombine",function (module,exports) {

        module.exports = function (m1,m2) {
            return {
                m11:m1.m11*m2.m11+m1.m21*m2.m12+m1.m31*m2.m13+m1.m41*m2.m14,
                m12:m1.m12*m2.m11+m1.m22*m2.m12+m1.m32*m2.m13+m1.m42*m2.m14,
                m13:m1.m13*m2.m11+m1.m23*m2.m12+m1.m33*m2.m13+m1.m43*m2.m14,
                m14:m1.m14*m2.m11+m1.m24*m2.m12+m1.m34*m2.m13+m1.m44*m2.m14,
                m21:m1.m11*m2.m21+m1.m21*m2.m22+m1.m31*m2.m23+m1.m41*m2.m24,
                m22:m1.m12*m2.m21+m1.m22*m2.m22+m1.m32*m2.m23+m1.m42*m2.m24,
                m23:m1.m13*m2.m21+m1.m23*m2.m22+m1.m33*m2.m23+m1.m43*m2.m24,
                m24:m1.m14*m2.m21+m1.m24*m2.m22+m1.m34*m2.m23+m1.m44*m2.m24,
                m31:m1.m11*m2.m31+m1.m21*m2.m32+m1.m31*m2.m33+m1.m41*m2.m34,
                m32:m1.m12*m2.m31+m1.m22*m2.m32+m1.m32*m2.m33+m1.m42*m2.m34,
                m33:m1.m13*m2.m31+m1.m23*m2.m32+m1.m33*m2.m33+m1.m43*m2.m34,
                m34:m1.m14*m2.m31+m1.m24*m2.m32+m1.m34*m2.m33+m1.m44*m2.m34,
                m41:m1.m11*m2.m41+m1.m21*m2.m42+m1.m31*m2.m43+m1.m41*m2.m44,
                m42:m1.m12*m2.m41+m1.m22*m2.m42+m1.m32*m2.m43+m1.m42*m2.m44,
                m43:m1.m13*m2.m41+m1.m23*m2.m42+m1.m33*m2.m43+m1.m43*m2.m44,
                m44:m1.m14*m2.m41+m1.m24*m2.m42+m1.m34*m2.m43+m1.m44*m2.m44
            }
        }
    });

    require.register("stringToMatrix",function (module,exports) {

        module.exports = function (t) {

            if(t == "none"){
                return {
                    m11:1,
                    m12:0,
                    m13:0,
                    m14:0,
                    m21:0,
                    m22:1,
                    m23:0,
                    m24:0,
                    m31:0,
                    m32:0,
                    m33:1,
                    m34:0,
                    m41:0,
                    m42:0,
                    m43:0,
                    m44:1
                }
            } else {
                var i = t.indexOf("3d")<0?7:9;
                var m = t.substring(i,t.length-1);
                m = m.split(",");
                for(var i = 0;i<m.length;i++){
                    m[i] = parseFloat(m[i])
                }
                if(m.length==6){
                    return {
                        m11:m[0],
                        m12:m[1],
                        m13:0,
                        m14:0,
                        m21:m[2],
                        m22:m[3],
                        m23:0,
                        m24:0,
                        m31:0,
                        m32:0,
                        m33:1,
                        m34:0,
                        m41:m[4],
                        m42:m[5],
                        m43:0,
                        m44:1
                    }
                } else {
                    return {
                        m11:m[0],
                        m12:m[1],
                        m13:m[2],
                        m14:m[3],
                        m21:m[4],
                        m22:m[5],
                        m23:m[6],
                        m24:m[7],
                        m31:m[8],
                        m32:m[9],
                        m33:m[10],
                        m34:m[11],
                        m41:m[12],
                        m42:m[13],
                        m43:m[14],
                        m44:m[15]
                    }
                }
            }
        }

    });

    require.register("matrixToString",function (module,exports) {

        module.exports = function (m) {
            var s = "matrix3d(";
            for(var k in m){
                s+=m[k]+","
            }
            return s.substring(0,s.length-1)+")"
        }

    });

    require.register("cubicBezier",function (module,exports) {

        module.exports = function (f) {

            if(typeof f == "string"){
                return f
            }
            return "cubic-bezier("+f[0]+","+f[1]+","+f[2]+","+f[3]+")"
        }

    });

    require.register("styleSet",function (module,exports) {

        module.exports = function (o) {
            for(var k in o){
                if(this.style[k] != o[k]){
                    this.style[k] = o[k]
                }
            }
        }

    });

    require.register("extendProperty",function (module,exports) {

        module.exports = function (target,giver) {
            for(var k in giver){
                if(!target[k]){
                    target[k] = giver[k]
                }
            }
        }

    });

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

    require.register("motion",function (module,exports) {

        /* 依赖模块 */
        var tf = require("transformTest"),
            ts = require("transitionTest"),
            tr = require("testResult"),
            endE = require("endEvent"),
            ml = require("matrixLibrary"),
            mc = require("matrixCombine"),
            mts = require("matrixToString"),
            stm = require("stringToMatrix"),
            ep = require("extendProperty"),
            eb = require("eventBank"),
            ss = require("styleSet"),
            cb = require("cubicBezier"),
            et = require("eventTools");


        /* 支持检测 */
        if(!tr){
            alert("您的浏览器版本过低，动画效果可能无法正常展现！")
        }


        function Motion(target) {

            this.el = target;

            this._init();

            return this
        }

        Motion.prototype = {

            /* 动画用于设置matrix矩阵的方法,包含transform的所有过渡效果 */
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


            /* 元素用于设置动画的方法 */
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
            move:function (d) {
                return this.trigger("move",d)
            },
            loop:function (i,d) {
                return this.trigger("loop",i,d)
            },
            stop:function (d) {
                this.trigger("stop",d)
            },
            reset:function (n) {
                return this.trigger("reset",n)
            }

        };

        ep(Motion.prototype,eb);


        Motion.prototype.addAction("initElement",function () {

            this.direction = "forward";
            this.status = "stop";
            this.endCount = 0;
            this.motionCount = 0;
            this.keyFrames = [{}];

            this.moveFrame = this.keyFrames[0];

            this.moveFrame[tf] = getComputedStyle(this.el)[tf];

        });

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

        Motion.prototype.addAction("loop",function (i,d) {

            if(this.status == "prepare"){

                this.status = "moving";

                if(i == 0){
                    this.motionCount = NaN
                } else {
                    this.motionCount = i?i*(((this.keyFrames.length-1)/2+1)*2-2):0.5*(((this.keyFrames.length-1)/2+1)*2-2)
                }

                this.endEvent = this.trigger("loopEnd").bind(this,d);


                et.add(this.el,endE,this.endEvent,false);

                this.trigger("directionTest");
                this.trigger("frameTest");
                this.trigger("frameRun");

                return this
            }

            return false
        });

        Motion.prototype.addAction("move",function (d) {

            if(this.status == "moving" || this.status == "prepare"){

                this.status = "moving";

                this.motionCount = 1;


                this.endEvent = this.trigger("moveEnd").bind(this);


                et.add(this.el,endE,this.endEvent,false);

                if(d){
                    this.direction = d
                } else {
                    this.trigger("directionTest")
                }

                this.trigger("frameTest");
                this.trigger("frameRun");
            }

            return false

        });

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
                return false
            }

        });

        Motion.prototype.addAction("frameRun",function () {

            ss.call(this.el,this.transFrame);
            ss.call(this.el,this.moveFrame)

        });

        Motion.prototype.addAction("stop",function (d) {

            et.sub(this.el,endE,this.endEvent,false);
            this.endEvent = null;

            this.el.style[ts+"Duration"] = "0ms";
            this.status = "prepare";
            ss.call(this.el,this.moveFrame);
            this.motionCount = 0;
            if(d){
                this.direction = d
            }
            return this
        });

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

        Motion.prototype.addAction("moveEnd",function () {

            return function () {
                this.endCount++;
                if(this.endCount==this.transFrame.eventCount){

                    this.motionCount = 0;
                    return this.trigger("stop")

                }
            }

        });

        Motion.prototype.addAction("loopEnd",function () {

            return function (d) {
                this.endCount++;
                if(this.transFrame.eventCount==this.endCount){
                    this.endCount = 0;
                    this.motionCount--;
                    if(this.motionCount == 0){
                        return this.trigger("stop",d)
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