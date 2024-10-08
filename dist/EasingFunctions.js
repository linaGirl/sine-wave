/**
 * Contains the easing functions for the wave rendering and some minor utilities
 *
 * @author     Lina van der Weg <lina@vanderweg.ch>
 * @license    MIT
 *
 * @class      EasingFunctions
 */
class EasingFunctions {
    static hasFunction(name) {
        return EasingFunctions.functionNames.includes(name);
    }
    static getFunction(name) {
        if (!EasingFunctions.hasFunction(name)) {
            throw new Error(`Ìnvalid easing function '${name}'. Expected on of ${EasingFunctions.functionNames.join(', ')}!`);
        }
        return EasingFunctions[name];
    }
    /**
     * do not ease
     */
    static static(percent, amplitude) {
        return amplitude;
    }
    ;
    /**
     * ease in, sine
     */
    static sineIn(percent, amplitude) {
        return amplitude * (Math.sin(percent * Math.PI - EasingFunctions.HALFPI) + 1) * 0.5;
    }
    /**
     * ease out, sine
     */
    static sineOut(percent, amplitude) {
        return amplitude * (Math.sin(percent * Math.PI + EasingFunctions.HALFPI) + 1) * 0.5;
    }
    /**
     * ease in out, sine
     */
    static sineInOut(percent, amplitude) {
        return amplitude * (Math.sin(percent * EasingFunctions.PI2 - EasingFunctions.HALFPI) + 1) * 0.5;
    }
    /**
     * convert degress to radians
     *
     * @param      {number}  degrees  The degrees
     * @return     {number}  raadians
     */
    static degreesToRadians(degrees) {
        return degrees * EasingFunctions.PI180;
    }
}
EasingFunctions.PI180 = Math.PI / 180;
EasingFunctions.PI2 = Math.PI * 2;
EasingFunctions.HALFPI = Math.PI / 2;
EasingFunctions.functionNames = ['static', 'sineIn', 'sineOut', 'sineInOut'];
export default EasingFunctions;
//# sourceMappingURL=EasingFunctions.js.map