import {useAppDispatch, useAppSelector} from "../../redux_TK/store";
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {COUNT_QUESTION_OPTIONS} from "../../utils/constants";
import {
    changeStatus,
    createAnswerOptions,
    createQuestion,
    createRightAnswers, deleteQuestion,
    setMessage
} from "../../redux_TK/questionsSlice";
import {validate} from "../../utils/validate";

export const useCustomModal = (onClose: () => void) => {

    const dispatch = useAppDispatch()
    const questionStatus = useAppSelector(state => state.questions.status)
    const currentQuestionID = useAppSelector(state => state.questions.currentQuestionID)
    const message = useAppSelector(state => state.questions.message)

    const [values, setValues] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const label = useMemo(() => {
        switch (questionStatus) {
            case null:
            case "Editing_completed": {
                return "Введите текст вопроса"
            }
            case "Question_added":
                return `Введите ${values.length + 1} вариант ответа`
            case "Answer_options_added":
                return "Введите номера правильных ответов через запятую"
            default:
                return ""
        }
    }, [questionStatus, values])

    useEffect(() => {
        if (values.length === COUNT_QUESTION_OPTIONS) {
            dispatch(createAnswerOptions({answerOptions: values, id: currentQuestionID}))
            setValues([])
        }
    }, [values, currentQuestionID, dispatch])

    const changeInputValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMessage(null))
        setInputValue(e.currentTarget.value)
    }, [dispatch])

    const addQuestionTitle = (value: string) => {
        if (value) {
            dispatch(createQuestion(value))
            setInputValue("")
            dispatch(setMessage(null))
        } else {
            dispatch(setMessage("Вы не ввели текст вопроса. Попробуйте добавить вопрос заново."))
        }
    }
    const addQuestionOption = (value: string) => {
        if (value) {
            setValues([...values, value])
            setInputValue("")
            dispatch(setMessage(null))
        } else {
            dispatch(setMessage(`Вы не ввели текст ${value.length + 1} варианта ответа! Попробуйте ещё раз.`))
        }
    }
    const addRightAnswers = (value: string) => {
        if (value) {
            const rightAnswers = validate(value)
            if (rightAnswers) {
                dispatch(createRightAnswers({rightAnswers: rightAnswers, id: currentQuestionID}))
                setInputValue("")
                dispatch(setMessage(null))
                onClose()
            } else {
                dispatch(setMessage("Некорректные данные. Попробуйте ещё раз."))
            }
        } else {
            dispatch(setMessage("Вы не ввели номера правильных ответов! Попробуйте ещё раз."))
        }
    }
    const onCloseModalHandler = () => {
        if (questionStatus === null) {
            setInputValue("")
            dispatch(setMessage(null))
        } else if (questionStatus === "Test_error") {
            dispatch(changeStatus({status: "Test"}))
        } else {
            dispatch(deleteQuestion({id: currentQuestionID}))
        }
        onClose()
    }

    const onSubmitHandler = () => {
        switch (questionStatus) {
            case null:
            case "Editing_completed": {
                addQuestionTitle(inputValue)
                break
            }
            case "Question_added": {
                addQuestionOption(inputValue)
                break
            }
            case "Answer_options_added": {
                addRightAnswers(inputValue)
                break
            }
            case "Test":
            case "Test_error": {
                dispatch(changeStatus({status: null}))
                dispatch(setMessage(null))
                onCloseModalHandler()
                break
            }
            default:
                return
        }
    }

    return {label, message, inputValue, changeInputValueHandler, onSubmitHandler, onCloseModalHandler}
}