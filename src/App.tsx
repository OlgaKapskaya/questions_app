import React, {useCallback, useState} from "react";
import {BasicButton} from "./components/BasicButton/BasicButton";
import {CustomModal} from "./components/CustomModal/CustomModal";
import {AppContainer, Block} from "./components/styled-components/common";
import {useAppDispatch, useAppSelector} from "./redux TK/store";
import {Test} from "./components/Test/Test";
import {startTest} from "./redux TK/questionsSlice";


function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

const dispatch = useAppDispatch()
    const questionStatus = useAppSelector(state => state.questions.status)


    const startTestHandler = () => {
        dispatch(startTest())
    }
    const addQuestionHandler = useCallback(() => {
        setIsOpen(true)
    }, [])


    return (
        <AppContainer padding="10px">
            <Block>
                <BasicButton name="Добавить вопрос" onClick={addQuestionHandler} disabled={questionStatus === "Test"}/>
                <BasicButton name="Начать тест" onClick={startTestHandler} disabled={questionStatus === "Test"}/>
            </Block>
            {
                questionStatus === "Test"
                && <Test/>
            }
            <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </AppContainer>
    );
}


export default App;
