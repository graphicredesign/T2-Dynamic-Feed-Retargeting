temple.modules.VideoController = function(_super, args) {
    __extends(VideoController, _super);
    function VideoController(data, banner, id) {
        this.version = "2.9.7";
        this.id = id;
        this.instances = [];
        this.currentVideo = {};
        this.config = temple.config.video;
        this.sources = [];
        this.banner = banner;
        if (!this.config) {
            temple.utils.debug("ERROR No video config found", "red");
            return;
        }
        if (!TweenMax) {
            temple.utils.debug("ERROR TweenMax or TweenLite not found - this module requires the GSAP Tween Library", "red");
            return;
        }
        if (!this.config.containers.length) {
            temple.utils.debug("ERROR No container was defined in the video config", "red");
            return;
        }
        if (!this.config.size.length) this.config.size[0] = {
            width: temple.config.size.width,
            height: temple.config.size.height
        };
        if (!this.config.closeButtonSize) this.config.closeButtonSize = 20;
        if (!this.config.colors) this.config.colors = [ "#fff", "#000" ];
        if (!this.config.closeColors) this.config.closeColors = this.config.colors;
        if (!this.config.hideOnComplete) this.config.hideOnComplete = [ false ];
        if (!this.config.customControls) this.config.customControls = [ false ];
        if (!this.config.controls) this.config.controls = [ 2 ];
        if (!this.config.fullscreen) this.config.fullscreen = [ false ];
        if (!this.config.muted) this.config.muted = [ true ];
        if (!this.config.showBar) this.config.showBar = [ false ];
        if (this.config.autoplay === undefined) this.config.autoplay = false;
        if (!temple.isAutoplayAvailable()) {
            this.config.autoplay = false;
        }
        if (this.config.autoplay) {
            this.config.muted[0] = true;
            this.banner.addEventListener(temple.events.VideoEvents.AUTOPLAY, this.onBannerShow.bind(this));
        }
        if (temple.isMobile && !this.config.customControlsMobile) {
            this.config.controls = [ true ];
            this.config.customControls = [ false ];
        }
        for (var i = 0; i < this.config.sources.length; i++) {
            this.sources.push(new temple.modules.VideoSource(i, this));
            this.getSource(i).muted = this.config.muted[i] == undefined ? true : this.config.muted[i];
        }
        this.isYoutube = !isURL(this.config.sources[0]);
        if (temple.modules.YoutubeModule || temple.modules.VideoModule) {
            this.initController();
            return;
        }
        if (this.isYoutube) {
            temple.utils.loadScript(this.banner.config.scriptPath + "modules/YoutubeModule.js", this.initController.bind(this));
        } else {
            temple.utils.loadScript(this.banner.config.scriptPath + "modules/VideoModule.js", this.initController.bind(this));
        }
        function isURL(str) {
            return /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/g.test(str);
        }
    }
    VideoController.prototype.initController = function() {
        if (this.isYoutube) {
            window.onYouTubeIframeAPIReady = this.buildVideos.bind(this);
            if (typeof YT == "undefined") {
                temple.utils.loadScript("https://www.youtube.com/iframe_api");
            } else if (YT.loaded) {
                this.buildVideos();
            }
        } else {
            this.buildVideos();
        }
    };
    VideoController.prototype.onBannerShow = function() {
        if (temple.isAutoplayAvailable()) {
            if (this.config.autoplay === true) this.instances[0].play(-1);
        }
    };
    VideoController.prototype.buildVideos = function buildVideos() {
        temple.utils.createStyle(".Temple-Video .videoClick", "position:absolute;top:0;left:0;cursor:pointer;width:100%;height:100%;background:url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);");
        temple.utils.createStyle(".Temple-Video .close", "position:absolute;top:10px;left:10px;z-index:15;cursor:pointer;width:" + this.config.closeButtonSize + "px;height:" + this.config.closeButtonSize + "px;overflow:hidden;");
        temple.utils.createStyle(".Temple-Video .videoPanels", "width:100%;height:100%;position:absolute;pointer-events:none;");
        temple.utils.createStyle(".Temple-Video .iVideoPanels", "width:0;height:0;position:absolute;");
        temple.utils.createStyle(".Temple-Video .controls", "z-index:12;position:absolute;bottom:27px;width:100%;height:0;");
        temple.utils.createStyle(".Temple-Video .playButton.v_icon", "margin-left:5px;");
        temple.utils.createStyle(".Temple-Video .v_icon", "width:25px;height:25px;float:left;cursor:pointer;");
        temple.utils.createStyle(".Temple-Video .timer", "float:left;font-family:Arial,sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;text-shadow:0 1px 2px rgba(0,0,0,.5);line-height:26px;margin-left:9px;pointer-events:none;");
        for (var i = 0; i < this.config.containers.length; i++) {
            var v = this.isYoutube ? new temple.modules.YoutubeModule(i, this) : new temple.modules.VideoModule(i, this);
            v.addEventListener(temple.events.MODULE_READY, this.onVideoReady.bind(this));
            this.instances.push(v);
            this.banner[v.prefix + this.config.containers[i]] = v;
            temple.utils.createStyle("#" + this.config.containers[i], "position:absolute;top:-1px;left:-1px;z-index:10;background-color:#000;overflow:hidden;");
        }
    };
    VideoController.prototype.stopAll = function stopAll() {
        for (var i = 0; i < this.instances.length; i++) {
            this.instances[i].stop();
        }
    };
    VideoController.prototype.closeAll = function stopAll() {
        for (var i = 0; i < this.instances.length; i++) {
            this.instances[i].close();
        }
    };
    VideoController.prototype.hideAll = function hideAll(noTween) {
        for (var i = 0; i < this.instances.length; i++) {
            this.instances[i].hide(noTween);
        }
    };
    VideoController.prototype.getSource = function getSource(id) {
        return this.sources[id];
    };
    VideoController.prototype.onVideoReady = function onVideoReady() {
        this.videosReady = this.videosReady + 1 || 1;
        if (this.videosReady == this.config.containers.length) {
            this.done();
        }
    };
    VideoController.prototype.onVideoComplete = function onVideoComplete(e) {
        this.dispatchEvent(temple.events.VideoEvents.COMPLETE, {
            target: this
        });
    };
    VideoController.prototype.dispatchVideoEvent = function dispatchVideoEvent(e, o) {
        if (!o.target.currentVideo) return;
        var t = o.target.currentVideo.title + o.target.currentVideo.id;
        if (this.sourceEvents) {
            if (this.sourceEvents[t]) {
                o.source = t;
                if (this.sourceEvents[t][e]) {
                    if (!this.sourceEvents[t][e].length) return;
                    temple.utils.debug("<" + e + "> " + t, "black", "VideoEvent");
                    for (var i = 0; i < this.sourceEvents[t][e].length; i++) {
                        this.sourceEvents[t][e][i](o);
                    }
                    for (var i = 0; i < this.sourceEvents[t][e].length; i++) {
                        if (!this.sourceEvents[t][e][i].sticky) var f = this.sourceEvents[t][e].splice(i, 1);
                    }
                }
            }
        }
    };
    return VideoController;
}(temple.core.Module);

temple.modules.VideoSource = function(_super, args) {
    function VideoSource(id, c) {
        this._id = id;
        this.id = id;
        this.controller = c;
        this.title = c.config.sources[id].split("/").pop().split(".")[0];
        this.plays = 0;
        this.completed = 0;
        this.layers = [];
        this.source = c.config.sources[id];
        this.customControls = c.config.customControls[id] || false;
        this.controls = c.config.controls[id] === undefined ? true : c.config.controls[id];
        this.muted = c.config.muted[id] || false;
        this.hideOnComplete = c.config.hideOnComplete[id] || false;
    }
    VideoSource.prototype.hasBeenPlayed = function() {
        return Boolean(this.plays);
    };
    VideoSource.prototype.addEventListener = function(event, callback, sticky) {
        callback.sticky = sticky != undefined ? sticky : true;
        this.controller.sourceEvents = this.controller.sourceEvents || {};
        this.controller.sourceEvents[this.title + this.id] = this.controller.sourceEvents[this.title + this.id] || {};
        this.controller.sourceEvents[this.title + this.id][event] = this.controller.sourceEvents[this.title + this.id][event] || [];
        this.controller.sourceEvents[this.title + this.id][event].push(callback);
    };
    VideoSource.prototype.addLayer = function(t, v) {
        if (this.controller.config.autoplay && this.id > 0) t.hide();
        this.layers.push({
            layer: t,
            player: v
        });
    };
    VideoSource.prototype.showLayers = function(v) {
        for (i = 0; i < this.layers.length; i++) if (this.layers[i].player == v) this.layers[i].layer.show();
    };
    VideoSource.prototype.hideLayers = function(v) {
        for (var i = 0; i < this.layers.length; i++) if (this.layers[i].player == v) this.layers[i].layer.hide();
    };
    return VideoSource;
}();

temple.modules.iVideoModule = function(_super, id, controller) {
    __extends(iVideoModule, _super);
    function iVideoModule(id, controller) {
        this._construct(id, controller);
    }
    iVideoModule.prototype._construct = function _construct(id, controller) {
        this.controller = controller;
        this.version = "2.0";
        this.id = id;
        this.layers = [];
        this.prefix = "v_";
        this.config = temple.config.video;
        this.sources = this.config.sources;
        this.name = this.config.containers[id];
        this.closeButton = this.createCloseButton();
        this.container = document.createElement("div");
        this.container.id = this.name + "Container";
        this.panelContainer = document.createElement("div");
        this.iPanelContainer = document.createElement("div");
        this.clickArea = document.createElement("div");
        this.wrapper = document.getElementById(this.config.containers[id]);
        this.iPanelContainer.classList.add("iVideoPanels");
        this.panelContainer.classList.add("videoPanels");
        this.closeButton.classList.add("close");
        this.clickArea.classList.add("videoClick");
        this.wrapper.classList.add("Temple-Video");
        this.wrapper.appendChild(this.container);
        this.wrapper.appendChild(this.panelContainer);
        this.wrapper.appendChild(this.clickArea);
        this.wrapper.appendChild(this.iPanelContainer);
        this.wrapper.appendChild(this.closeButton);
        this.buildControls();
        this.createPlayer(this.id);
        temple.utils.createStyle("#" + this.container.id, "position:absolute;top:0;left:0;");
    };
    iVideoModule.prototype.onStateChanged = function onStateChanged(e) {
        switch (e.data != undefined ? e.data : e.type) {
          case temple.PlayerState.ENDED:
            this.active = false;
            this.onVideoEnded();
            break;

          case temple.PlayerState.LOADED:
            this.active = true;
            this.onVideoPlay();
            break;

          case temple.PlayerState.PAUSED:
            this.onVideoPause();
            break;

          case temple.PlayerState.BUFFERING:
            this.dispatchEvents(temple.events.VideoEvents.BUFFERING, {
                target: this
            });
            break;
        }
    };
    iVideoModule.prototype.resize = function resize(size) {
        size = size || {};
        var i = this.config.size[this.id] ? this.id : 0;
        this.previousSize = {
            width: this.width,
            height: this.height
        };
        this.width = size.width || this.config.size[i].width;
        this.height = size.height || this.config.size[i].height;
        this.container.setAttribute("width", this.width);
        this.container.setAttribute("height", this.height);
        TweenMax.set(this.bar, {
            width: this.width - 20
        });
        TweenMax.set([ this.container, this._video, this.wrapper ], {
            width: this.width,
            height: this.height
        });
    };
    iVideoModule.prototype.load = function load(id) {
        if (!this.sources.length) return;
        this.show();
        this.setSource(id);
        if (this._video) this._video.load();
    };
    iVideoModule.prototype.play = function play(id) {
        this.initPlay = true;
        if (id == -1) this.autoplay = true;
        if (!this.sources.length) return;
        id = this.sources[id] ? id : this.currentVideo ? this.currentVideo._id : 0;
        if (this.config.fullscreen[typeof this.config.fullscreen[id] == "undefined" ? 0 : id] && id != -1) {
            this.enterFullscreen();
        }
        this.load(id);
        this.videoPlays = this.videoPlays || {};
        this.videoPlays[id] = this.videoPlays[id] ? this.videoPlays[id] + 1 : 1;
        this.resume();
    };
    iVideoModule.prototype.resume = function resume() {
        this.playing = true;
        this.video.playVideo();
        this.playButton.classList.add("pause");
        this.playButton.tween.reverse();
    };
    iVideoModule.prototype.pause = function pause(time, dispatchEvent) {
        this.initPlay = true;
        this.video.pauseVideo();
        if (time != null) {
            this.seek(time);
        }
        this.playing = false;
        if (dispatchEvent != false) {
            this.dispatchEvents(temple.events.VideoEvents.PAUSE, {
                target: this
            });
            temple.utils.tracker("Video " + this.currentVideo.id + " Pause");
        }
    };
    iVideoModule.prototype.stop = function stop() {
        this.initPlay = true;
        if (this.getPlayerState() == temple.PlayerState.ENDED) return;
        this.pause(0, false);
        this.active = false;
        if (dispatchEvent != false) {
            this.dispatchEvents(temple.events.VideoEvents.STOP, {
                target: this
            });
        }
        this.stopTimer();
        this.exitFullscreen();
    };
    iVideoModule.prototype.unmute = function unmute(dispatchEvent) {
        this.video.unMute();
        this.controller.getSource(this.currentVideo._id).muted = false;
        this.muteButton.show();
        this.muteButton.classList.add("unmute");
        this.muteButton.tween.reverse();
        if (dispatchEvent != false) {
            this.dispatchEvents(temple.events.VideoEvents.UNMUTE, {
                target: this
            });
        }
    };
    iVideoModule.prototype.mute = function mute(dispatchEvent) {
        this.video.mute();
        this.controller.getSource(this.currentVideo._id).muted = true;
        this.muteButton.classList.remove("unmute");
        this.muteButton.tween.play();
        if (dispatchEvent != false) {
            this.dispatchEvents(temple.events.VideoEvents.MUTE, {
                target: this
            });
        }
    };
    iVideoModule.prototype.toggleMute = function toggleMute() {
        if (this.video.isMuted()) {
            this.unmute();
            temple.utils.tracker("Video " + this.currentVideo.id + " UnMute");
        } else {
            this.mute();
            temple.utils.tracker("Video " + this.currentVideo.id + " Mute");
        }
    };
    iVideoModule.prototype.setTimeDisplay = function setTimeDisplay(current) {
        this.timerView.innerHTML = this.timerView.innerHTML = String(current || Math.round(this.video.getCurrentTime())).timeFormat() + " / " + String(Math.round(this.video.getDuration())).timeFormat();
    };
    iVideoModule.prototype.seek = function seek(time) {
        this.video.seekTo(time || 0);
        this.barFill.current = this.barFill.style.width;
        this.setTimeDisplay(time);
    };
    iVideoModule.prototype.setSource = function setSource(id) {
        this.videoLoaded = this.currentVideo == this.controller.getSource(id);
        this.currentVideo = this.controller.currentVideo = this.controller.getSource(id);
        for (var i = 0; i < this.config.sources.length; i++) {
            this.controller.getSource(i).hideLayers(this);
        }
        this.currentVideo.showLayers(this);
        this.video.id = "video_" + id;
        this.active = false;
        this.resize(this.config.size[id]);
        if (this.config.showBar[id] != undefined) {
            if (this.config.showBar[id]) this.bar.show(); else this.bar.hide();
        } else {
            if (this.config.showBar[0]) this.bar.show(); else this.bar.hide();
        }
        if (!this.currentVideo.customControls) this.disableCustomControls();
        if (this.currentVideo.controls) this.enableControls();
        if (!this.currentVideo.controls) this.disableControls();
        if (this.currentVideo.customControls) this.enableCustomControls();
        this.setTracking();
        this.playHistory = this.playHistory || [];
        this.controller.playHistory = this.controller.playHistory || [];
        this.playHistory.push(this.currentVideo);
        this.controller.playHistory.push(this.currentVideo);
        if (this.currentVideo.muted) {
            this.mute(false);
        } else {
            this.unmute(false);
        }
        this.timerView.innerHTML = "";
        if (temple.isiOS && !temple.isiOS9up) {
            this.container.show();
        }
        this.video.cueVideoById(this.currentVideo.source);
    };
    iVideoModule.prototype.setEvents = function setEvents() {
        this.clickArea.addEventListener("click", this.onVideoClick.bind(this));
        this.wrapper.addEventListener("webkitendfullscreen", this.onPlayerExitFullscreen.bind(this));
        document.addEventListener("fullscreenchange", this.onFullscreenChange.bind(this));
        document.addEventListener("webkitfullscreenchange", this.onFullscreenChange.bind(this));
        this.closeFunction = this.close.bind(this);
        this.closeButton.addEventListener("click", this.closeFunction);
        if (!this.config.closeContainers) {
            this.closeButton.addEventListener("mouseover", function() {
                TweenMax.to(this.closeButton.fill, .3, {
                    fill: this.config.closeColors[1],
                    ease: Quad.easeOut
                });
                this.closeButton.cross.setAttribute("stroke", this.config.closeColors[0]);
            }.bind(this));
            this.closeButton.addEventListener("mouseout", function() {
                TweenMax.to(this.closeButton.fill, .3, {
                    fill: this.config.closeColors[0],
                    ease: Quad.easeOut
                });
                this.closeButton.cross.setAttribute("stroke", this.config.closeColors[1]);
            }.bind(this));
        }
    };
    iVideoModule.prototype.createCloseButton = function createCloseButton() {
        if (!this.config.closeContainers) {
            var w = this.config.closeButtonSize;
            var i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            i.setAttribute("width", w + "px");
            i.setAttribute("height", w + "px");
            i.fill = new this.svgIcon("closeButtonFill", "M0," + w / 2 + "a" + w / 2 + "," + w / 2 + " 0 1,0 " + w + ",0a" + w / 2 + "," + w / 2 + " 0 1,0 -" + w + ",0", this.config.closeColors[0]);
            var a = Math.round(this.config.closeButtonSize * .7);
            var b = this.config.closeButtonSize - a;
            i.cross = new this.svgIcon("line1", "M" + b + " " + b + " L" + a + " " + a + " M" + a + " " + b + " L" + b + " " + a + "");
            i.cross.setAttribute("stroke", this.config.closeColors[1]);
            i.cross.setAttribute("stroke-width", w < 15 ? 1 : 2);
            i.appendChild(i.fill);
            i.appendChild(i.cross);
        } else {
            i = $("." + this.config.closeContainers[this.id]) ? $("." + this.config.closeContainers[this.id]) : $("#" + this.config.closeContainers[this.id]);
        }
        return i;
    };
    iVideoModule.prototype.svgButton = function svgButton(id, hover) {
        var i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        i.setAttribute("width", "25px");
        i.setAttribute("height", "25px");
        i.setAttribute("viewBox", "0 0 50 50");
        i.id = id || "";
        i.hover = hover;
        return i;
    };
    iVideoModule.prototype.svgIcon = function svgIcon(id, path, color) {
        var i = document.createElementNS("http://www.w3.org/2000/svg", "path");
        i.setAttributeNS(null, "d", path);
        i.setAttribute("data-original", path);
        i.setAttribute("fill", color);
        i.setAttribute("class", id || "");
        return i;
    };
    iVideoModule.prototype.buildControls = function buildControls() {
        this.controls = document.createElement("div");
        this.bar = document.createElement("div");
        this.bar.classList.add("bar");
        this.bar.innerHTML = '<div class="track"></div>';
        this.barFill = document.createElement("div");
        this.barFill.classList.add("fill");
        this.barFill.style.backgroundColor = this.config.colors[0];
        this.barIndicator = document.createElement("div");
        this.barIndicator.classList.add("indicator");
        this.barIndicator.style.backgroundColor = this.config.colors[0];
        this.bar.appendChild(this.barFill);
        this.bar.appendChild(this.barIndicator);
        this.barIndicator.hide();
        this.bar.hide();
        temple.utils.createStyle(".Temple-Video .bar", "height:15px; position: absolute; top: -10px; left: 10px; cursor:pointer;");
        temple.utils.createStyle(".Temple-Video .bar .track", "width:100%;height:1px; background-color: " + this.config.colors[1] + ";position: absolute; top: 10px; left: 0;");
        temple.utils.createStyle(".Temple-Video .bar .fill", "height:1px; position: absolute; top: 10px; left: 0;");
        temple.utils.createStyle(".Temple-Video .bar .indicator", "width:10px;height:10px; border-radius:5px; position: absolute; top: 5px; left: 0px;background-color:" + this.config.colors[1] + ";pointer-events: none;");
        if (this.config.controlsAutoHide && this.config.controlsAutoHide[this.id]) {
            this.controls.addEventListener("mouseover", function() {
                TweenMax.to(this.controls, .3, {
                    alpha: 1,
                    ease: Cubic.easeOut
                });
            }.bind(this));
            this.controls.addEventListener("mouseout", function() {
                if (this.playing) {
                    TweenMax.to(this.controls, 1, {
                        alpha: 0,
                        ease: Cubic.easeOut
                    });
                }
            }.bind(this));
            this.clickArea.addEventListener("mouseover", function() {
                TweenMax.to(this.controls, .3, {
                    alpha: 1,
                    ease: Cubic.easeOut
                });
            }.bind(this));
            this.clickArea.addEventListener("mouseout", function() {
                if (this.playing) {
                    TweenMax.to(this.controls, 1, {
                        alpha: 0,
                        ease: Cubic.easeOut
                    });
                }
            }.bind(this));
        }
        this.bar.addEventListener("click", function(e) {
            var p = e.offsetX / this.bar.getBoundingClientRect().width;
            this.seek(this.video.getDuration() * p);
        }.bind(this));
        this.bar.addEventListener("mouseover", function() {
            this.barIndicator.show();
            this.barFill.seeking = true;
            this.barFill.current = this.barFill.style.width;
        }.bind(this));
        this.bar.addEventListener("mouseout", function() {
            this.barFill.seeking = false;
            this.barIndicator.hide();
            this.barFill.style.width = this.barFill.current;
        }.bind(this));
        this.bar.addEventListener("mousemove", function(e) {
            if (e.offsetX < this.bar.getBoundingClientRect().width - 6 && e.offsetX > 6) TweenMax.set(this.barIndicator, {
                x: e.offsetX - 6
            });
            var p = e.offsetX / this.bar.getBoundingClientRect().width * 100;
            TweenMax.set(this.barFill, {
                width: p + "%"
            });
        }.bind(this));
        this.playButton = new this.svgButton(null, "M16,15 L16,35 24,30 24,19 M24,19 L24,30 35,25 35,25");
        this.playButton.icon = new this.svgIcon("svgIcon", "M16,15 L16,36 23,36 23,15 M28,15 L28,36 35,36 35,15", this.config.colors[0]);
        this.playButton.appendChild(this.playButton.icon);
        if (typeof MorphSVGPlugin != "undefined") this.playButton.tween = TweenMax.to(this.playButton.querySelector(".svgIcon"), .3, {
            morphSVG: this.playButton.hover,
            ease: Power4.easeInOut,
            paused: true
        }); else this.playButton.tween = {
            play: function() {
                this.icon.setAttributeNS(null, "d", this.hover);
            }.bind(this.playButton),
            reverse: function() {
                this.icon.setAttributeNS(null, "d", this.icon.getAttribute("data-original"));
            }.bind(this.playButton)
        };
        this.muteButton = new this.svgButton(null, "M35,20 L46,31 M35,31 L46,20");
        this.muteButton.fill = new this.svgIcon("", "M13,20 L13,31 21,31 29,37 31,37 31,14 29,14 21,20 13,20 M35,20 L45,30", this.config.colors[0]);
        this.muteButton.appendChild(this.muteButton.fill);
        this.muteButton.icon = new this.svgIcon("svgIcon", "M35,20 A5,5 0 0,1 35,31", this.config.colors[0]);
        this.muteButton.icon.setAttribute("stroke", this.config.colors[0]);
        this.muteButton.icon.setAttribute("stroke-width", "3");
        this.muteButton.icon.setAttribute("fill-opacity", "0");
        this.muteButton.appendChild(this.muteButton.icon);
        if (typeof MorphSVGPlugin != "undefined") this.muteButton.tween = TweenMax.to(this.muteButton.querySelector(".svgIcon"), .3, {
            morphSVG: this.muteButton.hover,
            ease: Power4.easeInOut,
            paused: true
        }); else this.muteButton.tween = {
            play: function() {
                this.icon.setAttributeNS(null, "d", this.hover);
            }.bind(this.muteButton),
            reverse: function() {
                this.icon.setAttributeNS(null, "d", this.icon.getAttribute("data-original"));
            }.bind(this.muteButton)
        };
        this.timerView = document.createElement("div");
        this.playButton.classList.add("playButton");
        this.playButton.classList.add("v_icon");
        this.muteButton.classList.add("muteButton");
        this.muteButton.classList.add("v_icon");
        this.timerView.className = "timer";
        this.timerView.style.color = this.config.colors[0];
        this.controls.classList.add("controls");
        this.controls.appendChild(this.playButton);
        this.controls.appendChild(this.muteButton);
        this.controls.appendChild(this.timerView);
        this.controls.appendChild(this.bar);
        this.wrapper.appendChild(this.controls);
        if (temple.isiOS) this.muteButton.hide();
        this.playButton.addEventListener("click", this.togglePlay.bind(this));
        this.playButton.addEventListener("mouseover", function() {
            TweenMax.to(this.playButton.icon, .2, {
                fill: this.config.colors[1],
                ease: Quad.easeOut
            });
        }.bind(this));
        this.playButton.addEventListener("mouseout", function() {
            TweenMax.to(this.playButton.icon, .2, {
                fill: this.config.colors[0],
                ease: Quad.easeOut
            });
        }.bind(this));
        this.muteButton.addEventListener("click", this.toggleMute.bind(this));
        this.muteButton.addEventListener("mouseover", function() {
            TweenMax.to(this.muteButton.icon, .2, {
                fill: this.config.colors[1],
                stroke: this.config.colors[1],
                ease: Quad.easeOut
            });
            TweenMax.to(this.muteButton.fill, .2, {
                fill: this.config.colors[1],
                ease: Quad.easeOut
            });
        }.bind(this));
        this.muteButton.addEventListener("mouseout", function() {
            TweenMax.to(this.muteButton.icon, .2, {
                stroke: this.config.colors[0],
                ease: Quad.easeOut
            });
            TweenMax.to(this.muteButton.fill, .2, {
                fill: this.config.colors[0],
                ease: Quad.easeOut
            });
        }.bind(this));
        if (this.config.customControlsMobile) {
            TweenMax.set([ this.playButton, this.muteButton ], {
                scale: 1.5
            });
        }
        this.playButton.classList.remove("pause");
        this.playButton.tween.play();
    };
    iVideoModule.prototype.setTracking = function setTracking() {};
    iVideoModule.prototype.timeStep = function timeStep() {
        if (this.video.getDuration()) {
            this.setTimeDisplay();
            var p = this.video.getCurrentTime() / this.video.getDuration();
            if (!this.barFill.seeking) this.barFill.style.width = p * 100 + "%";
        }
        this.dispatchEvents(temple.events.VideoEvents.TIMER, {
            currentTime: this.video.getCurrentTime(),
            duration: this.video.getDuration() || 0,
            target: this
        });
        switch (Math.round(p * 100)) {
          case 25:
            this.dispatchEvents(temple.events.VideoEvents.FIRST_QUARTER, {
                target: this
            });
            temple.utils.tracker("Video " + this.currentVideo.id + " 25%", false);
            break;

          case 50:
            this.dispatchEvents(temple.events.VideoEvents.SECOND_QUARTER, {
                target: this
            });
            temple.utils.tracker("Video " + this.currentVideo.id + " 50%", false);
            break;

          case 75:
            this.dispatchEvents(temple.events.VideoEvents.THIRD_QUARTER, {
                target: this
            });
            temple.utils.tracker("Video " + this.currentVideo.id + " 75%", false);
            break;
        }
    };
    iVideoModule.prototype.enableCustomControls = function enableCustomControls() {
        this.controls.show();
        this.clickArea.show();
        if (this._video) this._video.removeAttribute("controls");
    };
    iVideoModule.prototype.disableCustomControls = function disableCustomControls() {
        this.controls.hide();
        this.clickArea.hide();
        if (this._video) this._video.setAttribute("controls", "controls");
    };
    iVideoModule.prototype.enableControls = function enableCustomControls() {
        this.clickArea.hide();
        if (this._video) this._video.setAttribute("controls", "controls");
    };
    iVideoModule.prototype.disableControls = function disableCustomControls() {
        this.clickArea.show();
        if (this._video) this._video.removeAttribute("controls");
    };
    iVideoModule.prototype.attachScrubber = function attachScrubber(target) {
        this.bar.parentElement.removeChild(this.bar);
        target.appendChild(this.bar);
    };
    iVideoModule.prototype.detachScrubber = function detachScrubber() {
        this.bar.parentElement.removeChild(this.bar);
        this.controls.appendChild(this.bar);
    };
    iVideoModule.prototype.startTimer = function startTimer() {
        clearInterval(this.timer);
        this.playing = true;
        this.timer = setInterval(function setInterval() {
            this.timeStep();
        }.bind(this), 10);
        this.timeStep();
    };
    iVideoModule.prototype.stopTimer = function stopTimer() {
        this.playing = false;
        clearInterval(this.timer);
    };
    iVideoModule.prototype.dispatchEvents = function dispatchEvents(event, args) {
        args.currentSource = this.currentVideo;
        this.dispatchEvent(event, args);
        this.controller.dispatchEvent(event, args);
        this.controller.dispatchVideoEvent(event, args);
    };
    iVideoModule.prototype.close = function close(dispatchEvent) {
        this.hide();
        if (dispatchEvent != false) {
            this.dispatchEvents(temple.events.VideoEvents.CLOSE, {
                target: this
            });
        }
    };
    iVideoModule.prototype.showLayer = function addLayer(id) {
        if (this.layers[id]) {
            this.layers[id].show();
        } else {
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].show();
            }
        }
    };
    iVideoModule.prototype.hideLayer = function addLayer(id) {
        if (this.layers[id]) {
            this.layers[id].hide();
        } else {
            for (var i = 0; i < this.layers.length; i++) {
                this.layers[i].hide();
            }
        }
    };
    iVideoModule.prototype.addLayer = function addLayer(el) {
        var target = arguments[0].element || el;
        if (target.parentElement) target.parentElement.removeChild(target);
        if (arguments[0].interactive === true) this.iPanelContainer.insertBefore(target, this.iPanelContainer.children[arguments[0].zindex]); else this.panelContainer.insertBefore(target, this.panelContainer.children[arguments[0].zindex]);
        target.setAttribute("parentID", this.prefix + this.config.containers[this.id]);
        this.layers.push(target);
        if (arguments[0].source != undefined) this.controller.getSource(arguments[0].source).addLayer(target, this);
    };
    iVideoModule.prototype.setTween = function setTween(data) {
        this.tweenParams = data;
        this.tweenParams.time = this.tweenParams.time || .5;
        this.tweenParams.paused = true;
        this.tween = TweenMax.to(this.wrapper, this.tweenParams.time, this.tweenParams);
    };
    iVideoModule.prototype.show = function show() {
        if (this.tween) {
            if (this.tween.progress() > 0 && this.tween.progress() < 1) return;
            if (this.tweenParams.css) this.tweenParams = this.tweenParams.css;
            this.tween.seek(this.tweenParams.css ? this.tweenParams.css.time : this.tweenParams.time, false);
            TweenMax.set(this.wrapper, this.tweenParams);
            this.tween.reverse();
        }
        this.startHide = false;
        this.wrapper.show();
    };
    iVideoModule.prototype.hide = function hide(noTween) {
        this.pause(null, false);
        this.container.hide();
        if (!this.startHide && this.tween && !arguments[0] && !noTween) {
            this.startHide = true;
            this.tween.vars.onComplete = this.hide.bind(this, true);
            this.tween.seek(0);
            this.tween.play();
            return;
        } else {
            if (!this.startHide && this.tween) this.tween.progress(1).pause();
        }
        if (this.startHide && !arguments[0]) return;
        this.startHide = false;
        this.wrapper.hide();
        this.stopTimer();
        this.active = false;
        this.dispatchEvents(temple.events.VideoEvents.HIDE, {
            target: this
        });
        this.exitFullscreen();
    };
    iVideoModule.prototype.enterFullscreen = function enterFullscreen(e) {
        e = e || this.wrapper;
        this.resize({
            width: "100%",
            height: "100%"
        });
        if (e.requestFullscreen) {
            e.requestFullscreen();
        } else if (e.mozRequestFullScreen) {
            e.mozRequestFullScreen();
        } else if (e.webkitRequestFullscreen) {
            e.webkitRequestFullscreen();
        } else if (e.msRequestFullscreen) {
            e.msRequestFullscreen();
        }
    };
    iVideoModule.prototype.exitFullscreen = function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        if (temple.isiOS && this._video) {
            this._video.webkitExitFullscreen();
        }
    };
    iVideoModule.prototype.onVideoPlay = function onVideoPlay() {
        this.startTimer();
        this.container.show();
        this.playButton.classList.add("pause");
        this.playButton.tween.reverse();
        if (this.config.controlsAutoHide && this.config.controlsAutoHide[this.id]) {
            TweenMax.to(this.controls, 2, {
                alpha: 0,
                delay: 2,
                ease: Cubic.easeOut
            });
        }
        this.currentVideo.duration = this.video.duration;
        this.dispatchEvents(temple.events.VideoEvents.PLAY, {
            target: this
        });
        if (this.autoplay == true) {
            this.autoplay = false;
            this.controller.banner.show(true);
        }
        temple.utils.tracker("Video " + this.currentVideo.id + " Play");
        this.currentVideo.plays++;
    };
    iVideoModule.prototype.onVideoPause = function onVideoPause() {
        this.playButton.classList.remove("pause");
        this.playButton.tween.play();
    };
    iVideoModule.prototype.onVideoClick = function onVideoClick() {
        if (!this.playing && this.active || temple.isiOS && !temple.isiOS9up) {
            this.resume();
            return;
        }
        this.dispatchEvents(temple.events.VideoEvents.CLICK, {
            target: this
        });
    };
    iVideoModule.prototype.onFullscreenChange = function onFullscreenChange() {
        var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        if (!isFullScreen) this.onPlayerExitFullscreen();
    };
    iVideoModule.prototype.onPlayerExitFullscreen = function onPlayerExitFullscreen() {
        this.dispatchEvents(temple.events.VideoEvents.EXIT_FULLSCREEN, {
            target: this
        });
        this.resize(this.previousSize);
    };
    iVideoModule.prototype.onVideoEnded = function onVideoEnded() {
        if (this.currentVideo.hideOnComplete) {
            this.hide();
        }
        this.initPlay = true;
        this.stopTimer();
        this.playing = false;
        this.playButton.classList.remove("pause");
        this.playButton.tween.play();
        this.barFill.style.width = "100%";
        this.barFill.current = this.barFill.style.width;
        this.setTimeDisplay();
        this.dispatchEvents(temple.events.VideoEvents.COMPLETE, {
            target: this
        });
        temple.utils.tracker("Video " + this.currentVideo.id + " Complete");
        this.currentVideo.completed++;
    };
    return iVideoModule;
}(temple.core.Module);

temple.VideoController = temple.modules.VideoController;

Object.assign(temple.events, {
    VideoEvents: {
        HIDE: "video_hide",
        CLICK: "video_click",
        COMPLETE: "video_complete",
        BUFFERING: "buffering",
        TIMER: "video_timer",
        CLOSE: "video_close",
        STOP: "video_stop",
        MUTE: "video_mute",
        UNMUTE: "video_unmute",
        FIRST_QUARTER: "first_quarter",
        SECOND_QUARTER: "second_quarter",
        THIRD_QUARTER: "third_quarter",
        AUTOPLAY: "video_autoplay",
        PLAY: "video_play",
        PAUSE: "video_pause"
    }
});

temple.modules.dc = temple.modules.dc || {};

temple.modules.DynamicModule = function(_super) {
    __extends(DynamicModule, _super);
    function DynamicModule(data) {
        this.version = "1.1.1";
        this.index = arguments[0].sheetIndex || 0;
        this._data = this.data = arguments[0].data || data;
        Enabler.setDevDynamicContent(this.data);
        this.data = dynamicContent;
        this._data = dynamicContent;
        for (var k in this.data) {
            if (k != "_profileid") break;
        }
        this.data = this.data[k][this.index];
        this.setContent();
    }
    DynamicModule.prototype.initDynamicModule = function initDynamicModule() {
        this.done();
    };
    DynamicModule.prototype.setContent = function setContent() {
        this.dynamicElements = document.querySelectorAll("[data-dynamic]");
        if (document.body.hasAttribute("data-dynamic-exit")) {
            this.exitURLs = this.parseDataArray("exit");
        }
        if (document.body.hasAttribute("data-dynamic-video")) {
            temple.config.video.sources = this.parseDataArray("video");
        }
        for (var i = 0; i < this.dynamicElements.length; i++) {
            var d = this.dynamicElements[i].getAttribute("data-dynamic");
            d = eval("this.data." + d);
            if (this.dynamicElements[i].nodeName == "IMG") {
                this.imagesToLoad = this.imagesToLoad + 1 || 1;
                this.dynamicElements[i].onload = this.imageLoaded.bind(this);
                this.dynamicElements[i].src = d;
            } else {
                this.dynamicElements[i].innerHTML = d;
            }
        }
        if (!this.imagesToLoad) this.initDynamicModule();
    };
    DynamicModule.prototype.imageLoaded = function imageLoaded(e) {
        this.imagesLoaded = this.imagesLoaded + 1 || 1;
        if (this.imagesLoaded == this.imagesToLoad) {
            this.initDynamicModule();
        }
    };
    DynamicModule.prototype.getContent = function getContent(a) {
        return this._data[a][0];
    };
    DynamicModule.prototype.parseDataArray = function parseDataArray(a) {
        var s = [];
        var v = document.body.getAttribute("data-dynamic-" + a);
        v = v.split(",");
        for (var i = 0; i < v.length; i++) {
            var d = eval("this.data." + v[i]).split(",");
            s = s.concat(d);
        }
        return s;
    };
    return DynamicModule;
}(temple.core.Module);

temple.DynamicModule = temple.modules.DynamicModule;

temple.modules.VideoModule = function(_super, id, controller) {
    __extends(VideoModule, _super);
    function VideoModule(id, controller) {
        this._construct(id, controller);
        this.version = "2.3.0";
    }
    VideoModule.prototype.createPlayer = function createPlayer(id) {
        temple.PlayerState = {
            ENDED: "ended",
            PLAYING: "loadeddata",
            PAUSED: "pause",
            CUED: "loadstart",
            BUFFERING: "play",
            LOADED: "loadeddata",
            VOLUME: "volumechange"
        };
        this._video = document.createElement("video");
        this._video.width = this.config.size[id] ? this.config.size[id].width : this.config.size[0].width;
        this._video.height = this.config.size[id] ? this.config.size[id].height : this.config.size[0].height;
        this._video.addEventListener("ended", this.onStateChanged.bind(this));
        this._video.addEventListener("play", this.onStateChanged.bind(this));
        this._video.addEventListener("pause", this.onStateChanged.bind(this));
        this._video.addEventListener("volumechange", this.onStateChanged.bind(this));
        this._video.addEventListener("loadeddata", this.onStateChanged.bind(this));
        this.spinner = document.createElement("div");
        this.wrapper.insertBefore(this.spinner, this.wrapper.firstChild);
        this.spinner.classList.add("spinner");
        this.spinner.innerHTML = '<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"> <stop stop-color="#fff" stop-opacity="0" offset="0%"/> <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/> <stop stop-color="#fff" offset="100%"/> </linearGradient> </defs> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)"> <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/> </path> <circle fill="#fff" cx="36" cy="18" r="1"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/> </circle> </g> </g></svg>';
        temple.utils.createStyle(".spinner", "position:absolute;top:50%;left:50%;width:38px;height:38px;transform:translate(-50%,-50%)");
        this._video.removeAttribute("controls");
        this.container.appendChild(this._video);
        this.video = {
            cueVideoById: function(src) {
                if (typeof Enabler != "undefined") {
                    this._video.src = Enabler.getUrl(src);
                } else {
                    this._video.src = src;
                }
            }.bind(this),
            getDuration: function() {
                return this._video.duration;
            }.bind(this),
            getCurrentTime: function() {
                return this._video.currentTime;
            }.bind(this),
            isMuted: function() {
                return this._video.muted;
            }.bind(this),
            pauseVideo: function() {
                this._video.pause();
            }.bind(this),
            playVideo: function() {
                this._video.play();
            }.bind(this),
            unMute: function() {
                this._video.muted = false;
            }.bind(this),
            mute: function() {
                this._video.muted = true;
            }.bind(this),
            seekTo: function(t) {
                this._video.currentTime = t;
            }.bind(this)
        };
        this.resize();
        this.setEvents();
        this.hide(true);
        this.done();
        if (temple.isMobile) {
            this.setSource(0);
            this._video.setAttribute("autoplay", "");
            this._video.setAttribute("playsinline", "");
            this._video.setAttribute("muted", "");
        }
    };
    VideoModule.prototype.togglePlay = function togglePlay() {
        if (this._video.paused) {
            this.resume();
        } else {
            this.pause();
        }
    };
    VideoModule.prototype.stop = function stop() {
        if (!this.active) return;
        _super.prototype.stop.call(this);
    };
    VideoModule.prototype.getPlayerState = function getPlayerState() {
        if (this.active === false) {
            return 0;
        } else {
            if (this._video.ended) return "ended"; else return "idle";
        }
    };
    VideoModule.prototype.setTracking = function setTracking() {
        if (this.controller.banner.setVideoTracking) this.controller.banner.setVideoTracking(this);
    };
    return VideoModule;
}(temple.modules.iVideoModule);

function ___tracking___() {
    Enabler.counter("Video 0 Play");
    Enabler.counter("Video 0 Pause");
    Enabler.counter("Video 0 UnMute");
    Enabler.counter("Video 0 Mute");
    Enabler.counter("Video 0 25%", false);
    Enabler.counter("Video 0 50%", false);
    Enabler.counter("Video 0 75%", false);
    Enabler.counter("Video 0 Complete");
}