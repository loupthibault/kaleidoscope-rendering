import Kaleidoscope from '../../index';

const width = 640;
const height = 360;
const scale = 1;

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
      src: 'demos/images/glass/broken-glass-a.svg',
      effects: {
        scale:1.1,
        delta: {
          x:-10,
          y:10
        }
      }
    }
    ,
    {
      src: 'demos/images/glass/broken-glass-b.svg',
      effects: {
        scale:1,
        delta: {
          x:-10,
          y:-5
        }
      }
    }
    ,
    {
      src: 'demos/images/glass/broken-glass-c.svg',
      effects: {
        scale:1.2,
        delta: {
          x:0,
          y:-20
        }
      }
    }
    ,
    {
      src: 'demos/images/glass/broken-glass-d.svg',
      effects: {
        scale:1.15
      }
    }
    ,
    {
      src: 'demos/images/glass/broken-glass-e.svg',
      effects: {
        scale:1.3,
        delta: {
          x:-10,
          y:20
        }
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
