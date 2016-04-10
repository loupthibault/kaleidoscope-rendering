
export default class Kaleidoscope {

  //-------------------------------------------- constructor

  /**
   * kaleidoscope.
   * @param {Object} settings The PrismSlider settings.
   * @constructor
   */
  constructor(opts={}) {

    // grab params
    this._canvas = opts.canvas || document.createElement('canvas');
    this._size = opts.size || {w:window.innerWidth, h:window.innerHeight};
    this._masks = opts.masks;
    this._sourceToDraw = opts.source;

    this._lnLoadedMasks = 0;
    this._lnMasks = this._masks.length;

    this._sourceRect = this._getSourceRect();

    this._initCanvas();
    this._resize();
    if(opts.preload) this.load();
  }

  //-------------------------------------------- public methods

  get el() { return this._canvas; }

  /**
   * Kaleidoscope ready or not
   * @return {Boolean}
   */
  isReady() {
    return this._lnMasks === this._lnLoadedMasks;
  }

  /**
   * Load all Masks
   */
  load() {
    if(!this._isReady) this._loadNextMask();
  }

  /**
   * Set the canvas size
   * @param  {Number} width
   * @param  {Number} height
   */
  setSize(width, height) {
    if(this._size.x === width && this._size.y === height)return;
    this._size.x = width;
    this._size.y = height;
    this._resize();
  }

  /**
   * Render the Kaleidoscope
   */
  render() {
    if(!this.isReady())return;
    this._context.clearRect(0, 0, this._size.w, this._size.h);

    this._context.drawImage(this._sourceToDraw,
      this._sourceRect.x,
      this._sourceRect.y,
      this._sourceRect.width,
      this._sourceRect.height);

    this._drawMasks();
  }

  /**
   * dispose the Kaleidoscope
   */
  dispose() {

  }

  //-------------------------------------------- events

  _onMaskLoaded(pEvt) {
    const mask = pEvt.currentTarget;
    const maskData = this._masks[this._lnLoadedMasks];

    maskData.src = mask;
    maskData.width = maskData.width || mask.width;
    maskData.height = maskData.height || mask.height;

    ++this._lnLoadedMasks;

    if(this.isReady()) {
      this.render();
    }
    else {
      this._loadNextMask();
    }
  }

  //-------------------------------------------- private methods

  _initCanvas() {
    this._context = this._canvas.getContext('2d');
    this._tmpCanvas = document.createElement('canvas');
    this._tmpContext = this._tmpCanvas.getContext('2d');
  }

  _loadNextMask() {
    const mask = this._masks[this._lnLoadedMasks];
    const img = new Image();
    img.onload = this._onMaskLoaded.bind(this);
    img.src = mask.src;
  }

  //-------------------------- draw

  _drawMasks() {
    var ln = this._lnMasks;
    while(--ln > -1)
      this._drawMask(this._masks[ln]);
  }

  _drawMask(pMaskData) {

    const rectMask = this._getRect(pMaskData.width, pMaskData.height);

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
    this._tmpContext.drawImage(this._sourceToDraw,
      this._sourceRect.x,
      this._sourceRect.y,
      this._sourceRect.width,
      this._sourceRect.height);

    // restore
    this._tmpContext.restore();

    // draw to canvas's context
    this._context.drawImage(this._tmpCanvas, 0, 0);
  }

  //-------------------------- effects

  _applyEffects(pMaskEffects) {
    if (pMaskEffects.flip) this._flip(pMaskEffects.flip);
    if (pMaskEffects.rotate !== 0) this._rotate(pMaskEffects.rotate);
    if (pMaskEffects.scale !== 1) this._scale(pMaskEffects.scale);
  }

  _flip(pValue) {
    if (pValue === 'X') {
      this._tmpContext.translate(this._size.w, 0);
      this._tmpContext.scale(-1, 1);
    }
    if (pValue === 'Y') {
      this._tmpContext.translate(0, this._size.h);
      this._tmpContext.scale(1, -1);
    }
  }

  _rotate(pValue) {
    // Convert degrees to radians.
    const radians = pValue * (Math.PI / 180);
    // Move registration point to the center of the canvas.
    this._tmpContext.translate(this._size.w / 2, this._size.h / 2);
    // Apply rotation.
    this._tmpContext.rotate(radians);
    // Move registration point back to the top left corner of canvas.
    this._tmpContext.translate(-this._size.w / 2, -this._size.h / 2);
  }

  _scale(pValue) {
    this._tmpContext.translate((this._size.w - this._size.w * pValue)/2,  (this._size.h - this._size.h * pValue)/2);
    this._tmpContext.scale(pValue, pValue);
  }

  //-------------------------- resize & rect

  _resize() {
    this._canvas.width = this._size.w;
    this._canvas.height = this._size.h;
    this._tmpCanvas.width = this._size.w;
    this._tmpCanvas.height = this._size.h;
    this._sourceRect = this._getSourceRect();
  }

  _getSourceRect() {

    var ww, hh;

    if(this._sourceToDraw instanceof HTMLCanvasElement || this._sourceToDraw instanceof HTMLImageElement) {
      ww = this._sourceToDraw.width;
      hh = this._sourceToDraw.height;
    }
    else if(this._sourceToDraw instanceof HTMLVideoElement) {
      var b = this._sourceToDraw.getBoundingClientRect();
      ww = b.width;
      hh = b.height;
    }

    return this._getRect(ww, hh);
  }

  _getRect(pWidth, pHeight) {
    const sc = Math.max(this._size.w / pWidth, this._size.h / pHeight);
    const ww = pWidth * sc;
    const hh = pHeight * sc;
    const xx = (this._size.w - ww) /  2;
    const yy = (this._size.h - hh) /  2;

    return {
      x: xx,
      y: yy,
      width: ww,
      height: hh
    }
  }

}
