import SineWaveBase, { GradientColorStop } from './SineWaveBase.js';
import Wave from './Wave.js';

/**
 * SineWaveRenderer, the main class of the project. See the readme for more
 * information
 *
 * @author     Lina van der Weg <lina@vanderweg.ch>
 * @license    MIT
 *
 * @class      SineWaveRenderer
 */

export interface WaveOption {
    speed: number;
    amplitude: number;
    wavelength: number;
}

export interface SineWaveOptions {
    element: HTMLCanvasElement;
    waves: WaveOption[];
    displayWidth: number | string;
    gradient: GradientColorStop[];
}

export default class SineWaveRenderer extends SineWaveBase {

    private devicePixelRatio: number;
    private time: number;
    private context: CanvasRenderingContext2D;
    private currentWidth: number;
    private currentHeight: number;
    private waveWidth: number;
    private waveLeft: number;
    private yAxis: number;
    public waves: Wave[];


    constructor(options: SineWaveOptions) {
        // @ts-ignore
        super(options);

        // set the device pixel ratio
        this.devicePixelRatio = window.devicePixelRatio || 1;

        // starting time
        this.time = 0;
    }



    /**
     * start rendering
     */
    public render() {

        // set up the rendering context
        this.context = this.createContext(this.element as HTMLCanvasElement);

        // update canvas dimensions
        this.updateDimensions();

        // update canvas dimension son resize, call user event handler
        window.addEventListener('resize', () => {
            this.updateDimensions();

            // call the userprovided event handler
            if (this.resizeHandler) {
                // @ts-ignore
                this.resizeHandler(this.context, this.waves);
            }
        });

        // start rendering
        this.requestAnimation();
    }



    /**
     * stop rendering the waves
     *
     * @param      {boolean}  [clear=false]  clear the canvas
     */
    public pause(clear = false) {
        this.paused = true;
        if (clear) this.clear();
    }


    /**
     * continue rendering the waves
     */
    public resume() {
        this.paused = false;
        this.requestAnimation();
    }


    /**
     * the main loop
     */
    private requestAnimation() {
        if (this.paused) return;

        // render the sinewaves
        this.renderWaves();

        // request the next rendering
        window.requestAnimationFrame(this.requestAnimation.bind(this));
    }



    /**
     * renders the sine waves
     */
    private renderWaves() {
        this.time = this.time - 0.007;

        // clear 
        this.clear();

        // rotate if needed
        if (this.rotation > 0) {
            this.context.translate(this.currentWidth / 2, this.currentHeight / 2);
            this.context.rotate(this.rotation);
            this.context.translate(-this.currentWidth / 2, -this.currentHeight / 2);
        }

        // render teh waves
        for (const wave of this.waves) {
            this.drawWave(this.time * wave.speed, wave);
        }
    }


    /**
     * Gets the point coordinates.
     *
     * @param      {number}  time      current time
     * @param      {number}  position  the current position
     * @param      {Wave}    wave      The wave
     * @return     {Object}  The point coordinates.
     */
    private getPointCoordinates(time: number, position: number, wave: Wave) : { x: number, y: number } {
        const x = (time * this.speed) + (-this.yAxis + position) / wave.wavelength;
        const y = wave.compute(x);

        // left and right side easing
        const amplitude = wave.easingFunction(position / this.waveWidth, wave.amplitude);

        return {
            x: position + this.waveLeft,
            y: amplitude * y + this.yAxis,
        };
    }



    /**
     * Draws a wave.
     *
     * @param      {number}  time    the current time
     * @param      {Wave}    wave    The wave to draw
     */
    private drawWave(time: number, wave: Wave) : void {

        // style the line
        this.context.lineWidth = wave.lineWidth * this.devicePixelRatio;
        this.context.strokeStyle = wave.strokeStyle;
        this.context.lineCap = 'butt';
        this.context.lineJoin = 'round';

        // start drawing the path
        this.context.beginPath();

        // starting line, from left to the start of the wave
        this.context.moveTo(0, this.yAxis);
        this.context.lineTo(this.waveLeft, this.yAxis);

        // draw the wave
        for (let i = 0; i < this.waveWidth; i += wave.segmentLength) {
            const { x, y } = this.getPointCoordinates(time, i, wave)
            this.context.lineTo(x, y);
        }

        // line ending, from wave end to the rigth
        this.context.lineTo(this.currentWidth, this.yAxis);

        // stroke the line
        this.context.stroke();
    }



    /**
     * clears the canvas
     */
    public clear() {
        this.context.clearRect(0, 0, this.currentWidth, this.currentHeight);
    }



    /**
     * compute the up to date dimensions for the canvas
     */
    private updateDimensions() {

        // get the desired dimensions
        const width = this.getWidth();
        const height = this.getHeight();

        // store corrected dimensions
        this.currentWidth = width * this.devicePixelRatio;
        this.currentHeight = height * this.devicePixelRatio;

        // set the dimensions
        // @ts-ignore
        this.element.width = this.currentWidth;

        // @ts-ignore
        this.element.height = this.currentHeight;

        // set styles
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;

        // set wave width
        this.waveWidth = this.displayWidth || this.displayWidthPercentage * this.currentWidth;

        // set horizontal center position
        this.waveLeft = (this.currentWidth - this.waveWidth) / 2;

        // set vertical center position
        this.yAxis = this.currentHeight / 2;

        // render the gradient
        this.renderGradient();
    }



    /**
     * render gradients
     */
    private renderGradient() {
        if (!this.gratdientColorStops) return;

        const gradient = this.context.createLinearGradient(0, 0, this.currentWidth, 0);

        for (const colorStop of this.gratdientColorStops) {
            gradient.addColorStop(colorStop.position, colorStop.rgbaValue);
        }

        for (const wave of this.waves) {
            // @ts-ignore
            wave.strokeStyle = gradient;
        }
    }


    /**
     * gets the desired width for the 2d context
     *
     * @private
     *
     * @return     {number}  The width.
     */
    private getWidth() : number {
        // @ts-ignore
        return this.widthValue || this.widthFunction();
    }


    /**
     * gets the desired height for the 2d context
     *
     * @private
     *
     * @return     {number}  The height.
     */
    private getHeight() : number {
        // @ts-ignore
        return this.heightValue || this.heightFunction();
    }


    /**
     * create a 2d context on an dom element
     *
     * @private
     *
     * @param      {DOMElement}  element  The element
     * @return     {2DContext}   the 2d context
     */
    private createContext(element: HTMLCanvasElement) : CanvasRenderingContext2D {
        return element.getContext('2d')!;
    }
}