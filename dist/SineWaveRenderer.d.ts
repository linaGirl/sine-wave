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
    private devicePixelRatio;
    private time;
    private context;
    private currentWidth;
    private currentHeight;
    private waveWidth;
    private waveLeft;
    private yAxis;
    waves: Wave[];
    constructor(options: SineWaveOptions);
    /**
     * start rendering
     */
    render(): void;
    /**
     * stop rendering the waves
     *
     * @param      {boolean}  [clear=false]  clear the canvas
     */
    pause(clear?: boolean): void;
    /**
     * continue rendering the waves
     */
    resume(): void;
    /**
     * the main loop
     */
    private requestAnimation;
    /**
     * renders the sine waves
     */
    private renderWaves;
    /**
     * Gets the point coordinates.
     *
     * @param      {number}  time      current time
     * @param      {number}  position  the current position
     * @param      {Wave}    wave      The wave
     * @return     {Object}  The point coordinates.
     */
    private getPointCoordinates;
    /**
     * Draws a wave.
     *
     * @param      {number}  time    the current time
     * @param      {Wave}    wave    The wave to draw
     */
    private drawWave;
    /**
     * clears the canvas
     */
    clear(): void;
    /**
     * compute the up to date dimensions for the canvas
     */
    private updateDimensions;
    /**
     * render gradients
     */
    private renderGradient;
    /**
     * gets the desired width for the 2d context
     *
     * @private
     *
     * @return     {number}  The width.
     */
    private getWidth;
    /**
     * gets the desired height for the 2d context
     *
     * @private
     *
     * @return     {number}  The height.
     */
    private getHeight;
    /**
     * create a 2d context on an dom element
     *
     * @private
     *
     * @param      {DOMElement}  element  The element
     * @return     {2DContext}   the 2d context
     */
    private createContext;
}
//# sourceMappingURL=SineWaveRenderer.d.ts.map