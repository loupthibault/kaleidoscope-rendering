import Kaleidoscope from '../../index';

const width = 640;
const height = 360;
const scale = 1.2;

const canvas = document.querySelector('canvas');
const video = document.querySelector('video');

const canvasVideo = document.createElement('canvas');
const context = canvasVideo.getContext('2d');

canvasVideo.width = width;
canvasVideo.height = height;

const settings = {
  canvas: canvas,
  source: canvasVideo,
  size: {w:width, h:height},
  preload: true,
  drawSource: false,
  masks : [
    {
      src: 'demos/images/kalei/kalei-a.svg',
      effects: {
        flip: 'X',
        rotate: 0,
        scale: scale
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-b.svg',
      effects: {
        rotate: 60,
        scale: scale,
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-c.svg',
      effects: {
        flip: 'X',
        rotate: 120,
        scale: scale,
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-d.svg',
      effects: {
        flip: 'XY',
        scale: scale,
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-e.svg',
      effects: {
        flip: 'X',
        rotate: 240,
        scale: scale,
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-f.svg',
      effects: {
        rotate: 300,
        scale: scale,
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-g.svg',
      effects: {
        flip: 'X',
        rotate: 120,
        delta: {x:-(width>>1), y:-(height>>1)},
        scale: scale
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-h.svg',
      effects: {
        rotate: 60,
        delta: {x:-(width>>1), y:(height>>1)},
        scale: scale
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-i.svg',
      effects: {
        flip: 'X',
        rotate: 240,
        delta: {x:(width>>1), y:-(height>>1)},
        scale: scale
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-j.svg',
      effects: {
        rotate: 300,
        delta: {x:(width>>1), y:(height>>1)},
        scale: scale
      }
    }
  ]
};

const ka = new Kaleidoscope(settings);

draw();

function draw() {

  context.drawImage(video, 0, 0, width, height);
  ka.render();
  requestAnimationFrame(draw);
}
