import {FC} from "react";
import {QuestionType} from "../../../redux TK/questionsSlice";
import {Block} from "../../styled-components/common";


type QuestionPropsType = {
    question: QuestionType
    questionNumber: number
}
export const Question:FC<QuestionPropsType> = ({question, questionNumber}) => {
    return (
        <Block flexDirection="column" alignItems="flex-start">
            <h4>{questionNumber + ". " + question.title}</h4>

            {question.answerOptions.map((elem, index) => <div key={index}>
                <input type="checkbox"/>
                <span> {elem} </span>
            </div>)}
        </Block>
    )
}