
//Added 10-24-17
var bannerOverExit;
var dealer_locator_model;
var bgZip;
var origZip;

//Added 12-14-17
var replayColor;
var brandBorders;

var __extends = this.__extends || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};

"function" != typeof Object.assign && !function() {
    Object.assign = function(n) {
        "use strict";
        if (void 0 === n || null === n) throw new TypeError("Cannot convert undefined or null to object");
        for (var t = Object(n), r = 1; r < arguments.length; r++) {
            var e = arguments[r];
            if (void 0 !== e && null !== e) for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
        }
        return t;
    };
}();

window.$ = window.jQuery || function(e, t, l) {
    try {
        var n = {
            "#": "getElementById",
            ".": "getElementsByClassName",
            "@": "getElementsByName",
            "=": "getElementsByTagName",
            "*": "querySelectorAll"
        }[e[0]], m = (t === l ? document : t)[n](e.slice(1));
        !m.length ? m[0] = m : null;
        return !m.length ? m : m.length < 2 ? m[0] : [].slice.call(m);
    } catch (er) {
        return document.querySelectorAll(e);
    }
};

if ("document" in self) {
    if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
        (function(t) {
            "use strict";
            if (!("Element" in t)) return;
            var e = "classList", i = "prototype", n = t.Element[i], s = Object, r = String[i].trim || function() {
                return this.replace(/^\s+|\s+$/g, "");
            }, a = Array[i].indexOf || function(t) {
                var e = 0, i = this.length;
                for (;e < i; e++) {
                    if (e in this && this[e] === t) {
                        return e;
                    }
                }
                return -1;
            }, o = function(t, e) {
                this.name = t;
                this.code = DOMException[t];
                this.message = e;
            }, l = function(t, e) {
                if (e === "") {
                    throw new o("SYNTAX_ERR", "An invalid or illegal string was specified");
                }
                if (/\s/.test(e)) {
                    throw new o("INVALID_CHARACTER_ERR", "String contains an invalid character");
                }
                return a.call(t, e);
            }, c = function(t) {
                var e = r.call(t.getAttribute("class") || ""), i = e ? e.split(/\s+/) : [], n = 0, s = i.length;
                for (;n < s; n++) {
                    this.push(i[n]);
                }
                this._updateClassName = function() {
                    t.setAttribute("class", this.toString());
                };
            }, u = c[i] = [], f = function() {
                return new c(this);
            };
            o[i] = Error[i];
            u.item = function(t) {
                return this[t] || null;
            };
            u.contains = function(t) {
                t += "";
                return l(this, t) !== -1;
            };
            u.add = function() {
                var t = arguments, e = 0, i = t.length, n, s = false;
                do {
                    n = t[e] + "";
                    if (l(this, n) === -1) {
                        this.push(n);
                        s = true;
                    }
                } while (++e < i);
                if (s) {
                    this._updateClassName();
                }
            };
            u.remove = function() {
                var t = arguments, e = 0, i = t.length, n, s = false, r;
                do {
                    n = t[e] + "";
                    r = l(this, n);
                    while (r !== -1) {
                        this.splice(r, 1);
                        s = true;
                        r = l(this, n);
                    }
                } while (++e < i);
                if (s) {
                    this._updateClassName();
                }
            };
            u.toggle = function(t, e) {
                t += "";
                var i = this.contains(t), n = i ? e !== true && "remove" : e !== false && "add";
                if (n) {
                    this[n](t);
                }
                if (e === true || e === false) {
                    return e;
                } else {
                    return !i;
                }
            };
            u.toString = function() {
                return this.join(" ");
            };
            if (s.defineProperty) {
                var h = {
                    get: f,
                    enumerable: true,
                    configurable: true
                };
                try {
                    s.defineProperty(n, e, h);
                } catch (d) {
                    if (d.number === -2146823252) {
                        h.enumerable = false;
                        s.defineProperty(n, e, h);
                    }
                }
            } else if (s[i].__defineGetter__) {
                n.__defineGetter__(e, f);
            }
        })(self);
    } else {
        (function() {
            "use strict";
            var t = document.createElement("_");
            t.classList.add("c1", "c2");
            if (!t.classList.contains("c2")) {
                var e = function(t) {
                    var e = DOMTokenList.prototype[t];
                    DOMTokenList.prototype[t] = function(t) {
                        var i, n = arguments.length;
                        for (i = 0; i < n; i++) {
                            t = arguments[i];
                            e.call(this, t);
                        }
                    };
                };
                e("add");
                e("remove");
            }
            t.classList.toggle("c3", false);
            if (t.classList.contains("c3")) {
                var i = DOMTokenList.prototype.toggle;
                DOMTokenList.prototype.toggle = function(t, e) {
                    if (1 in arguments && !this.contains(t) === !e) {
                        return e;
                    } else {
                        return i.call(this, t);
                    }
                };
            }
            t = null;
        })();
    }
}

Element.prototype.hide = function() {
    this.classList.add("hide");
};

Element.prototype.show = function() {
    this.classList.remove("hide");
};

Element.prototype.addEvent = function(event, callback) {
    this.addEventListener(event, callback.bind(temple.banner));
};

Element.prototype.find = function(selector) {
    return $(selector, this);
};

NodeList.prototype.each = Array.prototype.forEach;

Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false,
    value: function() {
        var i = this.length;
        while (i) {
            var j = Math.floor(Math.random() * i);
            var t = this[--i];
            this[i] = this[j];
            this[j] = t;
        }
        return this;
    }
});

String.prototype.timeFormat = function() {
    var sn = parseInt(this, 10);
    var h = Math.floor(sn / 3600);
    var m = Math.floor((sn - h * 3600) / 60);
    var s = sn - h * 3600 - m * 60;
    if (m < 10) {
        m = m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    var t = (m || 0) + ":" + (s || "00");
    return t;
};

String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Function.prototype.delay = function(a) {
    var b = [].slice.call(arguments, 1), c = this;
    return setTimeout(function() {
        c.apply(void 0, b);
    }, 1e3 * a);
};

var temple = new Temple(typeof temple != "undefined" ? temple.config : null);

window.addEventListener("load", temple.create.bind(temple));

function Temple(config) {
    this.type = "Standalone";
    this.version = "2.0.6", this.color = "#ff0088", this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), 
    this.isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent), this.isiOS9up = this.isiOS && navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1] > 9, 
    this.isiPad = /iPad/.test(navigator.userAgent), this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), 
    this.core = {}, this.config = config, this.platforms = {}, this.templates = {}, 
    this.modules = {};
    this.isLive = function() {
        if (!this.config) return window.location.hostname != "localhost";
        if (!this.config.localhost) return window.location.hostname != "localhost";
        var live = window.location.hostname != "localhost";
        for (var i = 0; i < this.config.localhost.length; i++) {
            if (window.location.hostname == this.config.localhost[i]) {
                return false;
            }
        }
        return live;
    }();
    this.isAutoplayAvailable = function() {
        if (!this.isMobile) return true;
        if (!this.isiOS) {
            return true;
        } else if (this.isSafari) {
            if (this.isiPad) var os = Number(navigator.userAgent.split("iPad")[1].split(" ")[3].replace("_", ".")); else var os = navigator.userAgent.split("iPhone OS ")[1].split(" ")[0].split("_")[0];
            if (os >= 10) return true; else return false;
        } else {
            return false;
        }
    };
    this.utils = function() {
        var tracker = function(t) {
            temple.utils.debug("Tracker: " + t, "green");
        };
        var getQueryVar = function(v) {
            var q = window.location.search.substring(1);
            var vs = q.split("&");
            for (var i = 0; i < vs.length; i++) {
                var p = vs[i].split("=");
                if (p[0] == v) {
                    return p[1];
                }
            }
            return false;
        };
        var loadScript = function(u, c, e) {
            if (typeof u == "string") u = [ u ];
            t = 0;
            if (!u.length) {
                c();
                return;
            }
            var loader = function(sc) {
                var s = document.createElement("script");
                s.async = true;
                s.type = "text/javascript", s.readyState ? s.onreadystatechange = function() {
                    ("loaded" == s.readyState || "complete" == s.readyState) && (s.onreadystatechange = null, 
                    c && c());
                } : (s.onload = function(e) {
                    t++;
                    t == u.length ? c && c(e) : loader(u[t]);
                }, s.onerror = function() {
                    temple.utils.debug('ERROR LOADING SCRIPT "' + u + '"'), e && e();
                }), s.src = sc, document.body.appendChild(s);
            };
            loader(u[0]);
        };
        var loadJSON = function(u, c, e, nt) {
            if (typeof u == "string") u = [ u ];
            var t = 0;
            var comp = c;
            var obs = [];
            c = function(o) {
                t++;
                obs.push(o);
                if (t == u.length) {
                    if (obs.length == 1) obs = obs[0];
                    comp.call(temple.banner, obs);
                }
            };
            var xobj = [];
            for (var i = 0; i < u.length; i++) {
                xobj[i] = new XMLHttpRequest();
                xobj[i].overrideMimeType("application/json");
                xobj[i].open("GET", u[i], !0);
                xobj[i].onreadystatechange = function(e) {
                    x = e.currentTarget;
                    4 == x.readyState && "404" == x.status && (temple.utils.debug("No json found", "#ff0000"), 
                    e && e.call(temple.banner)), 4 == x.readyState && "200" == x.status && c && c(nt === true ? x.responseText : JSON.parse(x.responseText));
                }, xobj[i].send(null);
            }
            if (!u.length) comp.call(temple.banner);
        };
        var loadImage = function(u, c, e) {
            if (typeof u == "string") u = [ u ];
            var t = 0;
            var imgs = [];
            for (var i = 0; i < u.length; i++) {
                var im = new Image();
                im.onload = function(e) {
                    imgs.push(this);
                    t++;
                    if (t == u.length) c && c(imgs, e);
                };
                im.onerror = e;
                im.src = u[i];
            }
        };
        var createStyle = function(n, r) {
            n = n != "banner" ? "#banner " + n : n;
            if (!temple.stylesheet) {
                temple.stylesheet = document.createElement("style"), temple.stylesheet.type = "text/css";
                var head = document.getElementsByTagName("head")[0];
                head.insertBefore(temple.stylesheet, head.firstChild);
            }
            (temple.stylesheet.sheet || {}).insertRule ? temple.stylesheet.sheet.insertRule(n + "{" + r + "}", 0) : (temple.stylesheet.styleSheet || temple.stylesheet.sheet).addRule(n, r);
        };
        var debug = function(e, c, v) {
            if (console.debug && (!temple.isLive || temple.config.debug === true)) {
                console.debug("%c[" + temple.type + "]%s", "font-weight:bold;color:" + (typeof c == "string" ? c : temple.color) + ";", " " + (v || temple.version), ":", e || "", typeof c != "string" && typeof c != "undefined" ? c : "");
            }
        };
        var fitText = function(t) {
            TweenMax.set(t, {
                clearProps: "fontSize, lineHeight"
            });
            var p = t.parentElement;
            var s = Number(window.getComputedStyle(p, null).getPropertyValue("font-size").replace("px", ""));
            if (t.offsetHeight > p.offsetHeight || t.offsetWidth > p.offsetWidth) {
                while (t.offsetHeight > p.offsetHeight || t.offsetWidth > p.offsetWidth) {
                    s -= .2;
                    t.style.fontSize = s + "px";
                    t.style.lineHeight = s + 1 + "px";
                }
            }
        };
        var findElements = function(e, styles) {
            if (styles) {
                var obj = {};
                obj.all = [];
                findElement(e, styles);
            } else {
                var obj = [];
                findElement(e);
            }
            function findElement(e, styles) {
                if (e && e.childNodes && e.childNodes.length > 0) {
                    for (var i = 0; i < e.childNodes.length; i++) {
                        var child = e.childNodes[i];
                        if (child.type == "image/svg+xml" || [ "DIV", "SPAN", "IMG", "CANVAS", "SVG", "CIRCLE", "PATH" ].indexOf(child.nodeName.toUpperCase()) != -1) {
                            if (child.id || child.className) {
                                if (styles) {
                                    styles = typeof styles == "string" ? [ styles ] : styles;
                                    for (var j = 0; j < styles.length; j++) {
                                        if (!obj[styles[j]]) {
                                            obj[styles[j]] = [];
                                        }
                                        if (child.id && obj[styles[j]].indexOf(child) == -1) {
                                            var val = getStyleRuleValue("." + styles[j], "#" + child.id);
                                            if (val) {
                                                obj[styles[j]].push(child);
                                            }
                                        }
                                        var c = typeof child.className == "object" ? String(child.className.baseVal).split(" ") : String(child.className).split(" ");
                                        for (var k = 0; k < c.length; k++) {
                                            if (c[k] && obj[styles[j]].indexOf(child) == -1) {
                                                var val = getStyleRuleValue("." + styles[j], "." + c[k]);
                                                if (val) {
                                                    obj[styles[j]].push(child);
                                                }
                                            }
                                        }
                                    }
                                    obj.all.push(child);
                                    findElement(child, styles);
                                } else {
                                    obj.push(child);
                                    findElement(child);
                                }
                            }
                        }
                    }
                }
            }
            function getStyleRuleValue(style, selector, sheet) {
                var sheets = typeof sheet !== "undefined" ? [ sheet ] : document.styleSheets;
                var ar = [];
                for (var i = 0, l = sheets.length; i < l; i++) {
                    var sheet = sheets[i];
                    if (!sheet.cssRules) continue;
                    for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
                        var rule = sheet.cssRules[j];
                        if (rule.selectorText) {
                            if (rule.selectorText.indexOf(selector) != -1 && rule.selectorText.indexOf(style) != -1) {
                                var all = rule.selectorText.substring(0, rule.selectorText.indexOf(style)).split(".");
                                var node = all[all.length - 1];
                                return node;
                            }
                        }
                    }
                }
                return;
            }
            return obj;
        };
        return {
            tracker: function(v, e) {
                return tracker(v, e);
            },
            getQueryVar: function(v) {
                return getQueryVar(v);
            },
            loadScript: function(u, c, e) {
                loadScript(u, c, e);
            },
            loadJSON: function(u, c, e, nt) {
                loadJSON(u, c, e, nt);
            },
            loadImage: function(u, c, e) {
                loadImage(u, c, e);
            },
            debug: function(e, c, v) {
                debug(e, c, v);
            },
            createStyle: function(n, r) {
                createStyle(n, r);
            },
            fitText: function(t) {
                fitText(t);
            },
            findElements: function(e, styles) {
                return findElements(e, styles);
            }
        };
    }();
    this.create = function() {
        var config = document.body.getAttribute("data-config") || "config.json";
        config = config.replace(".json", "");
        config = temple.utils.getQueryVar("c") && !this.isLive ? config + "_" + temple.utils.getQueryVar("c").replace("config_", "") + ".json" : config + ".json";
        if (temple.config) config = [];
        temple.utils.loadJSON(config, function(json) {
            this.config = json || temple.config;
            this.config.platform = this.config.platform || "";
            var scripts = [];
            var templePath = document.querySelector("[temple]");
            if (templePath) {
                templePath = templePath.getAttribute("src");
                if (templePath.indexOf("../") > -1) {
                    this.config.scriptPath = templePath.replace("/Temple.js", "/");
                }
            }
            this.config.scriptPath = this.config.scriptPath || "https://s3-us-west-1.amazonaws.com/templeframework/temple_" + temple.version + "/";
            if (this.config.platform.length) {
                if (this.config.platform.indexOf(".js") > -1) {
                    scripts.push(this.config.platform);
                } else {
                    scripts.push(this.config.scriptPath + "platforms/" + this.config.platform + "/Platform.js");
                }
            }
            if (!this.config.build_md5) {
                var template = this.config.scriptPath + "templates/StandardBanner.js";
                if (this.config.template) {
                    if (this.config.template.length) {
                        template = this.config.template;
                    }
                }
                scripts.push(template);
            }
            var m = this.config.modules || [];
            if (m.length) {
                for (var i = 0; i < m.length; i++) {
                    if (m[i].indexOf(".js") == -1) m[i] = this.config.scriptPath + "modules/" + m[i] + ".js";
                    scripts.push(m[i]);
                }
            }
            if (this.config.require) {
                scripts = scripts.concat(this.config.require);
            }
            if (!this.config.build_md5) {
                try {
                    var main = document.querySelector("meta[name='main']").getAttribute("content");
                    if (main.length) scripts.push(main);
                } catch (e) {
                    scripts.push("./js/main.js");
                }
            }
            temple.utils.loadScript(scripts, function(e) {
                if (temple.Banner) temple.banner = new temple.Banner();
            }.bind(this));
        }.bind(this));
    };
    this.events = {
        READY: "ready",
        SHOW: "show",
        CORE_READY: "core_ready",
        MODULE_READY: "module_ready",
        EXIT: "exit"
    };
}

temple.core.EventDispatcher = function() {
    function EventDispatcher() {}
    EventDispatcher.prototype.dispatchEvent = function(event, args) {
        if (!arguments[1]) arguments[1] = this;
        this._events = this._events || [];
        if (this._events[event]) {
            var listeners = this._events[event], len = listeners.length;
            while (len--) {
                temple.utils.debug("Event <" + event + "> " + (arguments[1].target ? arguments[1].target.constructor.name : arguments[1].constructor.name), "black");
                if (!args) args = {};
                if (!args.target) args.target = this;
                if (!listeners[len]._one) {
                    var f = listeners.splice(len, 1);
                    f[0](args);
                } else {
                    listeners[len](args);
                }
            }
            return true;
        }
        return false;
    };
    EventDispatcher.prototype.addEventListener = function(event, callback, _one) {
        callback._one = _one != undefined ? _one : true;
        this._events = this._events || [];
        this._events[event] = this._events[event] || [];
        if (this._events[event]) {
            this._events[event].push(callback);
        }
    };
    EventDispatcher.prototype.removeEventListener = function(event) {
        if (this._events[event]) {
            delete this._events[event];
        }
    };
    return EventDispatcher;
}();

temple.core.Module = function(_super) {
    __extends(Module, _super);
    function Module() {}
    Module.prototype._moduleReady = function() {
        temple.utils.debug("Module << " + this.constructor.name + " >>", this.color || "Tomato");
        this.dispatchEvent(temple.events.MODULE_READY);
    };
    Module.prototype.done = function() {
        setTimeout(this._moduleReady.bind(this), 50);
    };
    return Module;
}(temple.core.EventDispatcher);

temple.core.Core = function(_super) {
    __extends(Core, _super);
    function Core() {
        this._initCore();
    }
    Core.prototype.exit = function(url) {
        window.open(url || this.defaultExitURL, "_blank");
        this.dispatchEvent(temple.events.EXIT);
    };
    Core.prototype.chain = function(e) {
        try {
            e.prototype;
        } catch (err) {
            console.error("Module not loaded. Please add it to your config.");
            console.error("Available modules > ", temple.modules);
            return;
        }
        if (!this._chained) {
            this._chained = [];
            this._chained.push({
                m: e,
                a: arguments[1],
                c: arguments[2]
            });
            setTimeout(this._runChain.bind(this), 1);
        } else {
            this._chained.push({
                m: e,
                a: arguments[1],
                c: arguments[2]
            });
        }
        return this;
    };
    Core.prototype._politeLoads = function(c) {
        var loads = document.querySelectorAll("[multilingual], [polite]"), svgs = document.querySelectorAll("[svg]"), t = 0, t2 = 0, _s = [];
        function onload(e, img) {
            if (loads[t].nodeName == "DIV") {
                loads[t].style.backgroundImage = "url('" + loads[t].ml + loads[t].getAttribute("data-src") + "')";
                loads[t].style.width = img.width + "px";
                loads[t].style.height = img.height + "px";
            }
            t++;
            if (t + t2 == loads.length + svgs.length) if (c) setTimeout(c.call(this), 10);
        }
        for (var i = 0; i < loads.length; i++) {
            loads[i].ml = loads[i].hasAttribute("multilingual") || "";
            if (loads[i].ml === true) loads[i].ml = "img/" + this.config.language + "/";
            if (loads[i].nodeName == "DIV") {
                temple.utils.loadImage(loads[i].ml + loads[i].getAttribute("data-src"), onload.bind(this));
            } else {
                loads[i].onload = onload.bind(this, loads[i]);
                loads[i].src = loads[i].ml + loads[i].getAttribute("data-src");
            }
        }
        for (i = 0; i < svgs.length; i++) {
            _s[i] = {
                xhr: new XMLHttpRequest(),
                el: svgs[i]
            };
            _s[i].xhr.id = i;
            _s[i].xhr.onload = function(e) {
                var r = e.currentTarget.responseXML.documentElement;
                r.setAttribute("class", _s[e.currentTarget.id].el.getAttribute("class"));
                var id = _s[e.currentTarget.id].el.getAttribute("id");
                r.setAttribute("id", id);
                _s[e.currentTarget.id].el.parentNode.replaceChild(r, _s[e.currentTarget.id].el);
                window[id] = r;
                t2++;
                if (t + t2 == loads.length + svgs.length) if (c) setTimeout(c.call(this), 10);
            }.bind(this);
            _s[i].xhr.open("GET", svgs[i].getAttribute("data-src"), !0);
            _s[i].xhr.overrideMimeType("image/svg+xml");
            _s[i].xhr.send("");
        }
        if (!loads.length && !svgs.length) if (c) setTimeout(c.call(this), 10);
    };
    Core.prototype._initCore = function() {
        this.config = temple.config;
        temple.utils.debug(temple.type + " Platform");
        this._pageReady();
    };
    Core.prototype._pageReady = function() {
        this._bannerInit();
    };
    Core.prototype._bannerInit = function() {
        temple.utils.createStyle("#banner", "position:relative;overflow:hidden;background-color:#000;color:#fff;width:" + (temple.config.size.width ? temple.config.size.width + "px;height:" : "auto;height:") + (temple.config.size.height ? temple.config.size.height + "px;" : "auto;"));
        temple.utils.createStyle(".bannerClick", "position:absolute;top:0;left:0;width:100%;height:100%;cursor:pointer;background:url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);");
        this.dispatchEvent(temple.events.CORE_READY);
    };
    Core.prototype._chainLoaded = function(e) {
        if (this._chained[0].c) this._chained[0].c.call(this);
        this._chained.splice(0, 1);
        this._runChain();
    };
    Core.prototype.async = function() {
        arguments.callee.caller.async = true;
        return function() {
            this._chainLoaded();
        }.bind(this);
    };
    Core.prototype._runChain = function(e) {
        if (!this._chained[0]) return;
        if (this._chained[0].m.prototype.__proto__.constructor != temple.core.Module) {
            this._chained[0].m.call(this, this._chained[0].a);
            if (!this._chained[0].m.async) this._chainLoaded();
            return;
        }
        var name = this._chained[0].m.name || this._chained[0].m.toString().match(/^function\s*([^\s(]+)/)[1];
        var moduleName = name.charAt(0).toLowerCase() + name.slice(1);
        var listName = moduleName;
        this[listName + "List"] = this[listName + "List"] || [];
        if (this[moduleName]) {
            var t = 2;
            var tempName = moduleName;
            tempName = moduleName + t;
            while (this[tempName]) {
                t++;
                tempName = moduleName + t;
            }
            moduleName = tempName;
        }
        this[moduleName] = new this._chained[0].m(this._chained[0].a || this, this, t || 0);
        this[moduleName].addEventListener(temple.events.MODULE_READY, this._chainLoaded.bind(this));
        this[listName + "List"].push(this[moduleName]);
    };
    return Core;
}(temple.core.EventDispatcher);

temple.platforms.doubleclick = {};

temple.platforms.doubleclick.Platform = function(_super) {
    __extends(Platform, _super);
    function Platform() {
        this.version = "1.0.3";
        this.defaultExitURL = "";
        this.exitURLs = [ "" ];
        temple.color = "#338e43";
        temple.type = "DoubleClick";
        temple.utils.tracker = this._tracker;
        this._platform = {
            _closeOverlay: function() {
                Enabler.close();
            }
        };
        if (typeof Enabler == "undefined") {
            temple.utils.loadScript("https://s0.2mdn.net/ads/studio/Enabler.js", this._initCore.bind(this));
        } else {
            this._initCore();
        }
    }
    Platform.prototype.setVideoTracking = function(player) {
        if (!studio.video) {
            Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
                this.setVideoTracking(player);
            }.bind(this));
            return;
        }
        if (player.playHistory) {
            studio.video.Reporter.detach(player.playHistory[player.playHistory.length - 1].id);
            studio.video.Reporter.attach(player.currentVideo.id, player._video);
        } else {
            studio.video.Reporter.attach(player.currentVideo.id, player._video);
        }
    };
    Platform.prototype.exit = function(url) {
        this.dispatchEvent(temple.events.EXIT, url || this.defaultExitURL);
        Enabler.exit("Default Exit", url || this.defaultExitURL);
    };
    Platform.prototype._pageReady = function() {
        temple.isLive = Enabler.isServingInLiveEnvironment();
        if (typeof Enabler != "undefined") {
            if (Enabler.isInitialized()) this._pageLoaded(); else Enabler.addEventListener(studio.events.StudioEvent.INIT, this._pageLoaded.bind(this));
        } else {
            setTimeout(this.init.bind(this), 50);
        }
    };
    Platform.prototype._pageLoaded = function() {
        if (Enabler.isPageLoaded()) this._bannerInit(); else Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, this._bannerInit.bind(this));
    };
    Platform.prototype._tracker = function(title, repeat) {
        if (studio.video) return;
        if (repeat == undefined) repeat = true;
        this._trackedEvents = this._trackedEvents || [];
        if (this._trackedEvents.length > 19) return;
        if (repeat === false && this._trackedEvents.indexOf(title) >= 0) return;
        if (this._trackedEvents.indexOf(title) == -1) {
            this._trackedEvents.push(title);
        }
        Enabler.counter(title, repeat);
        temple.utils.debug("Tracked Event: " + (this._trackedEvents.indexOf(title) + 1) + " - " + title, "green");
    };
    Platform.prototype._addExitEvents = function() {
        Enabler.addEventListener(studio.events.StudioEvent.EXIT, this.onExit.bind(this));
    };
    return Platform;
}(temple.core.Core);

temple.platforms.Platform = temple.platforms.doubleclick.Platform;

temple.templates.StandardBanner = function(_super) {
    __extends(StandardBanner, _super);
    function StandardBanner() {
        _super.call(this, arguments[0]);
        temple.utils.debug("Template <" + arguments.callee.name + ">");
    }
    StandardBanner.prototype.show = function(autoplay) {
        if (this.config.video) if (this.config.video.autoplay && !autoplay) {
            this.dispatchEvent(temple.events.VideoEvents.AUTOPLAY);
            this.videoController.getSource(0).addEventListener(temple.events.VideoEvents.COMPLETE, this.startAnimation.bind(this), false);
            this.videoController.getSource(0).addEventListener(temple.events.VideoEvents.CLOSE, this.startAnimation.bind(this), false);
            return;
        }
        if (document.body.classList.contains("phantom-backup")) {
            this.onBackupImage();
        }
        this.banner.classList.remove("hide");
        if (this.config.video) if (!this.config.video.autoplay) this.startAnimation();
        if (!this.config.video) this.startAnimation();
        this.dispatchEvent(temple.events.SHOW);
        if (document.body.classList.contains("phantom-backup")) {
            alert('{"phantom":"phantom-backup"}');
        }
        if (this.config.ytmh) {
            temple.utils.createStyle("#ytClose", "z-index: 20;");
            if (this.config.ytmh.impression.length) {
                this.Impression_Pixel_URL = this.Impression_Pixel_URL || this.config.ytmh.impression;
            }
            if (this.config.ytmh.retargeting.length) {
                this.Click_Pixel_URL = this.Click_Pixel_URL || this.config.ytmh.retargeting;
            }
            if (this.Impression_Pixel_URL.length) {
                temple.utils.debug("Impression Pixel tracked | " + this.Impression_Pixel_URL, "blue");
                temple.utils.loadImage(this.Impression_Pixel_URL);
            }
            if (this.Click_Pixel_URL.length) {
                this.addEventListener(temple.events.EXIT, function() {
                    temple.utils.debug("Retargeting Pixel tracked | " + this.Click_Pixel_URL, "blue");
                    temple.utils.loadImage(this.Click_Pixel_URL);
                }.bind(this));
            }
        }
    };
    StandardBanner.prototype.onBannerClick = function() {
        this.exit();
    };
    StandardBanner.prototype.startAnimation = function() {};
    StandardBanner.prototype.onTabChange = function() {};
    StandardBanner.prototype.onBackupImage = function() {};
    StandardBanner.prototype.onExit = function() {};
    StandardBanner.prototype.onOver = function(e) {};
    StandardBanner.prototype.onOut = function(e) {};
    StandardBanner.prototype.init = function(e) {};
    StandardBanner.prototype._bannerInit = function() {
        _super.prototype._bannerInit(this);
        this._ready();
    };
    StandardBanner.prototype._ready = function() {
        this.banner = document.getElementById("banner");
        this.bannerClick = document.querySelectorAll(".bannerClick");
        if (document.body.classList.contains("phantom-backup")) {
            this.isBackup = true;
        }
        for (i = 0; i < this.bannerClick.length; i++) {
            this.bannerClick[i].addEventListener("click", this.onBannerClick.bind(this));
            this.bannerClick[i].addEventListener("mouseover", this.onOver.bind(this));
            this.bannerClick[i].addEventListener("mouseleave", this.onOut.bind(this));
        }
        this._addTabEvents();
        if (this._addExitEvents) this._addExitEvents(); else this.addEventListener(temple.events.EXIT, this.onExit.bind(this));
        this._politeLoads(function() {
            if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && !window.innerHeight) {
                window.onresize = function() {
                    if (!temple.isVisible) {
                        temple.isVisible = true;
                        window.onresize = null;
                        this.dispatchEvent(temple.events.READY);
                        this.init();
                    }
                }.bind(this);
                if (!temple.isVisible) return;
            }
            this.dispatchEvent(temple.events.READY);
            this.init();
        });
    };
    StandardBanner.prototype._addTabEvents = function() {
        this._isHidden = false;
        if ("hidden" in document) {
            document.addEventListener("visibilitychange", this.onTabChange.bind(this));
        } else if ((this._isHidden = "mozHidden") in document) {
            document.addEventListener("mozvisibilitychange", this.onTabChange.bind(this));
        } else if ((this._isHidden = "webkitHidden") in document) {
            document.addEventListener("webkitvisibilitychange", this.onTabChange.bind(this));
        } else if ((this._isHidden = "msHidden") in document) {
            document.addEventListener("msvisibilitychange", this.onTabChange.bind(this));
        } else if ("onfocusin" in document) {
            document.onfocusin = document.onfocusout = this.onTabChange.bind(this);
        } else {
            window.onpageshow = window.onpagehide = window.onfocus = window.onblur = this.onTabChange.bind(this);
        }
    };
    return StandardBanner;
}(temple.platforms.Platform || temple.core.Core);

temple.Template = temple.templates.StandardBanner;

temple.Banner = function(_super) {
    __extends(banner, _super);
    function banner() {
        _super.call(this, arguments[0]);
    }
    banner.prototype.init = function() {
        this.initial = true;
        this.defaultDelay = 2;
        this.setupDynamic();
        this.chain(temple.DynamicModule, {
            data: this.devDynamicContent
        }).chain(this.getDynamicData).chain(this.setupBanner);
    };
    banner.prototype.setupDynamic = function() {
        Enabler.setProfileId(10018141);
        this.devDynamicContent = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master = [ {} ];
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0]._id = 0;
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Template = "LEASE";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Asset_Type = "Video";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Asset = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Asset.Type = "video";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Asset.Progressive_Url = "https://gcdn.2mdn.net/videoplayback/id/cce8319bff23a6a3/itag/15/source/doubleclick/ratebypass/yes/mime/video%2Fmp4/acao/yes/ip/0.0.0.0/ipbits/0/expire/3648477094/sparams/id,itag,source,ratebypass,mime,acao,ip,ipbits,expire/signature/99053CAC508BF6C0B9B0A7A34541D900A42DF215.43F2BBEEEC6EAD514D09CC9FF731F6F1EA5C7F29/key/ck2/file/file.mp4";
//		this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Asset.Progressive_Url = "2017_ELA_black_friday_clip_300x142.mp4";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Asset.Stream_Url = "";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Endframe_Image = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Endframe_Image.Type = "file";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Endframe_Image.Url = "https://s0.2mdn.net/creatives/assets/2262973/Hero-Still_300x143-MY18-ElantraGT.jpg";
//		this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Endframe_Image.Url = "300x143_Elantra.jpg";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Video_Overlay_Text = "Optional features shown.";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_1 = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_1.Type = "file";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_1.Url = "https://s0.2mdn.net/creatives/assets/2235576/300x250_sonata_1.jpg";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_2 = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_2.Type = "file";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_2.Url = "https://s0.2mdn.net/creatives/assets/2235576/300x250_sonata_2.jpg";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_3 = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_3.Type = "file";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_3.Url = "https://s0.2mdn.net/creatives/assets/2235576/300x250_sonata_3.jpg";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_4 = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_4.Type = "file";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_4.Url = "https://s0.2mdn.net/creatives/assets/2235576/300x250_sonata_4.jpg";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_5 = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_5.Type = "file";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_5.Url = "";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Multi_Image_Delay = "";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Optional_Award_Image = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Optional_Award_Image.Type = "file";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Optional_Award_Image.Url = "https://s0.2mdn.net/ads/richmedia/studio/20680911/20680911_20170803134047800_1x1.png";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Model = "Sonata";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Dealer_Locator_Model = "Hyundai-Sonata";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Copy_1 = "Who says your daily commute<br>has to be mundane?";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Copy_2 = "Stunning exterior design.";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Copy_3 = "A driver’s seat that’s more like a sanctuary.";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Copy_4 = "Check out our best Sonata ever.";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Copy_Animation_Style = "FADE";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Copy_Layered = false;
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Multi_Copy_Delay = "";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_1 = "Lease starting at";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_2 = "179";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_3 = "per mo.";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_4 = "for 36 months with $1,999 due at lease signing. $0 security deposit. Excludes tax, title and license.";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Endframe_Animation_Style = "SLIDE";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].CTA_Button_At_Start_Toggle = false;
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].CTA_Left_Text = "find yours";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].CTA_Right_Text = "learn more";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Legal_Button_Text = "legal";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Legal_Container_Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Exit_URL = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Exit_URL.Url = "http://www.incentivesnetwork.net/Delivery/Delivery.aspx?cid=6836&pn=Redirect&siteID=1222&setCampaign=77873TE&hmClckThru=www.hyundaiusa.com/test-drive-offer";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Exit_URL_Mobile = {};
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Master[0].Exit_URL_Mobile.Url = "";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates = [ {} ];
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0]._id = 0;
		this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Replay_Button_Color = "#fff";
    	this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Brand_Border = "Yes";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Background_Color = "#FFFFFF";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Logo_Color = "BLUE";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Copy_Color = "#000000";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Primary_CTA_Bg_Color = "#007DB4";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Primary_CTA_Hover_Color = "#40A5BD";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Primary_CTA_Text_Color = "#FFFFFF";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Secondary_CTA_Bg_Color = "#000000";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Secondary_CTA_Hover_Color = "#999999";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Secondary_CTA_Text_Color = "#000000";
        this.devDynamicContent.hyundai_master_feed_T2_Retargeting_Templates[0].Legal_Button_Text_Color = "#666666";
        this.backupURL = "https://www.hyundaiusa.com/";
    }; //Replay_Button_Color, Brand_Border
    banner.prototype.setupBanner = function() {
	
        this.populateElements();
        this.applyStyling();
        this.addListeners();
        this.legalPanelTimeline = new TimelineMax({
            paused: true
        });
        this.legalPanelTimeline.to(legalPanel, .6, {
            opacity: 1
        });
        this.masterTimeline = new TimelineMax({
            paused: true,
            onComplete: this.onMasterTimelineComplete.bind(this)
        });
        this.buildTimelines();
        if (this.video) {
            this.chain(temple.VideoController).chain(this.setupVideo).chain(this.autoPlay);
        } else {
            this.slideShowImages[0].onload = function() {
                this.show();
            }.bind(this);
        }
    };
    banner.prototype.setupVideo = function() {
        this.videoController.getSource(0).addEventListener(temple.events.VideoEvents.CLICK, this.onVideoClick.bind(this));
        this.v_video.addEventListener(temple.events.VideoEvents.COMPLETE, this.onVideoFinish.bind(this));
        this.v_video.addEventListener(temple.events.VideoEvents.STOP, this.onVideoFinish.bind(this));
    };
    banner.prototype.autoPlay = function() {
        if (temple.isAutoplayAvailable()) {
            this.v_video.addEventListener(temple.events.VideoEvents.PLAY, function() {
                this.videoCompleted = false;
                replayBtn.hide();
                videoCopy.show();
                this.show();
            }.bind(this), false);
        } else {
            TweenMax.set(video, {
                opacity: 0
            });
            this.show();
        }
        this.v_video.play(0);
    };
    banner.prototype.startAnimation = function(time) {
        this.masterTimeline.play();
    };
    banner.prototype.getDynamicData = function() {
        this.config.video.sources[0] = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Video_Asset.Progressive_Url;
        this.ctaFindCopy = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].CTA_Left_Text;
        this.ctaLearnCopy = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].CTA_Right_Text;
        this.carModel = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Model;
        this.legalButtonCopy = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Legal_Button_Text;
        this.legalCopy = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Legal_Container_Text;
        this.ctaAtStart = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].CTA_Button_At_Start_Toggle;
        this.awardSrc = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Optional_Award_Image.Url;
        this.exitURL = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Exit_URL;
        this.exitURLMobile = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Exit_URL_Mobile;
        this.videoCopy = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Video_Overlay_Text;
        this.copyAnimStyle = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Copy_Animation_Style;
        this.endFrameAnimStyle = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Endframe_Animation_Style;
        this.template = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Template;
        //this.legalColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Legal_Button_Text_Color;
        this.videoEndframeSrc = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Video_Endframe_Image.Url;
        this.layeredCopy = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Copy_Layered;
        this.dealerLocatorModel = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Dealer_Locator_Model;
		
		
        if (this.template.toLowerCase() == "cashback") {
            this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_4 = "";
        }
        if (this.template.toLowerCase() == "award") {
            this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_2 = "";
            this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_3 = "";
            this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_4 = "";
        }
        this.slideshowImageSources = this.getData([ this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_1.Url, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_2.Url, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_3.Url, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_4.Url, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Image_Asset_5.Url ]);
        this.slideShowImages = [];
        for (i = 0; i < this.slideshowImageSources.length; i++) {
            var img = new Image();
            img.src = this.slideshowImageSources[i];
            this.slideShowImages.push(img);
        }
        this.copyLines = this.getData([ this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Copy_1, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Copy_2, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Copy_3, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Copy_4 ]);
        this.endFrameCopyLines = this.getData([ this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_1, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_2, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_3, this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_4 ]);
        this.video = false;
        if (this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Asset_Type == "Video") this.video = true;
        this.hasEndFrame = false;
        if (!this.isEmpty(this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Offer_Copy_1)) this.hasEndFrame = true;
        this.hasCopy = false;
        if (!this.isEmpty(this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Copy_1)) this.hasCopy = true;
        this.slideshowDelays = this.validateDelays(this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Multi_Image_Delay);
        this.copyDelays = this.validateDelays(this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Multi_Copy_Delay);
    };
    banner.prototype.addListeners = function() {
        legalButton.addEventListener("click", function() {
            this.toggleLegalPanel(true);
        }.bind(this), false);
        legalPanel.addEventListener("click", function() {
            this.toggleLegalPanel(false);
        }.bind(this), false);
        videoEndframe.addEventListener("mouseover", this.onVideoHover.bind(this));
        videoEndframe.addEventListener("mouseout", this.onVideoHoverOut.bind(this));
        $(".ctaFind").addEventListener("click", this.dealerOverHandler.bind(this), false);
        dealerLocator.addEventListener("mouseover", this.dealerPanelOver.bind(this));
        dealer_close_btn.addEventListener("click", this.dealerOutHandler.bind(this));
        slideshow.addEventListener("mouseover", this.onVideoHover.bind(this));
        slideshow.addEventListener("mouseout", this.onVideoHoverOut.bind(this));
        button.addEventListener("click", function() {
            this.getDealer(document.getElementById("input").value);
        }.bind(this), false);
        copyBackground.addEventListener("click", this.onBannerClick.bind(this));
        copyContainer.addEventListener("click", this.onBannerClick.bind(this));
        $(".ctaLearn").addEventListener("click", this.onBannerClick.bind(this));
        slideshow.addEventListener("click", this.onVideoClick.bind(this));
        videoEndframe.addEventListener("click", this.onVideoClick.bind(this));
		
		//Added 10-24-17
		$("#banner").addEventListener("mouseover", this.bannerOverHandler.bind(this), false);
		
		//Added 12-15-17
		document.querySelector(".dark").style.setProperty("border-color", replayColor, "important");
		document.querySelector(".dark").getElementsByTagName("*")[1].style.stroke = replayColor;
    };
    banner.prototype.onMasterTimelineComplete = function() {
        if (!this.video && this.slideShowImages.length > 1) {
            this.slideshowCompleted = true;
            replayBtn.classList.add("slideshow");
            replayBtn.show();
        }
    };
	
    banner.prototype.onBannerClick = function() {
        //this.exit();
		//Added 10-24-17
		
		console.log(bgZip + " bgZip Carey");
		
		if(this.initial == false && bgZip != undefined){
			Enabler.exitOverride("Dealer 1", "http://" + bannerOverExit + "/models/" + dealer_locator_model);
			
			
		}else{
			this.exit();
			console.log('default exit');
		}
    };
    banner.prototype.exit = function(backup) {
        if (this.video) {
            this.videoController.stopAll();
            video.hide();
        }
        this.masterTimeline.progress(1);
        if (temple.isMobile) {
            if (!this.isEmpty(this.exitURLMobile.Url)) {
                Enabler.exitOverride("Mobile_Exit", this.exitURLMobile.Url);
            } else {
                Enabler.exitOverride("Mobile Exit Backup", this.backupURL);
            }
        } else {
            if (!this.isEmpty(this.exitURL.Url)) {
                Enabler.exitOverride("Desktop_Exit", this.exitURL.Url);
            } else {
                Enabler.exitOverride("Desktop Exit Backup", this.backupURL);
            }
        }
    };
    banner.prototype.toggleLegalPanel = function(toggle) {
        if (toggle) {
            this.legalPanelTimeline.play();
            TweenMax.set(legalPanel, {
                className: "-=disable"
            });
        } else {
            this.legalPanelTimeline.reverse();
            TweenMax.set(legalPanel, {
                className: "+=disable"
            });
        }
    };
    banner.prototype.onVideoFinish = function() {
        this.videoCompleted = true;
        videoCopy.hide();
        replayBtn.show();
    };
	
	//***************** Added 12-15-2017 :: Dev - Carey
    banner.prototype.onVideoHover = function() {
    	document.querySelector(".dark").style.setProperty("border-color", "#40a5bd", "important");
		document.querySelector(".dark").getElementsByTagName("*")[1].style.stroke = "#40a5bd";
    };
    banner.prototype.onVideoHoverOut = function() {
    	document.querySelector(".dark").style.setProperty("border-color", replayColor, "important");
		document.querySelector(".dark").getElementsByTagName("*")[1].style.stroke = replayColor;
		
    };
	//***************** Added 12-15-2017 :: Dev - Carey
		
    banner.prototype.onVideoClick = function() {
        if (!this.video) {
            if (this.slideshowCompleted) {
                this.replay();
                this.slideshowCompleted = false;
            } else {
                this.onBannerClick();
            }
            return;
        }
        if (this.videoCompleted) {
            this.v_video.play();
            this.replay();
            this.videoCompleted = false;
        } else {
            this.onBannerClick();
        }
    };
    banner.prototype.populateElements = function() {
        for (i = 0; i < this.copyLines.length; i++) {
            copyContainer.appendChild(this.createElement({
                type: "div",
                inner: this.copyLines[i]
            }));
        }
        for (i = 0; i < this.endFrameCopyLines.length; i++) {
            endFrameContainer.appendChild(this.createElement({
                type: "div",
                inner: this.endFrameCopyLines[i]
            }));
        }
        if (!this.video) {
            for (i = 0; i < this.slideshowImageSources.length; i++) {
                slideshow.appendChild(this.createElement({
                    type: "img",
                    src: this.slideshowImageSources[i]
                }));
            }
        } else {
            videoCopy.innerHTML = this.videoCopy;
        }
        if (this.hasEndFrame) {
            if (this.template.toLowerCase() == "lease" || this.template.toLowerCase() == "cashback") {
                if (endFrameContainer.querySelectorAll("div").length > 2) {
                    endFrameContainer.querySelectorAll("div")[1].appendChild(endFrameContainer.querySelectorAll("div")[2]);
                }
            }
        }
        if (!this.isEmpty(this.ctaLearnCopy)) {
            ctaLearnCopy.innerHTML = this.ctaLearnCopy;
        } else {
            $(".ctaFind").classList.add("primary");
            $(".ctaLearn").hide();
        }
        this.isEmpty(this.awardSrc) ? award.src = "img/1x1.png" : award.src = this.awardSrc;
        ctaFindCopy.innerHTML = this.ctaFindCopy;
        carModel.innerHTML = this.carModel;
        legalButton.innerHTML = this.legalButtonCopy;
        legalContents.innerHTML = this.legalCopy;
        this.isEmpty(this.videoEndframeSrc) ? videoEndframe.src = "img/1x1.png" : videoEndframe.src = this.videoEndframeSrc;
        var legalClose = document.createElement("div");
        legalClose.classList.add("close_btn");
        legalClose.classList.add("dark");
        legalPanel.appendChild(legalClose);
    };
    banner.prototype.applyStyling = function(colorScheme) {
        var copyElements = this.getChildElements(copyContainer);
		
		//Added 12-14-17 : Developer: Carey
		replayColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Replay_Button_Color;
		brandBorders = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Brand_Border;
		
		//********* Added 12-14-18 : Developer - Carey
		
		if(brandBorders == "true" || brandBorders == "yes" || brandBorders == "Yes" || brandBorders == "YES" || brandBorders == "TRUE" || brandBorders == "True" || brandBorders == "t" || brandBorders == "T" || brandBorders == true || brandBorders == "1"){
			document.querySelector("#brandBorders").style.visibility = "visible";
		}else{
			document.querySelector("#brandBorders").style.visibility = "hidden";
			document.querySelector("#banner #replayBtn.dark").style.right = 5 + "px";
			console.log("test" + " " + document.querySelector("#replayBtn").style.right)
		}
		//********* Added 12-14-17 : Developer - Carey

		
		this.backgroundColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Background_Color;
        this.logoColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Logo_Color;
        this.copyColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Copy_Color;
        this.ctaBGColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Primary_CTA_Bg_Color;
        this.ctaTextColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Primary_CTA_Text_Color;
        this.ctaHoverBGColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Primary_CTA_Hover_Color;
        this.ctaFindColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Secondary_CTA_Bg_Color;
        this.ctaFindHoverColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Secondary_CTA_Hover_Color;
        this.ctaFindTextColor = this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Templates[0].Secondary_CTA_Text_Color;
        copyContainer.style.color = this.copyColor;
        endFrameContainer.style.color = this.copyColor;
        copyBackground.style.background = this.backgroundColor;
        ctaFindCopy.style.color = this.ctaFindTextColor;
        ctaLearnCopy.style.color = this.ctaTextColor;
        legalButton.style.color = this.legalColor;
        carModel.style.color = this.copyColor;
        $(".ctaFind").style.borderColor = this.ctaFindColor;
        $(".ctaLearn").style.background = this.ctaBGColor;
        if (this.isEmpty(this.ctaLearnCopy)) {
            ctaFindCopy.style.color = this.ctaTextColor;
            $(".ctaFind").style.background = this.ctaBGColor;
            temple.utils.createStyle(".ctaFind:hover", "background-color: " + this.ctaHoverBGColor + " !important;");
        } else {
            temple.utils.createStyle(".ctaFind:hover", "border-color: " + this.ctaFindHoverColor + " !important;");
            temple.utils.createStyle(".ctaFind:hover *", "color: " + this.ctaFindHoverColor + " !important;");
        }
        if (this.isEmpty(this.ctaFindCopy)) {
            temple.utils.createStyle(".ctaFind", "display: none;");
        }
        temple.utils.createStyle(".ctaLearn:hover", "background-color: " + this.ctaHoverBGColor + " !important;");
        logo.src = "img/logo_" + this.logoColor.toLowerCase() + ".png";
        TweenMax.set(endFrameContainer, {
            className: "+=" + this.template.toLowerCase()
        });
        if (this.layeredCopy) TweenMax.set(copyContainer, {
            className: "+=" + "layered"
        });
        if (this.template.toLowerCase() == "apr_no_divider") divider.hide();
        for (var i = 0; i < $(".close_btn").length; i++) {
            var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            icon.setAttribute("width", "20px");
            icon.setAttribute("height", "20px");
            icon.setAttribute("viewBox", "0 0 20 20");
            var icon_x = document.createElementNS("http://www.w3.org/2000/svg", "path");
            icon_x.setAttributeNS(null, "d", "M7 7 L13 13 M13 7 L7 13");
            icon_x.setAttribute("stroke", "#ffffff");
            icon.appendChild(icon_x);
            $(".close_btn")[i].appendChild(icon);
        }
		
        function makeLine(l) {
            var icon_x = document.createElementNS("http://www.w3.org/2000/svg", "path");
            icon_x.setAttributeNS(null, "d", l);
			
			//***************** added 12-13-17 : Developer - Carey
            icon_x.setAttribute("stroke", replayColor);
			//***************** Added 12-12-2017 :: Dev - Carey
			
            icon_x.setAttribute("stroke-width", "2");
            icon_x.setAttribute("fill-opacity", "0");
            return icon_x;
        }
        var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("width", "30px");
        icon.setAttribute("height", "30px");
        icon.setAttribute("viewBox", "0 0 30 30");
        icon.appendChild(makeLine("M 14.15 21.45 Q 11.9935546875 21.1935546875 10.4 19.6 8.5 17.75 8.5 15 8.5 12.3 10.4 10.4 12.3 8.5 15 8.5 17.75 8.5 19.6 10.4 21.3216796875 12.1216796875 21.475 14.5 L 22.55 14.5 21.5 15.55 20.5 14.5 21.475 14.5 Q 21.5 14.746484375 21.5 15"));
        $("#replayBtn").appendChild(icon);
        dealerLocator.style.opacity = "1";
        dealerLocator.style.transitionDuration = "0s";
        dealerLocator.style.top = "250px";
		
    };
    banner.prototype.buildTimelines = function() {
        this.copyTimeline = new TimelineMax();
        this.imageTimeline = new TimelineMax();
        this.endFrameTimeline = new TimelineMax();
        var width = this.config.size.width;
        var copyElements = this.getChildElements(copyContainer);
        var endFrameElements = this.getChildElements(endFrameContainer);
        var fade = 1;
        var delay = fade / 2;
        var copySlide = false;
        var endFrameSlide = false;
        TweenMax.set([ copyElements, endFrameElements ], {
            opacity: 0
        });
        if (this.endFrameAnimStyle.toLowerCase() == "slide") endFrameSlide = true;
        if (this.copyAnimStyle.toLowerCase() == "slide") copySlide = true;
        if (!this.ctaAtStart) {
            if (this.hasCopy) {
                copySlide ? TweenMax.set(ctaContainer, {
                    opacity: 0,
                    x: +width
                }) : TweenMax.set(ctaContainer, {
                    opacity: 0
                });
            } else {
                endFrameSlide ? TweenMax.set(ctaContainer, {
                    opacity: 0,
                    x: +width
                }) : TweenMax.set(ctaContainer, {
                    opacity: 0
                });
            }
        }
        if (this.hasCopy) {
            for (i = 0; i < copyElements.length; i++) {
                if (this.copyDelays[i] === undefined) {
                    this.copyDelays[i] = this.defaultDelay;
                }
                if (copySlide) TweenMax.set(copyElements[i], {
                    x: -width
                });
                if (i == 0) {
                    TweenMax.set(copyElements[i], {
                        opacity: 1,
                        x: 0
                    });
                } else {
                    if (!this.layeredCopy) {
                        this.copyTimeline.add(TweenMax.to(copyElements[i], fade, {
                            x: 0,
                            opacity: 1,
                            delay: delay,
                            ease: Quad.easeInOut
                        }));
                    } else {
                        this.copyTimeline.add(TweenMax.to(copyElements[i], fade, {
                            x: 0,
                            opacity: 1,
                            delay: this.copyDelays[i - 1],
                            ease: Quad.easeInOut
                        }));
                    }
                }
                if (i == copyElements.length - 1) this.copyTimeline.add(TweenMax.to(ctaContainer, fade, {
                    x: 0,
                    opacity: 1,
                    delay: -fade,
                    ease: Quad.easeInOut
                }));
                if (this.hasEndFrame) {
                    if (!this.layeredCopy && i != copyElements.length) {
                        this.copyTimeline.add(TweenMax.to(copyElements[i], fade, {
                            opacity: 0,
                            delay: this.copyDelays[i],
                            ease: Quad.easeInOut
                        }));
                    }
                } else {
                    if (!this.layeredCopy && i != copyElements.length - 1) {
                        this.copyTimeline.add(TweenMax.to(copyElements[i], fade, {
                            opacity: 0,
                            delay: this.copyDelays[i],
                            ease: Quad.easeInOut
                        }));
                    }
                }
            }
        }
        this.masterTimeline.add(this.copyTimeline, 0);
        if (!this.video) {
            var images = this.getChildElements(slideshow);
            images.shift();
            TweenMax.set(images, {
                opacity: 0
            });
            for (i = 0; i < images.length; i++) {
                if (this.slideshowDelays[i] === undefined) this.slideshowDelays[i] = this.defaultDelay;
                if (!this.layeredCopy) {
                    this.imageTimeline.add(TweenMax.to(images[i], fade, {
                        opacity: 1,
                        delay: this.slideshowDelays[i] + (fade + delay),
                        ease: Quad.easeInOut
                    }));
                } else {
                    this.imageTimeline.add(TweenMax.to(images[i], fade, {
                        opacity: 1,
                        delay: this.slideshowDelays[i],
                        ease: Quad.easeInOut
                    }));
                }
            }
            this.masterTimeline.add(this.imageTimeline, 0);
        }
        if (this.hasEndFrame) {
            var delay = 0;
            if (!this.isEmpty(this.dynamicModule._data.hyundai_master_feed_T2_Retargeting_Master[0].Copy_1) && this.layeredCopy) {
                delay = 2;
                this.endFrameTimeline.add(TweenMax.fromTo(copyContainer, fade, {
                    opacity: 1
                }, {
                    opacity: 0,
                    delay: delay
                }));
            }
            if (this.template.toLowerCase() == "apr" || this.template.toLowerCase() == "apr_no_divider") {
                if (endFrameSlide) TweenMax.set(divider, {
                    x: -width
                });
                this.endFrameTimeline.add(TweenMax.fromTo(divider, fade, {
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1
                }), delay);
            }
            for (i = 0; i < endFrameElements.length; i++) {
                if (endFrameSlide) TweenMax.set(endFrameElements[i], {
                    x: -width
                });
                this.endFrameTimeline.add(TweenMax.to(endFrameElements[i], fade, {
                    x: 0,
                    opacity: 1
                }), delay);
            }
            this.endFrameTimeline.add(TweenMax.to(ctaContainer, fade, {
                x: 0,
                opacity: 1,
                delay: -fade
            }));
            this.masterTimeline.add(this.endFrameTimeline, this.copyTimeline.duration());
        }
    };
    banner.prototype.replay = function() {
        replayBtn.classList.remove("slideshow");
        videoCopy.show();
        this.masterTimeline.seek(0);
        this.masterTimeline.play();
    };
	
		
    banner.prototype.findDealer = function(data) {
        this.dealerData = data;
        if (data.GetDealerLocationNewJSONResult[0] === undefined) {
            console.log("Server not reached.");
            errorMsg.style.visibility = "visible";
            dealers.style.visibility = "hidden";
        } else {
            console.log("Server reached.");
            errorMsg.style.visibility = "hidden";
            dealers.style.visibility = "visible";
            dealer1Name = this.toTitleCase(data.GetDealerLocationNewJSONResult[0].DealerName);
            dealer2Name = this.toTitleCase(data.GetDealerLocationNewJSONResult[1].DealerName);
            dealer3Name = this.toTitleCase(data.GetDealerLocationNewJSONResult[2].DealerName);
			address1 = this.toTitleCase(data.GetDealerLocationNewJSONResult[0].City) + ", " + data.GetDealerLocationNewJSONResult[0].State.toUpperCase() + ", " + this.toTitleCase(data.GetDealerLocationNewJSONResult[0].Zip) + "<br>" + Math.round(data.GetDealerLocationNewJSONResult[0].DistanceFromVisitor * 10) / 10 + " Miles Away";
            address2 = this.toTitleCase(data.GetDealerLocationNewJSONResult[1].City) + ", " + data.GetDealerLocationNewJSONResult[1].State.toUpperCase() + ", " + this.toTitleCase(data.GetDealerLocationNewJSONResult[1].Zip) + "<br>" + Math.round(data.GetDealerLocationNewJSONResult[1].DistanceFromVisitor * 10) / 10 + " Miles Away";
            address3 = this.toTitleCase(data.GetDealerLocationNewJSONResult[2].City) + ", " + data.GetDealerLocationNewJSONResult[2].State.toUpperCase() + ", " + this.toTitleCase(data.GetDealerLocationNewJSONResult[2].Zip) + "<br>" + Math.round(data.GetDealerLocationNewJSONResult[2].DistanceFromVisitor * 10) / 10 + " Miles Away";
            dealer1_url = data.GetDealerLocationNewJSONResult[0].DealerUrl;
            zip = this.getUserZip;
			document.getElementById("input").setAttribute("placeholder", zip);
            placeholder = document.getElementById("input").getAttribute("placeholder");
            input = document.getElementById("input").value;
            inputContents = !this.isEmpty(input) ? input : placeholder;
            zipLocation = this.isEmpty(inputContents) ? "you" : inputContents;
            heading = "Closest dealers near: " + zipLocation;
            document.getElementById("zip_heading").innerHTML = heading;
            this.dealer1_url = dealer1_url;
            dealer2_url = data.GetDealerLocationNewJSONResult[1].DealerUrl;
            dealer3_url = data.GetDealerLocationNewJSONResult[2].DealerUrl;
			
			//Added 10-24-17
			bannerOverExit = dealer1_url;
			
			//Updated 10-24-17
            dealer_locator_model = this.dealerLocatorModel; //removed var
						
            dealer1.innerHTML = "<div id='dealer_1_name' class='dealer_name'></div>" + "<div id='dealer_1_address' class='dealer_address'></div>" + "<div class='dl_cta'><div>view site</div></div>";
            dealer2.innerHTML = "<div class='dl_border'></div>" + "<div id='dealer_2_name' class='dealer_name'></div>" + "<div id='dealer_2_address' class='dealer_address'></div>" + "<div class='dl_cta' ><div>view site</div></div>";
            dealer3.innerHTML = "<div class='dl_border'></div>" + "<div id='dealer_3_name' class='dealer_name'></div>" + "<div id='dealer_3_address' class='dealer_address'></div>" + "<div class='dl_cta' ><div>view site</div></div>";
            function populate() {
                document.getElementById("dealer_1_name").innerHTML = dealer1Name;
                document.getElementById("dealer_1_address").innerHTML = address1;
                document.getElementById("dealer_2_name").innerHTML = dealer2Name;
                document.getElementById("dealer_2_address").innerHTML = address2;
                document.getElementById("dealer_3_name").innerHTML = dealer3Name;
                document.getElementById("dealer_3_address").innerHTML = address3;
                $(".dl_cta").forEach(function(button) {
                    button.style.background = temple.banner.ctaBGColor;
                    button.style.color = temple.banner.ctaTextColor;
                });
                temple.utils.createStyle(".dl_cta:hover", "background-color: " + temple.banner.ctaHoverBGColor + " !important;");
                function clearListeners(el) {
                    el.parentNode.replaceChild(el.cloneNode(true), el);
                }
                clearListeners(dealer1);
                clearListeners(dealer2);
                clearListeners(dealer3);
                dealer1.addEventListener("click", function() {
//                    dealerClick("Dealer 1", dealer1_url);
					
					clicked = true;
                    dealerLocator.style.transitionDuration = "0s";
                    dealerLocator.style.top = "0px";
                    Enabler.exitOverride("Dealer 1", "http://" + dealer1_url + "/models/" + dealer_locator_model);
                }, false);
                dealer2.addEventListener("click", function() {
//                    dealerClick("Dealer 2", dealer2_url);
					
					clicked = true;
                    dealerLocator.style.transitionDuration = "0s";
                    dealerLocator.style.top = "0px";
                    Enabler.exitOverride("Dealer 2", "http://" + dealer2_url + "/models/" + dealer_locator_model);
					
                }, false);
                dealer3.addEventListener("click", function() {
//                    dealerClick("Dealer 3", dealer3_url);
					
					clicked = true;
                    dealerLocator.style.transitionDuration = "0s";
                    dealerLocator.style.top = "0px";
                    Enabler.exitOverride("Dealer 3", "http://" + dealer3_url + "/models/" + dealer_locator_model);
					
                }, false);
                dealer3.style.height = "250px";
//                function dealerClick(dealer, url) {
//                    clicked = true;
//                    dealerLocator.style.transitionDuration = "0s";
//                    dealerLocator.style.top = "0px";
//                    Enabler.exitOverride(dealer, "http://" + url + "/models/" + dealer_locator_model);
//                }
            }
            setTimeout(populate, 10);
        }
    };
    banner.prototype.getDealer = function(zip, exit) {
        console.log("server call");
		
		//Added 10-24-17
        bgZip = zip;
		
        script = document.createElement("script");
        script.type = "application/javascript";
        script.charset = "utf-8";
        script.src = "https://prevapp.hyundaiusa.com/DealerServiceSSL.svc/content/v2/en-US/" + zip + "/5/json?method=temple.banner.findDealer&_=1438980994979";
        if (exit) {
            script.onload = function() {
                this.exit();
            }.bind(this);
            script.onerror = function() {
                this.exit(true);
            }.bind(this);
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    banner.prototype.dealerOverHandler = function() {
        this.dealerLocator();
        dealerLocator.style.transitionDuration = ".25s";
        dealerLocator.style.top = "0px";
    };
    banner.prototype.dealerPanelOver = function(e) {
        e.stopPropagation();
        clicked = false;
    };
    banner.prototype.dealerOutHandler = function(e) {
        if (clicked == true) {} else {
            if (e.target.id == "input" || e.target.id == "") {} else {
                dealerLocator.style.transitionDuration = ".25s";
                dealerLocator.style.top = "250px";
            }
			
        }
    };
	
	//Added 10-24-17
	banner.prototype.bannerOverHandler = function(e) {
		//console.log(e.currentTarget.id + " Carey");
		//console.log(this.initial + " Carey");
		if(e.currentTarget.id == "banner" && this.initial == false){
			
		}else{
			this.dealerLocator();
			console.log("dealerLocator called" + " Carey");
		}
        
    };
	
	
    banner.prototype.enterPressed = function(event) {
        var x = event.which || event.keyCode;
        if (x === 13) {
            temple.banner.getDealer(document.getElementById("input").value);
        }
    };
    banner.prototype.dealerLocator = function(exit) {
        if (this.initial === true) {
            
            this.getUserZip = Enabler.getUserZipCode();
//			this.getUserZip = "48184"; //test zip
			this.initial = false;
            if (this.testing_zip) this.getUserZip = this.testing_zip;
			
			
        }else{
			console.log('server not called "carey"');
		}
		
		//Added 10-24-17 (moved this call into the "this.initial === true")
		if(this.getUserZip == origZip){
			
		}else{
			this.getDealer(this.getUserZip, exit);
			origZip = this.getUserZip;
		}
		
    };
    banner.prototype.getData = function(data) {
        var finalData = [];
        for (i = 0; i < data.length; i++) {
            if (!this.isEmpty(data[i])) finalData.push(data[i]);
        }
        return finalData;
    };
    banner.prototype.getChildElements = function(el) {
        var children = el.childNodes;
        var elements = [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.nodeType == 1) elements.push(child);
        }
        return elements;
    };
    banner.prototype.validateDelays = function(delays) {
        var delays = delays.split(",");
        for (i = 0; i < delays.length; i++) {
            delays[i] = parseInt(delays[i]);
            if (delays[i] == 0 || isNaN(delays[i]) || delays[i] === undefined) {
                delays[i] = this.defaultDelay;
            }
        }
        return delays;
    };
    banner.prototype.isEmpty = function(str) {
        return !str || 0 === str.length || str.replace(/\s/g, "") == "";
    };
    banner.prototype.createElement = function(params) {
        type = params.type || 0;
        src = params.src || 0;
        id = params.id || 0;
        inner = params.inner || 0;
        var el = document.createElement(type);
        el.src = src;
        el.innerHTML = inner;
        return el;
    };
    banner.prototype.toTitleCase = function(str) {
        return str.replace(/\w+/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    return banner;
}(temple.Template);