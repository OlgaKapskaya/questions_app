import _ from "lodash";

/**
 * Returns true if the test passed otherwise false
 * @param userAnswers
 * @param rightAnswers
 */
export const checkAnswers = (userAnswers: any, rightAnswers: any[]) => {
    let answersR = []
    let answersU = []
    for (const [key, value] of Object.entries(userAnswers)) {
        answersR.push(`${key}: ${value}`)
    }
    for (let i=0; i<rightAnswers.length; i++){
        for (const [key, value] of Object.entries(rightAnswers[i])) {
            answersU.push(`${key}: ${value}`)
        }
    }
    if (answersR.length !== answersU.length) return null
    return _.isEqual(answersR,answersU)
}