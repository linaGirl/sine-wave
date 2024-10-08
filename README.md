# Javascript Sine Wave Renderer

![alt text](https://github.com/linaGirl/sine-wave/blob/master/wave.png?raw=true)

````typescript
import SineWaveRenderer from 'simple-sine-waves';

window.addEventListener('DOMContentLoaded', () => {
    const renderer = new SineWaveRenderer({
        element: document.getElementById('test'), // some canvas element
        displayWidth: '100%',
        waves: [{
            amplitude: -200,
            wavelength: 100,
            speed: 1.2
        }, {
            amplitude: -300,
            wavelength: 200,
            speed: 0.8
        }, {
            amplitude: -400,
            wavelength: 300,
            speed: 0.65
        }, {
            amplitude: -500,
            wavelength: 500,
            speed: 0.5
        }],
        gradient: [{
            position: 0,
            rgbaValue: 'rgba(255, 255, 255, .2)',
        }, {
            position: 0.4,
            rgbaValue: 'rgba(0, 0, 0, 0.1)',
        }, {
            position: 0.6,
            rgbaValue: 'rgba(0, 0, 0, 0.1)',
        }, {
            position: 1,
            rgbaValue: 'rgba(255, 255, 255, .2)',
        }],
    });

    renderer.render();
});
````