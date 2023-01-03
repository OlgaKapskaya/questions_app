import {convertArrayOfNumberToBoolean, convertStringToArrayOfIndex} from "./convertArray";
import {COUNT_QUESTION_OPTIONS} from "./constants";

/**
 * returns array of boolean or null
 * @param value
 */
export const validate = (value: string): boolean[] | null => {
    const onValidate = /^(?:\d,?)+$/.test(value)
    if (onValidate) {
        const rightAnswersArray = convertStringToArrayOfIndex(value)
        if (rightAnswersArray.length <= COUNT_QUESTION_OPTIONS) {
            return convertArrayOfNumberToBoolean(rightAnswersArray)
        } else return null
    } else return null
}
