import {convertArrayOfNumberToBoolean, convertStringToArrayOfIndex} from "./convertArray";
import {COUNT_QUESTION_OPTIONS} from "./constants";

/**
 * returns array of boolean or null
 * @param value
 */
export const validate = (value: string): boolean[] | null => {
    const onValidate = /^[0-9][0-9,]{1,20}$/i.test(value)
    if (onValidate) {
        const rightAnswersArray = convertStringToArrayOfIndex(value)
        if (rightAnswersArray.length <= COUNT_QUESTION_OPTIONS) {
            const rightAnswers = convertArrayOfNumberToBoolean(rightAnswersArray)
            return rightAnswers
        } else return null
    } else return null
}
