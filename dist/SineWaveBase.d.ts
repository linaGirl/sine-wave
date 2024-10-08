import { EasingFunctionName, TEasingFunction } from './EasingFunctions.js';
import Wave from './Wave.js';
import { WaveOptions } from './Wave.js';
/**
 * Base class for the SineWaveRenderer class which provides utility functions
 * and input validation
 *
 * @author     Lina van der Weg <lina@vanderweg.ch>
 * @license    MIT
 *
 * @class      SineWaveBase
 */
export interface SineWaveOptions {
    element: HTMLElement;
    waves: WaveOptions[];
    width: number;
    height: number;
    displayWidth: string | number;
    resizeHandler: () => void;
    easingFunction: TEasingFunction | EasingFunctionName;
    rotation?: number;
    speed?: number;
    paused?: boolean;
    gradient: GradientColorStop[];
}
export interface GradientColorStop {
    position: number;
    rgbaValue: string;
}
export default class SineWaveBase {
    element: HTMLElement;
    waves: Wave[];
    widthValue: number;
    heightValue: number;
    displayWidth: number;
    displayWidthPercentage: number;
    resizeHandler: () => void;
    easingFunction: TEasingFunction;
    rotation: number;
    speed: number;
    paused: boolean;
    gratdientColorStops: GradientColorStop[];
    constructor({ element, waves, width, height, displayWidth, resizeHandler, easingFunction, rotation, speed, paused, gradient, }: SineWaveOptions);
    setGradient(gradient: GradientColorStop[]): void;
    setSpeed(speed: number): void;
    /**
     * Sets the rotation.
     *
     * @param      {number}  rotation  The rotation
     */
    setRotation(rotation: number): void;
    /**
     * Sets the easing function.
     *
     * @param      {Function|String}  fn      the easing function
     */
    setEasingFunction(fn: Function | EasingFunctionName): void;
    /**
     * Gets the easing function.
     *
     * @param      {undefined|string|Function}  fn      The function
     * @return     {function|undefined}         The easing function.
     */
    getEasingFunction(fn: undefined | EasingFunctionName | Function): TEasingFunction;
    /**
     * Gets the viewport width.
     *
     * @private
     *
     * @return     {number}  The viewport width.
     */
    getViewportWidth(): number;
    /**
     * Gets the viewport height.
     *
     * @private
     *
     * @return     {number}  The viewport height.
     */
    getViewportHeight(): number;
    /**
     * Sets and validates the width option passed to the constructor
     *
     * @private
     *
     * @param      {Number|Function}  width  The width
     */
    setWidth(width: number | Function): void;
    /**
     * Sets and validates the height option passed to the constructor
     *
     * @private
     *
     * @param      {Number|Function}  height  The height
     */
    setHeight(height: number | Function): void;
    /**
     * Sets and validates the height or width option passed to the constructor
     *
     * @private
     *
     * @param      {boolean}          [isWidth=true]  width or heigth ?
     * @param      {Function|Number}  value           The value
     */
    setWidthOrHeight(isWidth: boolean | undefined, value: number | Function): void;
    /**
     * Sets the resize event handler.
     *
     * @private
     *
     * @param      {function}  handler  The handler
     */
    setResizeEventHandler(handler: () => void): void;
    /**
     * set and validate the waves options passed to the constructor
     *
     * @private
     *
     * @param      {Array}  waves   The waves
     */
    setWaves(waves: WaveOptions[]): void;
    /**
     * set and validate the element passed to the constructor
     *
     * @private
     *
     * @param      {DOMElement}  element  The element
     */
    setElement(element: HTMLElement): void;
    /**
     * Sets the display width.
     *
     * @privvate
     *
     * @param      {string}  displayWidth  The display width
     */
    setDisplayWidth(displayWidth: string | number): void;
    /**
     * Determines whether the specified object is dom element.
     *
     * @private
     *
     * @param      {object}   object  The object
     * @return     {boolean}  True if the specified object is dom element, False otherwise.
     */
    isDOMElement(object: any): boolean;
}
//# sourceMappingURL=SineWaveBase.d.ts.map