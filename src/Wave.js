/**
 * representation of a wave
 *
 * @author     Lina van der Weg <lina@vanderweg.ch>
 * @license    MIT
 *
 * @class      Wave
 */
export default class Wave {


    static types = ['sine', 'square', 'sawTooth', 'triangle'];
    static PI2 = Math.PI * 2;


    constructor({
        speed = 1,
        amplitude,
        wavelength,
        segmentLength = 10,
        lineWidth = 1,
        strokeStyle = 'rgba(0, 0, 0, 0.2)',
        type = 'sine',
        easingFunction,
    }) {
        this.setSpeed(speed);
        this.setAmplitude(amplitude);
        this.setWavelength(wavelength);
        this.setSegmentLength(segmentLength);
        this.setlineWidth(lineWidth);
        this.setStrokeStyle(strokeStyle);
        this.setEasingFunction(easingFunction);
        this.setType(type);
    }



    sine(x) {
        return Math.sin(x);
    }


    square(x) {
        return Math.sign(Math.sin(x * Wave.PI2));
    }


    sawTooth(x) {
        return (x - Math.floor(x + 0.5)) * 2;
    }


    triangle(x) {
        return Math.abs(this.sawTooth(x));
    }


    /**
     * Sets the wave type.
     *
     * @param      {function}  type  The type
     */
    setType(type) {
        if (typeof type !== 'string') {
            throw new Error(`Invalid wave option 'type': expected a string!`);
        }

        if (!Wave.types.includes(type)) {
            throw new Error(`Invalid wave option 'type': expexted one of ${Wave.types.join(', ')}`);
        }

        this.type = type;
        this.compute = this[type];
    }


    /**
     * Sets the easingFunction.
     *
     * @param      {function}  easingFunction  The easingFunction
     */
    setEasingFunction(easingFunction) {
        if (typeof easingFunction !== 'function') {
            throw new Error(`Invalid wave option 'strokeStyle': expected a function!`);
        }

        this.easingFunction = easingFunction;
    }


    /**
     * Sets the strokeStyle.
     *
     * @param      {string}  strokeStyle  The strokeStyle
     */
    setStrokeStyle(strokeStyle) {
        if (typeof strokeStyle !== 'string') {
            throw new Error(`Invalid wave option 'strokeStyle': expected a string!`);
        }

        this.strokeStyle = strokeStyle;
    }


    /**
     * Sets the lineWidth.
     *
     * @param      {number}  lineWidth  The lineWidth
     */
    setlineWidth(lineWidth) {
        if (typeof lineWidth !== 'number') {
            throw new Error(`Invalid wave option 'lineWidth': expected a number!`);
        }

        this.lineWidth = lineWidth;
    }


    /**
     * Sets the segmentLength.
     *
     * @param      {number}  segmentLength  The segmentLength
     */
    setSegmentLength(segmentLength) {
        if (typeof segmentLength !== 'number') {
            throw new Error(`Invalid wave option 'segmentLength': expected a number!`);
        }

        this.segmentLength = segmentLength;
    }


    /**
     * Sets the wavelength.
     *
     * @param      {number}  wavelength  The wavelength
     */
    setWavelength(wavelength) {
        if (typeof wavelength !== 'number') {
            throw new Error(`Invalid wave option 'wavelength': expected a number!`);
        }

        this.wavelength = wavelength;
    }


    /**
     * Sets the amplitude.
     *
     * @param      {number}  amplitude  The amplitude
     */
    setAmplitude(amplitude) {
        if (typeof amplitude !== 'number') {
            throw new Error(`Invalid wave option 'amplitude': expected a number!`);
        }

        this.amplitude = amplitude;
    }


    /**
     * Sets the speed.
     *
     * @param      {number}  speed   The speed
     */
    setSpeed(speed) {
        if (typeof speed !== 'number') {
            throw new Error(`Invalid wave option 'speed': expected a number!`);
        }

        this.speed = speed;
    }
}