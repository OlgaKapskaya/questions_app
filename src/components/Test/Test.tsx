import {FC} from "react";
import {Question} from "./Question/Question";
import {BasicButton} from "../BasicButton/BasicButton";
import {useTest} from "./Question/useTest";
import {Block} from "../styled-components/Block/Block";

type TestPropsType = {
    setIsOpenModal: () => void
}
export const Test: FC<TestPropsType> = ({setIsOpenModal}) => {
    const {questions, endTestHandler} = useTest(setIsOpenModal)
    return (
        <Block flexDirection="column" alignItems="flex-start">
            {
                questions.map((elem, index) => <Question key={elem.id}
                                                         question={elem}
                                                         questionNumber={index + 1}/>)
            }
            <Block>
                <BasicButton name="Завершить тест" onClick={endTestHandler}/>
            </Block>
        </Block>
    )
}