import React, {FC} from "react";
import {useAppSelector} from "../../redux TK/store";
import {Question} from "./Question/Question";
import {Block} from "../styled-components/common";
import {BasicButton} from "../BasicButton/BasicButton";

export const Test: FC = () => {
    const questions = useAppSelector(state => state.questions.questions)
    return (
        <Block flexDirection="column" alignItems="flex-start">
            {
                questions.map((elem, index) => <Question key={elem.id}
                                                         question={elem}
                                                         questionNumber={index + 1}/>)
            }
            <Block>
                <BasicButton name="Завершить тест" onClick={()=>{}}/>
            </Block>

        </Block>
    )
}