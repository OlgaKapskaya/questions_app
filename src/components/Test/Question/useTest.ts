import {useAppDispatch, useAppSelector} from "../../../redux_TK/store";
import {changeStatus, setMessage} from "../../../redux_TK/questionsSlice";
import {checkAnswers} from "../../../utils/checkAnswers";

export const useTest = (setIsOpenModal:() => void) => {
    const questions = useAppSelector(state => state.questions.questions)
    const answers = useAppSelector(state => state.questions.userAnswers)
    const dispatch = useAppDispatch()

    const rightAnswers = questions.map((elem) => ({[elem.id]: [...elem.rightAnswers]}))
    const questionsCount = questions.length

    const addMessage = (message: string) => {
        dispatch(setMessage(message))
    }
    const endTestHandler = () => {
        const result = checkAnswers(answers, rightAnswers)
        if (!result){
            addMessage("Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения")
            dispatch(changeStatus({status: "Test_error"}))
        } else if (result.length === 0) {
            addMessage(`Ваш результат ${questionsCount} из ${questionsCount}. Вы молодец!`)
        } else {
            const resultCount = result.length
            addMessage(`Вы допустили ошибку в вопросах №: ${result.join(", ")}. Ваш результат ${questionsCount - resultCount} из ${questionsCount}.`)
        }
        setIsOpenModal()
    }
    return {questions, endTestHandler}
}