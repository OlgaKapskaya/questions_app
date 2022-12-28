import {useAppDispatch, useAppSelector} from "../../redux TK/store";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {COUNT_QUESTION_OPTIONS} from "../../utils/constants";
import {createAnswerOptions, createQuestionTitle, createRightAnswers} from "../../redux TK/questionsSlice";
import {convertArray} from "../../utils/convertArray";

export const useCustomModal = (setIsOpen: (isOpen: boolean) => void) => {

    const dispatch = useAppDispatch()
    const questionStatus = useAppSelector(state => state.questions.status)
    const currentQuestionID = useAppSelector(state => state.questions.currentQuestionID)


    const [values, setValues] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [error, setError] = useState<string>("")

    const label = useMemo(() => {
        switch (questionStatus) {
            case null:
            case "Editing_completed": {
                return "Введите текст вопроса"
            }
            case "Question_added":
                return "Введите вариант ответа"
            case "Answer_options_added":
                return "Введите номера правильных ответов через запятую"
            default:
                return ""
        }
    }, [questionStatus])

    useEffect(() => {
        if (values.length === COUNT_QUESTION_OPTIONS) {
            dispatch(createAnswerOptions({answerOptions: values, id: currentQuestionID}))
            setValues([])
        }
    }, [values, currentQuestionID, dispatch])

    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setInputValue(e.currentTarget.value)
    }

    const addQuestionTitle = (value: string) => {
        if (value) {
            dispatch(createQuestionTitle(value))
            setInputValue("")
            setError("")
        } else {
            setError("Вы не ввели текст вопроса! Попробуйте ещё раз.")
        }
    }
    const addQuestionOption = (value: string) => {
        if (value) {
            setValues([...values, value])
            setInputValue("")
            setError("")
        } else {
            setError("Вы не ввели текст ответа! Попробуйте ещё раз.")
        }
    }
    const addRightAnswers = (value: string) => {
        if (value) {
            const rightAnswers = value.split(",").map(elem => +elem - 1).sort()
            if (rightAnswers.length <= COUNT_QUESTION_OPTIONS) {
                dispatch(createRightAnswers({rightAnswers: convertArray(rightAnswers), id: currentQuestionID}))
                setInputValue("")
                setError("")
                setIsOpen(false)
            } else {
                setError("Некорректные данные. Попробуйте ещё раз.")
            }
        } else {
            setError("Вы не ввели номера правильных ответов! Попробуйте ещё раз.")
        }
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
            default:
                return
        }
    }

    const onCloseModalHandler = () => {
        setInputValue("")
        setError("")
        setIsOpen(false)
    }

    return {label, error, inputValue, changeInputValueHandler, onSubmitHandler, onCloseModalHandler}
}