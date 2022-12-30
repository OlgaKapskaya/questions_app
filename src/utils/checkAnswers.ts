import _ from "lodash";
import {convertArray} from "./convertArray";
import {convertObjectWithTest} from "./convertObject";

/**
 * returns an empty array if the test passed;
 * returns an array of question numbers in which an error was made;
 * returns null if no response was given
 * @param userAnswers
 * @param rightAnswers
 */
export const checkAnswers = (userAnswers: any, rightAnswers: any[]):any[] | null => {
    // приводим ответ пользователя и массив правильных ответов к одинаковой структуре данных
    const answersUser = convertObjectWithTest(userAnswers)
    const answersRight = convertArray(rightAnswers)
    //если пользователь пропустил вопрос, возвращаем null
    if (!answersUser) return null
    //находим номера вопросов, в которых пользователь ошибся
    let resultArray = []
    for (let i = 0; i < answersRight.length; i++) {
        if (!_.isEqual(answersRight[i], answersUser[i])) {
            resultArray.push(i)
        }
    }
    return resultArray.map(elem => elem + 1)
}