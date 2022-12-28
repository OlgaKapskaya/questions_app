import { createAction, createSlice, nanoid } from "@reduxjs/toolkit";

export type StatusType = "Question_added" | "Answer_options_added" | "Editing_completed" | "Test" | null

export type QuestionType = {
    id: string
    title: string
    answerOptions: string[]
    rightAnswers: number[]
}
export type StateType = {
    currentQuestionID: string
    status: StatusType
    questions: QuestionType[]
}

export const createQuestionTitle = createAction<string>("createQuestionTitle")
export const createAnswerOptions = createAction<{answerOptions: string[], id: string}>("createAnswerOptions")
export const createRightAnswers = createAction<{rightAnswers: number[], id: string}>("createRightAnswers")
export const startTest = createAction("startTest")

export const questionsSlice = createSlice({
    name: "questions",
    initialState: {
        currentQuestionID: "",
        status: null,
        questions: []
    } as StateType,
    extraReducers: (builder) => {
        builder
            .addCase(
            createQuestionTitle,
            (state: StateType, action) => {
                const newQuestion: QuestionType = {
                    id: nanoid(),
                    title: action.payload,
                    answerOptions: [],
                    rightAnswers: [],
                }
                state.questions = [...state.questions, newQuestion]
                state.currentQuestionID = newQuestion.id
                state.status = "Question_added"
            }
        )
        .addCase(
            createAnswerOptions,
            (state, action) => {
                state.questions = state.questions.map(elem => elem.id === action.payload.id
                    ? {...elem, answerOptions: action.payload.answerOptions}
                    : elem)
                state.status = "Answer_options_added"
            }
        )
        .addCase(
            createRightAnswers,
            (state, action) => {
                state.questions = state.questions.map(elem => elem.id === action.payload.id
                    ? { ...elem, rightAnswers: action.payload.rightAnswers}
                    : elem)
                state.status = "Editing_completed"
                state.currentQuestionID = ""
            }
        )
            .addCase(
                startTest,
                (state, action) => {
                    state.status = "Test"
                }
            )
    },
    reducers: {}
})