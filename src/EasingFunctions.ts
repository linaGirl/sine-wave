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

    static PI180 : number = Math.PI / 180;
    static PI2 : number = Math.PI * 2;
    static HALFPI : number = Math.PI / 2;

    static functionNames : EasingFunctionName[] = ['static', 'sineIn', 'sineOut', 'sineInOut'];


    static hasFunction(name: EasingFunctionName) {
        return EasingFunctions.functionNames.includes(name);
    }


    static getFunction(name: EasingFunctionName) {
        if (!EasingFunctions.hasFunction(name)) {
            throw new Error(`Ìnvalid easing function '${name}'. Expected on of ${EasingFunctions.functionNames.join(', ')}!`);
        }

        return EasingFunctions[name];
    }


    /**
     * do not ease
     */
    static static(percent: number, amplitude: number) : number {
        return amplitude;
    };


    /**
     * ease in, sine
     */
    static sineIn(percent: number, amplitude: number) : number {
         return amplitude * (Math.sin(percent * Math.PI - EasingFunctions.HALFPI) + 1) * 0.5;
    }


    /**
     * ease out, sine
     */
    static sineOut(percent: number, amplitude: number) : number {
         return amplitude * (Math.sin(percent * Math.PI + EasingFunctions.HALFPI) + 1) * 0.5;
    }


    /**
     * ease in out, sine
     */
    static sineInOut(percent: number, amplitude: number) : number {
         return amplitude * (Math.sin(percent * EasingFunctions.PI2 - EasingFunctions.HALFPI) + 1) * 0.5;
    }


    /**
     * convert degress to radians
     *
     * @param      {number}  degrees  The degrees
     * @return     {number}  raadians
     */
    static degreesToRadians(degrees: number) : number {
        return degrees * EasingFunctions.PI180;
    }
}