import {useCallback, useState} from "react";
import {BasicButton} from "../components/BasicButton/BasicButton";
import {CustomModal} from "../components/CustomModal/CustomModal";
import {AppContainer} from "../components/styled-components/AppContainer/AppContainer";
import {useAppDispatch, useAppSelector} from "../redux_TK/store";
import {Test} from "../components/Test/Test";
import {changeStatus} from "../redux_TK/questionsSlice";
import {Block} from "../components/styled-components/Block/Block";


function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const questionStatus = useAppSelector(state => state.questions.status)
    const questionsLength = useAppSelector(state => state.questions.questions).length

    const startTestHandler = useCallback(() => {
        dispatch(changeStatus({status: "Test"}))
    }, [dispatch])
    const openModalHandler = useCallback(() => {
        setIsOpen(true)
    }, [])
    const closeModalHandler = useCallback(() => {
        setIsOpen(false)
    },[])

    const modalWindow = (questionStatus === "Test" || questionStatus === "Test_error")
        ? <>
            <Test setIsOpenModal={openModalHandler}/>
            <CustomModal isOpen={isOpen} onClose={closeModalHandler} onlyMessage/>
        </>
        : <CustomModal isOpen={isOpen} onClose={closeModalHandler}/>

    const addButtonDisabled = questionStatus === "Test"
    const startTestDisabled = questionStatus === "Test" || questionsLength === 0

    return (
        <AppContainer padding="10px">
            <Block>
                <BasicButton name="Добавить вопрос" onClick={openModalHandler} disabled={addButtonDisabled}/>
                <BasicButton name="Начать тест" onClick={startTestHandler} disabled={startTestDisabled}/>
            </Block>
            {modalWindow}
        </AppContainer>
    );
}

export default App;
