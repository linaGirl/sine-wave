# TypeScript Animated Sine Wave Renderer

Easy sine wave rendering without any dependencies.

![alt text](https://github.com/linaGirl/sine-wave/blob/master/wave.png?raw=true)

Options for waves
```typescript

// easing
export type EasingFunctionName = 'static' | 'sineIn' | 'sineOut' | 'sineInOut';
export type TEasingFunction = (percent: number, amplitude: number) => number;

// wave types
export type WaveType = 'sine' | 'square' | 'sawTooth' | 'triangle';

// color gradient
export interface GradientColorStop {
    position: number;
    rgbaValue: string;
}

// wave options type
export interface WaveOption {
    speed: number;
    amplitude: number;
    wavelength: number;
    easingFunction?: EasingFunctionName | TEasingFunction;
    segmentLength?: number;
    lineWidth?: number;
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    type?: WaveType;
}
```

Example for the image above

````typescript
import SineWaveRenderer from 'simple-sine-waves';

window.addEventListener('DOMContentLoaded', () => {
    const renderer = new SineWaveRenderer({
        element: document.getElementById('test'), // some canvas element
        displayWidth: '100%',
        waves: [{
            amplitude: -200,
            wavelength: 200,
            speed: 0.3
        }, {
            amplitude: -250,
            wavelength: 220,
            speed: 0.35
        }, {
            amplitude: -300,
            wavelength: 240,
            speed: 0.4
        }, {
            amplitude: -350,
            wavelength: 260,
            speed: 0.45
        }, {
            amplitude: -400,
            wavelength: 280,
            speed: 0.5
        }, {
            amplitude: -450,
            wavelength: 300,
            speed: 0.55
        }, {
            amplitude: -500,
            wavelength: 320,
            speed: 0.6
        }],
        gradient: [{
            position: 0,
            rgbaValue: 'rgba(255, 255, 255, .4)',
        }, {
            position: 0.4,
            rgbaValue: 'rgba(11, 160, 229, 0.7)',
        }, {
            position: 0.6,
            rgbaValue: 'rgba(251, 28, 166, 0.7)',
        }, {
            position: 1,
            rgbaValue: 'rgba(255, 255, 255, .5)',
        }]
    });

    renderer.render();
});
````


Some variations


![alt text](https://github.com/linaGirl/sine-wave/blob/master/example-1.png?raw=true)
![alt text](https://github.com/linaGirl/sine-wave/blob/master/example-2.png?raw=true)
![alt text](https://github.com/linaGirl/sine-wave/blob/master/example-3.png?raw=true)
![alt text](https://github.com/linaGirl/sine-wave/blob/master/example-4.png?raw=true)
