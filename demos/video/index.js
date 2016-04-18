import Kaleidoscope from '../../index';

const settings = {
  canvas: document.querySelector('canvas'),
  source: document.querySelector('video'),
  size: {w:640, h:360},
  preload: true,
  masks : [
    {
      src: 'demos/images/masks/kalei-a.svg',
      effects: {
        flip: false,
        rotate: 0,
        scale: 1.5,
        delta: {x:50, y:0}
      }
    }
    ,
    {
      src: 'demos/images/masks/kalei-b.svg',
      effects: {
        flip: false,
        rotate: 30,
        scale: 1.5,
        delta: {x:-50, y:20}
      }
    }
    ,
    {
      src: 'demos/images/masks/kalei-c.svg',
      effects: {
        flip: 'X',
        rotate: 0,
        scale: 1.3,
        delta: {x:0, y:50}
      }
    }
  ]
};

const ka = new Kaleidoscope(settings);
draw();

function draw() {
  ka.render();
  requestAnimationFrame(draw);
}
