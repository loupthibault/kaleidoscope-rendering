# kaleidoscope-rendering

Draws Kaleidoscope Like in canvas from image, video or canvas


### Usage

`npm install smooth-scrolling`

```javascript
import Kaleidoscope from 'kaleidoscope-rendering';

const settings = {
  canvas: document.querySelector('canvas'),
  source: document.querySelector('video'),
  masks: [
    {
      src: "mask-a.svg",
      scale: 1.5,
      flip: 'Y'
    },
    {
      src: "mask-b.svg",
      scale: 1,
      flip: 'X'
    }
  ]
};

const kal = new Kaleidoscope(settings);

kal.render();

```

#### Important

- Each mask will be render in the order they are provided.

### Options

| Name       | Type     | Default | Description |
|------------|----------|---------|-------------|
|`canvas`    | HTMLCanvasElement   | 0       | The canvas where to draw. If unset, a HTMLCanvasElement will be created automatically. You can get it via `kaleidoscope.el` |
|`source`    | Object   | null    | The source to draw and to apply the effect. |
|`size`      | Object    | the window size       | The canvas's size. It's an object made this way `{width:value, height:value}` |
|`masks`     | Array   | null    | An array of all the masks |
|`preload`     | Boolean   | true    | If set to true, will auto preload each mask images |
|`drawSource`     | Boolean   | true    | If set to true, will first draw the source. |

### Methods

#### `kaleidoscope.isReady()`

Tells if all masks are loaded or not.

#### `kaleidoscope.setSize(width, height)`

Change the current size of the canvas.

#### `kaleidoscope.load()`

Load all the masks. Will do nothing if everything is ready.

#### `kaleidoscope.addMask(mask)`

Add a new mask.

#### `kaleidoscope.render()`

Render the kaleidoscope.

#### `kaleidoscope.dispose()`

Dispose the kaleidoscope.

### Masks Options

Every mask can have multiple options.

| Name       | Type     | Default | Description |
|------------|----------|---------|-------------|
| src        | string | nul | The mask source file. |
| rotate  | float | 0 | The rotation to apply in degrees. |
| scale | float | 1 | The scale to apply. |
| delta | object | {x:0, y:0} | The translation to apply.
