import Kaleidoscope from '../../index';

const scale = 1;

const settings = {
  canvas: document.querySelector('canvas'),
  source: document.querySelector('video'),
  size: {w:1200, h:960},
  preload: true,
  drawSource: true,
  masks : [
    {
      src: 'demos/images/kalei/kalei-a.svg',
      effects: {
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
        rotate: 120,
        scale: scale,
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-d.svg',
      effects: {
        flip: 'Y',
        scale: scale,
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-e.svg',
      effects: {
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
        rotate: 120,
        delta: {x:-600, y:-480},
        scale: scale
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-h.svg',
      effects: {
        rotate: 60,
        delta: {x:-600, y:480},
        scale: scale
      }
    }
    ,
    {
      src: 'demos/images/kalei/kalei-i.svg',
      effects: {
        rotate: 240,
        delta: {x:600, y:-480},
        scale: scale
      }
    },
    {
      src: 'demos/images/kalei/kalei-j.svg',
      effects: {
        rotate: 300,
        delta: {x:600, y:480},
        scale: scale
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
