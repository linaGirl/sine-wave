/**
 * representation of a wave
 *
 * @author     Lina van der Weg <lina@vanderweg.ch>
 * @license    MIT
 *
 * @class      Wave
 */


export type WaveType = 'sine' | 'square' | 'sawTooth' | 'triangle';

export interface WaveOptions {
    speed: number;
    amplitude: number;
    wavelength: number;
    segmentLength?: number;
    lineWidth?: number;
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    type?: WaveType;
    easingFunction?: (percent: number, amplitude: number) => number;
}

export default class Wave {

    static types : WaveType[] = ['sine', 'square', 'sawTooth', 'triangle'];
    static PI2 : number = Math.PI * 2;

    speed: number;
    amplitude: number;
    wavelength: number;
    segmentLength: number;
    lineWidth: number;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    type: WaveType;
    easingFunction: (percent: number, amplitude: number) => number;
    compute: (x: number) => number;


    constructor({
        speed = 1,
        amplitude,
        wavelength,
        segmentLength = 10,
        lineWidth = 1,
        strokeStyle = 'rgba(0, 0, 0, 0.2)',
        type = 'sine',
        easingFunction,
    } : WaveOptions) {
        this.setSpeed(speed);
        this.setAmplitude(amplitude);
        this.setWavelength(wavelength);
        this.setSegmentLength(segmentLength);
        this.setlineWidth(lineWidth);
        this.setStrokeStyle(strokeStyle);
        // @ts-ignore
        this.setEasingFunction(easingFunction);
        this.setType(type);
    }



    sine(x: number) : number {
        return Math.sin(x);
    }


    square(x: number) : number {
        return Math.sign(Math.sin(x * Wave.PI2));
    }


    sawTooth(x: number) : number {
        return (x - Math.floor(x + 0.5)) * 2;
    }


    triangle(x: number) : number {
        return Math.abs(this.sawTooth(x));
    }


    /**
     * Sets the wave type.
     *
     * @param      {function}  type  The type
     */
    setType(type: WaveType) : void {
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
    setEasingFunction(easingFunction: (percent: number, amplitude: number) => number) {
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
    setStrokeStyle(strokeStyle: string | CanvasGradient | CanvasPattern) : void {
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
    setlineWidth(lineWidth: number) : void {
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
    setSegmentLength(segmentLength: number) : void {
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
    setWavelength(wavelength: number) : void {
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
    setAmplitude(amplitude : number) : void {
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
    setSpeed(speed : number) : void {
        if (typeof speed !== 'number') {
            throw new Error(`Invalid wave option 'speed': expected a number!`);
        }

        this.speed = speed;
    }
}