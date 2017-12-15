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