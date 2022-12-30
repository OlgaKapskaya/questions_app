import {COUNT_QUESTION_OPTIONS} from "./constants";

/**
 * returns an array of boolean values of the same length as the number of options or null
 * @param array
 */
export const convertArrayOfNumberToBoolean = (array: any[]): any[] | null => {
    const tempArray = new Array(COUNT_QUESTION_OPTIONS)
    for (let i = 0; i < tempArray.length; i++) {
        if (array[0] >= COUNT_QUESTION_OPTIONS) return null
        if (i === array[0]) {
            tempArray[i] = true
            array.shift()
        } else tempArray[i] = false
    }
    return tempArray
}

export const convertArray = (array: any):any[] => {
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        for (const [key, value] of Object.entries(array[i])) {
            newArray.push({[key]: value})
        }
    }
    return newArray
}

