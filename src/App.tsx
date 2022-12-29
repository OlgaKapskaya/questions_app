import {useCallback, useState} from "react";
import {BasicButton} from "./components/BasicButton/BasicButton";
import {CustomModal} from "./components/CustomModal/CustomModal";
import {AppContainer} from "./components/styled-components/AppContainer/AppContainer";
import {useAppDispatch, useAppSelector} from "./redux_TK/store";
import {Test} from "./components/Test/Test";
import {startTest} from "./redux_TK/questionsSlice";
import {Block} from "./components/styled-components/Block/Block";


function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const questionStatus = useAppSelector(state => state.questions.status)

    const startTestHandler = () => {
        dispatch(startTest())
    }
    const openModalHandler = useCallback(() => {
        setIsOpen(true)
    }, [])


    return (
        <AppContainer padding="10px">
            <Block>
                <BasicButton name="Добавить вопрос" onClick={openModalHandler} disabled={questionStatus === "Test"}/>
                <BasicButton name="Начать тест" onClick={startTestHandler} disabled={questionStatus === "Test"}/>
            </Block>
            {
                questionStatus === "Test"
                && <>
                    <Test setIsOpenModal={openModalHandler}/>
                    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} onlyMessage/>
                </>
            }
            <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </AppContainer>
    );
}


export default App;
