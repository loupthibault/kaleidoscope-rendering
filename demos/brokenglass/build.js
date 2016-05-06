(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = 640;
var height = 360;
var scale = 1;

var canvas = document.querySelector('canvas');
var video = document.querySelector('video');

var canvasVideo = document.createElement('canvas');
var context = canvasVideo.getContext('2d');

canvasVideo.width = width;
canvasVideo.height = height;

var settings = {
  canvas: canvas,
  source: canvasVideo,
  size: { w: width, h: height },
  preload: true,
  drawSource: false,
  masks: [{
    src: 'demos/images/glass/broken-glass-a.svg',
    effects: {
      scale: 1.1,
      delta: {
        x: -10,
        y: 10
      }
    }
  }, {
    src: 'demos/images/glass/broken-glass-b.svg',
    effects: {
      scale: 1,
      delta: {
        x: -10,
        y: -5
      }
    }
  }, {
    src: 'demos/images/glass/broken-glass-c.svg',
    effects: {
      scale: 1.2,
      delta: {
        x: 0,
        y: -20
      }
    }
  }, {
    src: 'demos/images/glass/broken-glass-d.svg',
    effects: {
      scale: 1.15
    }
  }, {
    src: 'demos/images/glass/broken-glass-e.svg',
    effects: {
      scale: 1.3,
      delta: {
        x: -10,
        y: 20
      }
    }
  }]
};

var ka = new _index2.default(settings);

draw();

function draw() {

  context.drawImage(video, 0, 0, width, height);
  ka.render();
  requestAnimationFrame(draw);
}

},{"../../index":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kaleidoscope = function () {

  //-------------------------------------------- constructor

  /**
   * kaleidoscope.
   * @param {Object} settings
   * @constructor
   */

  function Kaleidoscope() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Kaleidoscope);

    this._canvas = opts.canvas || document.createElement('canvas');
    this._size = opts.size || {
      w: document.documentElement.clientWidth || window.innerWidth,
      h: document.documentElement.clientHeight || window.innerHeight
    };

    this._masks = opts.masks;
    this._bDrawSource = opts.drawSource === false ? false : true;

    this._lnLoadedMasks = 0;
    this._lnMasks = this._masks.length;

    this.setSource(opts.source);
    this._initCanvas();
    this._resize();
    if (opts.preload) this.load();
  }

  //-------------------------------------------- public methods

  /**
   * Get the HTMLCanvasElement element
   */


  _createClass(Kaleidoscope, [{
    key: 'isReady',


    /**
     * Return if Kaleidoscope is ready or not
     * @return {Boolean}
     */
    value: function isReady() {
      return this._lnMasks === this._lnLoadedMasks;
    }

    /**
     * Load all Masks
     */

  }, {
    key: 'load',
    value: function load() {
      if (!this._isReady) this._loadNextMask();
    }

    /**
     * Set the canvas size
     * @param  {Number} width
     * @param  {Number} height
     */

  }, {
    key: 'setSize',
    value: function setSize(width, height) {
      if (this._size.w === width && this._size.h === height) return;
      this._size.w = width;
      this._size.h = height;
      this._resize();
    }

    /**
     * Set the source
     * @param  {Object} the source to draw
     */

  }, {
    key: 'setSource',
    value: function setSource(pSource) {
      if (pSource === undefined || pSource === null) return;

      if (!(pSource instanceof HTMLCanvasElement || pSource instanceof HTMLImageElement || pSource instanceof Image)) throw new Error('Kaleidoscope.setSource() -- source is not in the appropriated format');

      this._sourceToDraw = pSource;
      this._sourceRect = this._getSourceRect();
    }

    /**
     * Return the masks (usefull to make live modification on the render)
     * @return  {Array} masks
     */

  }, {
    key: 'getMasks',
    value: function getMasks() {
      return this._masks;
    }

    /**
     * Render the Kaleidoscope
     */

  }, {
    key: 'render',
    value: function render() {
      if (!this.isReady()) return;
      this._context.clearRect(0, 0, this._size.w, this._size.h);

      if (this._bDrawSource) {
        this._context.drawImage(this._sourceToDraw, this._sourceRect.x, this._sourceRect.y, this._sourceRect.width, this._sourceRect.height);
      }

      this._drawMasks();
    }

    /**
     * Dispose the Kaleidoscope
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      if (this._masks) {
        while (this._masks.length) {
          var m = this._masks.shif();
          m.img && (m.img.onload = null);
          m.img = null;
          m = null;
        }
      }

      if (this._canvas && this._canvas.parentNode) this._canvas.parentNode.removeChild(this._canvas);

      this._masks = null;
      this._context = null;
      this._tmpContext = null;
      this._canvas = null;
      this._tmpCanvas = null;
    }

    //-------------------------------------------- events

  }, {
    key: '_onMaskLoaded',
    value: function _onMaskLoaded(pEvt) {
      var mask = pEvt.currentTarget;
      var maskData = this._masks[this._lnLoadedMasks];

      maskData.src = mask;
      maskData.width = maskData.width || mask.width;
      maskData.height = maskData.height || mask.height;

      ++this._lnLoadedMasks;

      if (this.isReady()) {
        this.render();
      } else {
        this._loadNextMask();
      }
    }

    //-------------------------------------------- private methods

  }, {
    key: '_initCanvas',
    value: function _initCanvas() {
      this._context = this._canvas.getContext('2d');
      this._tmpCanvas = document.createElement('canvas');
      this._tmpContext = this._tmpCanvas.getContext('2d');
    }
  }, {
    key: '_loadNextMask',
    value: function _loadNextMask() {
      var mask = this._masks[this._lnLoadedMasks];
      var img = new Image();
      img.onload = this._onMaskLoaded.bind(this);
      img.src = mask.src;
      mask.img = img;
    }

    //-------------------------- draw

  }, {
    key: '_drawMasks',
    value: function _drawMasks() {
      var ln = this._lnMasks;
      while (--ln > -1) {
        this._drawMask(this._masks[ln]);
      }
    }
  }, {
    key: '_drawMask',
    value: function _drawMask(pMaskData) {

      var rectMask = this._getRect(pMaskData.width, pMaskData.height);

      // clear
      this._tmpContext.save();
      this._tmpContext.clearRect(0, 0, this._size.w, this._size.h);

      // draw mask
      this._tmpContext.drawImage(pMaskData.src, rectMask.x, rectMask.y, rectMask.width, rectMask.height);

      // set global composite
      this._tmpContext.globalCompositeOperation = 'source-atop';

      // apply effects
      this._applyEffects(pMaskData.effects);

      // draw source
      this._tmpContext.drawImage(this._sourceToDraw, this._sourceRect.x, this._sourceRect.y, this._sourceRect.width, this._sourceRect.height);

      // restore
      this._tmpContext.restore();

      // draw to canvas's context
      this._context.drawImage(this._tmpCanvas, 0, 0);
    }

    //-------------------------- effects

  }, {
    key: '_applyEffects',
    value: function _applyEffects(pMaskEffects) {
      if (pMaskEffects.delta) this._delta(pMaskEffects.delta);
      if (pMaskEffects.rotate !== 0) this._rotate(pMaskEffects.rotate);
      if (pMaskEffects.scale !== 1) this._scale(pMaskEffects.scale);
      if (pMaskEffects.flip) this._flip(pMaskEffects.flip);
    }
  }, {
    key: '_flip',
    value: function _flip(pValue) {
      if (pValue === 'X') {
        this._tmpContext.translate(this._size.w, 0);
        this._tmpContext.scale(-1, 1);
      }
      if (pValue === 'Y') {
        this._tmpContext.translate(0, this._size.h);
        this._tmpContext.scale(1, -1);
      }
      if (pValue === 'XY') {
        this._tmpContext.translate(this._size.w, this._size.h);
        this._tmpContext.scale(-1, -1);
      }
    }
  }, {
    key: '_rotate',
    value: function _rotate(pValue) {
      // Convert degrees to radians.
      var radians = pValue * (Math.PI / 180);
      // Move registration point to the center of the canvas.
      this._tmpContext.translate(this._size.w / 2, this._size.h / 2);
      // Apply rotation.
      this._tmpContext.rotate(radians);
      // Move registration point back to the top left corner of canvas.
      this._tmpContext.translate(-this._size.w / 2, -this._size.h / 2);
    }
  }, {
    key: '_delta',
    value: function _delta(pValue) {
      this._tmpContext.translate(pValue.x, pValue.y);
    }
  }, {
    key: '_scale',
    value: function _scale(pValue) {
      this._tmpContext.translate((this._size.w - this._size.w * pValue) / 2, (this._size.h - this._size.h * pValue) / 2);
      this._tmpContext.scale(pValue, pValue);
    }

    //-------------------------- resize & rect

  }, {
    key: '_resize',
    value: function _resize() {
      this._canvas.width = this._size.w;
      this._canvas.height = this._size.h;
      this._tmpCanvas.width = this._size.w;
      this._tmpCanvas.height = this._size.h;
      this._sourceRect = this._getSourceRect();

      this._canvas.style.width = this._size.w + 'px';
      this._canvas.style.height = this._size.h + 'px';
    }
  }, {
    key: '_getSourceRect',
    value: function _getSourceRect() {

      var ww, hh;

      if (this._sourceToDraw instanceof HTMLCanvasElement || this._sourceToDraw instanceof HTMLImageElement || this._sourceToDraw instanceof Image) {
        ww = this._sourceToDraw.width;
        hh = this._sourceToDraw.height;
      } else if (this._sourceToDraw instanceof HTMLVideoElement) {
        var b = this._sourceToDraw.getBoundingClientRect();
        ww = b.width;
        hh = b.height;
      }

      return this._getRect(ww, hh);
    }
  }, {
    key: '_getRect',
    value: function _getRect(pWidth, pHeight) {
      var sc = Math.max(this._size.w / pWidth, this._size.h / pHeight);
      var ww = pWidth * sc;
      var hh = pHeight * sc;
      var xx = (this._size.w - ww) / 2;
      var yy = (this._size.h - hh) / 2;

      return {
        x: xx,
        y: yy,
        width: ww,
        height: hh
      };
    }
  }, {
    key: 'el',
    get: function get() {
      return this._canvas;
    }
  }]);

  return Kaleidoscope;
}();

exports.default = Kaleidoscope;

},{}]},{},[1]);
