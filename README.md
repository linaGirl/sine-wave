# TypeScript Animated Sine Wave Renderer

![alt text](https://github.com/linaGirl/sine-wave/blob/master/wave.png?raw=true)

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