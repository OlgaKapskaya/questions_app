import {ChangeEvent, FC, memo, useEffect, useState} from "react";
import {addUserAnswer, QuestionType} from "../../../redux_TK/questionsSlice";
import {COUNT_QUESTION_OPTIONS} from "../../../utils/constants";
import {useAppDispatch} from "../../../redux_TK/store";
import {Block} from "../../styled-components/Block/Block";


type QuestionPropsType = {
    question: QuestionType
    questionNumber: number
}
export const Question: FC<QuestionPropsType> = memo(({question, questionNumber}) => {
    const dispatch = useAppDispatch()
    const [userAnswer, setUserAnswer] = useState<boolean[]>(Array(COUNT_QUESTION_OPTIONS).fill(false))

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, elemIndex: number) => {
        setUserAnswer(userAnswer.map((elem, index) => index === elemIndex
            ? event.currentTarget.checked
            : elem))
    }

    useEffect(()=>{
        dispatch(addUserAnswer({id: question.id, answers: userAnswer}))
    }, [userAnswer, dispatch, question.id])



    return (
        <Block flexDirection="column" alignItems="flex-start">
            <h4>{`${questionNumber}. ${question.title}`}</h4>

            {question.answerOptions.map((elem, index) => <div key={index}>
                <input type="checkbox" onChange={(event) => onChangeHandler(event, index)}/>
                <span> {elem} </span>
            </div>)}
        </Block>
    )
})