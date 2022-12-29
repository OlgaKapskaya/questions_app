import {useAppDispatch, useAppSelector} from "../../../redux_TK/store";
import {setMessage} from "../../../redux_TK/questionsSlice";
import {checkAnswers} from "../../../utils/checkAnswers";

export const useTest = (setIsOpenModal:() => void) => {
    const questions = useAppSelector(state => state.questions.questions)
    const answers = useAppSelector(state => state.questions.userAnswers)
    const dispatch = useAppDispatch()

    const rightAnswers = questions.map((elem, index) => ({[elem.id]: [...elem.rightAnswers]}))

    const addMessage = (message: string) => {
        dispatch(setMessage(message))
    }
    const endTestHandler = () => {
        const isPositive = checkAnswers(answers, rightAnswers)
        switch (isPositive){
            case null:
            default:
                addMessage("Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность ввода")
                break
            case true:
                addMessage("Вы правильно ответили на все вопросы")
                break
            case false:
                addMessage("Вы допустили ошибку. Попробуйте ещё раз")
                break
        }
        setIsOpenModal()
    }
    return {questions, endTestHandler}
}