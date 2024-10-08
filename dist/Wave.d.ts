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
    static types: WaveType[];
    static PI2: number;
    speed: number;
    amplitude: number;
    wavelength: number;
    segmentLength: number;
    lineWidth: number;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    type: WaveType;
    easingFunction: (percent: number, amplitude: number) => number;
    compute: (x: number) => number;
    constructor({ speed, amplitude, wavelength, segmentLength, lineWidth, strokeStyle, type, easingFunction, }: WaveOptions);
    sine(x: number): number;
    square(x: number): number;
    sawTooth(x: number): number;
    triangle(x: number): number;
    /**
     * Sets the wave type.
     *
     * @param      {function}  type  The type
     */
    setType(type: WaveType): void;
    /**
     * Sets the easingFunction.
     *
     * @param      {function}  easingFunction  The easingFunction
     */
    setEasingFunction(easingFunction: (percent: number, amplitude: number) => number): void;
    /**
     * Sets the strokeStyle.
     *
     * @param      {string}  strokeStyle  The strokeStyle
     */
    setStrokeStyle(strokeStyle: string | CanvasGradient | CanvasPattern): void;
    /**
     * Sets the lineWidth.
     *
     * @param      {number}  lineWidth  The lineWidth
     */
    setlineWidth(lineWidth: number): void;
    /**
     * Sets the segmentLength.
     *
     * @param      {number}  segmentLength  The segmentLength
     */
    setSegmentLength(segmentLength: number): void;
    /**
     * Sets the wavelength.
     *
     * @param      {number}  wavelength  The wavelength
     */
    setWavelength(wavelength: number): void;
    /**
     * Sets the amplitude.
     *
     * @param      {number}  amplitude  The amplitude
     */
    setAmplitude(amplitude: number): void;
    /**
     * Sets the speed.
     *
     * @param      {number}  speed   The speed
     */
    setSpeed(speed: number): void;
}
//# sourceMappingURL=Wave.d.ts.map