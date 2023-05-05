import EasingFunctions from './EasingFunctions.js';
import Wave from './Wave.js';


/**
 * Base class for the SineWaveRenderer class which provides utility functions
 * and input validation
 *
 * @author     Lina van der Weg <lina@vanderweg.ch>
 * @license    MIT
 *
 * @class      SineWaveBase
 */
export default class SineWaveBase {


    constructor({
        element,
        waves,
        width,
        height,
        displayWidth,
        resizeHandler,
        easingFunction,
        rotation = 0,
        speed = 1,
        paused = false,
        gradient,
    }) {
        this.paused = paused;

        this.setElement(element);
        this.setWidth(width);
        this.setHeight(height);
        this.setDisplayWidth(displayWidth);
        this.setResizeEventHandler(resizeHandler);
        this.setEasingFunction(easingFunction);
        this.setRotation(rotation);
        this.setWaves(waves);
        this.setSpeed(speed);
        this.setGradient(gradient);
    }


    setGradient(gradient) {
        if (!gradient) return;
        if (!Array.isArray(gradient)) {
            throw new Error(`Invalid 'gradient' options: expected an array!`);
        }

        this.gratdientColorStops = [];

        for (const colorStop of gradient) {
            if (typeof colorStop !== 'object' || colorStop === null || colorStop.position === undefined || colorStop.rgbaValue === undefined) {
                throw new Error(`Invalid gradient entry: expected an object containg a position and a rgbaValue!`);
            }

            this.gratdientColorStops.push({
                position: colorStop.position,
                rgbaValue: colorStop.rgbaValue,
            });
        }
    }


    setSpeed(speed) {
        if (typeof speed !== 'number') {
            throw new Error(`Invalid option 'speed': expected a number!`);
        }

        this.speed = speed;
    }


    /**
     * Sets the rotation.
     *
     * @param      {number}  rotation  The rotation
     */
    setRotation(rotation) {
        if (typeof rotation !== 'number' || rotation < 0 || rotation >= 360) {
            throw new Error(`Invalid option 'roation'. Expected a number between 0 and 359!`);
        }

        this.rotation = EasingFunctions.degreesToRadians(rotation);
    }



    /**
     * Sets the easing function.
     *
     * @param      {Function|String}  fn      the easing function
     */
    setEasingFunction(fn) {
        this.easingFunction = this.getEasingFunction(fn);
    }


    /**
     * Gets the easing function.
     *
     * @param      {undefined|string|Function}  fn      The function
     * @return     {function|undefined}         The easing function.
     */
    getEasingFunction(fn) {
        if (typeof fn === 'function') {
            return fn;
        } else if (typeof fn === 'string') {
            if (EasingFunctions.hasFunction(fn)) {
                return EasingFunctions.getFunction(fn);
            } else {
                throw new Error(`Invalid easingFunction option '${fn}'. Expected one of ${EasingFunctions.functionNames.join(', ')}!`);
            }
        }
    }


    /**
     * Gets the viewport width.
     *
     * @private
     *
     * @return     {number}  The viewport width.
     */
    getViewportWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    }


    /**
     * Gets the viewport height.
     *
     * @private
     *
     * @return     {number}  The viewport height.
     */
    getViewportHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    }


    /**
     * Sets and validates the width option passed to the constructor
     *
     * @private
     *
     * @param      {Number|Function}  width  The width
     */
    setWidth(width) {
        this.setWidthOrHeight(true, width);
    }


    /**
     * Sets and validates the height option passed to the constructor
     *
     * @private
     *
     * @param      {Number|Function}  height  The height
     */
    setHeight(height) {
        this.setWidthOrHeight(false, height);
    }


    /**
     * Sets and validates the height or width option passed to the constructor
     *
     * @private
     *
     * @param      {boolean}          [isWidth=true]  width or heigth ?
     * @param      {Function|Number}  value           The value
     */
    setWidthOrHeight(isWidth = true, value) {
        const identifier = isWidth ? 'width' : 'height';

        if (typeof value === 'number') {
            if (Number.isNaN(value)) {
                throw new Error(`Expected the option '${identifier}' to be a number. NaN given!`);
            }

            this[`${identifier}Value`] = value;
        } else if (typeof value === 'function') {
            const testNumber = value();

            if (typeof testNumber !== 'number' || Number.isNaN(testNumber)) {
                throw new Error(`The function provided for the '${identifier}' option returns not a valid number!`);
            }

            this[`${identifier}Function`] = value;
        } else if (value !== undefined) {
            throw new Error(`Invalid '${identifier}' option. Expected a number or a function returning a number!`);
        } else {
            this[`${identifier}Function`] = this[`getViewport${identifier[0].toUpperCase()}${identifier.slice(1)}`];
        }
    }


    /**
     * Sets the resize event handler.
     * 
     * @private
     *
     * @param      {function}  handler  The handler
     */
    setResizeEventHandler(handler) {
        if (typeof handler === 'function') {
            this.resizeHandler = handler;
        } else if (handler !== undefined) {
            throw new Error(`Inavlid 'resizeHandler' option. Expected a function!`);
        }
    }


    /**
     * set and validate the waves options passed to the constructor
     *
     * @private
     *
     * @param      {Array}  waves   The waves
     */
    setWaves(waves) {
        if (!Array.isArray(waves) || !waves.length) {
            throw new Error(`Missing or invalid option 'waves'. Expected an Array with wave configurations!`);
        }

        this.waves = [];

        for (const configuration of waves) {
            if (typeof configuration !== 'object') {
                throw new Error(`Expected an object as wave configuration!`);
            }

            const wave = new Wave({
                speed: configuration.speed,
                amplitude: configuration.amplitude,
                wavelength: configuration.wavelength,
                segmentLength: configuration.segmentLength,
                lineWidth: configuration.lineWidth,
                strokeStyle: configuration.strokeStyle,
                type: configuration.type,
                easingFunction: configuration.easingFunction ? 
                    this.getEasingFunction(configuration.easingFunction) : 
                    this.easingFunction,
            });

            this.waves.push(wave);
        }
    }


    /**
     * set and validate the element passed to the constructor
     *
     * @private
     *
     * @param      {DOMElement}  element  The element
     */
    setElement(element) {
        if (!this.isDOMElement(element)) {
            throw new Error(`Missing or invalid option 'element'. Expected a DOM Element!`);
        }
        this.element = element;
    }


    /**
     * Sets the display width.
     * 
     * @privvate
     *
     * @param      {string}  displayWidth  The display width
     */
    setDisplayWidth(displayWidth) {
        if (typeof displayWidth === 'string') {
            if (displayWidth.trim().endsWith('px')) {
                this.displayWidth = parseInt(displayWidth, 10);
            } else if (displayWidth.trim().endsWith('%')) {
                let value = parseFloat(displayWidth);
                if (value > 1) value /= 100;
                this.displayWidthPercentage = value;
            } else {
                throw new Error(`Option 'displayWidth' is invalid. Expexted px or % value or a number!`);
            }
        } else if (typeof displayWidth === 'number') {
            this.displayWidth = displayWidth;
        } else {
            throw new Error(`Missing 'displayWidth' option. Expected a string with a px or % value!`);
        }
    }


    /**
     * Determines whether the specified object is dom element.
     *
     * @private
     *
     * @param      {object}   object  The object
     * @return     {boolean}  True if the specified object is dom element, False otherwise.
     */
    isDOMElement(object){
        return typeof HTMLElement === "object" ? 
            object instanceof HTMLElement : 
            object && typeof object === "object" && 
                object !== null && 
                object.nodeType === 1 && 
                typeof object.nodeName==="string";
    }
}