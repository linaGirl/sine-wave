import SineWave, { WaveOption } from '../src/SineWaveRenderer.js'



window.addEventListener('DOMContentLoaded', async() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const baseWave : Partial<WaveOption> = {
        easingFunction: 'sineInOut',
        segmentLength: 2,
        lineWidth: 10,
        strokeStyle: 'rgba(255, 255, 255, 0.2)',
        type: 'sine',
    }

    const count = Math.max(Math.round(Math.random() * 15), 3);
    const speed = Math.random();
    const speedVariance = Math.random() * 0.1;
    const amplitude = Math.random() * -100;
    const amplitudeVariance = Math.random() * 500;
    const wavelength = Math.random() * 100;
    const wavelengthVariance = Math.random() * 200;

    const waves : WaveOption[] = [];

    for (let i = 0; i < count; i++) {
        waves.push({
            ...baseWave,
            amplitude: amplitude - i * amplitudeVariance,
            wavelength: wavelength + i * wavelengthVariance,
            speed: speed + i * speedVariance,
        });
    }

    new SineWave({
        element: canvas,
        displayWidth: '100%',
        waves: waves,
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
    }).render();
});

