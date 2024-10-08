/**
 * Contains the easing functions for the wave rendering and some minor utilities
 *
 * @author     Lina van der Weg <lina@vanderweg.ch>
 * @license    MIT
 *
 * @class      EasingFunctions
 */
export type EasingFunctionName = 'static' | 'sineIn' | 'sineOut' | 'sineInOut';
export type TEasingFunction = (percent: number, amplitude: number) => number;
export default class EasingFunctions {
    static PI180: number;
    static PI2: number;
    static HALFPI: number;
    static functionNames: EasingFunctionName[];
    static hasFunction(name: EasingFunctionName): boolean;
    static getFunction(name: EasingFunctionName): typeof EasingFunctions.static | typeof EasingFunctions.sineIn | typeof EasingFunctions.sineOut | typeof EasingFunctions.sineInOut;
    /**
     * do not ease
     */
    static static(percent: number, amplitude: number): number;
    /**
     * ease in, sine
     */
    static sineIn(percent: number, amplitude: number): number;
    /**
     * ease out, sine
     */
    static sineOut(percent: number, amplitude: number): number;
    /**
     * ease in out, sine
     */
    static sineInOut(percent: number, amplitude: number): number;
    /**
     * convert degress to radians
     *
     * @param      {number}  degrees  The degrees
     * @return     {number}  raadians
     */
    static degreesToRadians(degrees: number): number;
}
//# sourceMappingURL=EasingFunctions.d.ts.map