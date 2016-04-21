import Kaleidoscope from '../../index';




const canvas = document.querySelector('canvas');
const img = new Image();
img.onload = draw;
img.src = "demos/images/king.jpg"


function draw() {

  const scale = 1;
  const width = 650;
  const height = 400;

  const settings = {
    canvas: canvas,
    source: img,
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
    ka.render();
  // requestAnimationFrame(draw);
}
