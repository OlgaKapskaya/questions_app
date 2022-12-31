import {ChangeEvent, FC} from "react";
import {BasicButton} from "../../BasicButton/BasicButton";
import {OnlyMessageContentPropsType} from "../OnlyMessageContent/OnlyMessageContent";
import {Block} from "../../styled-components/Block/Block";
import {ErrorMessage} from "../../styled-components/ErrorMessage/ErrorMessage";
import {Input} from "../../styled-components/Input/Input";

type ContentType = OnlyMessageContentPropsType & {
    onClose: () => void
    label: string
    inputValue: string
    changeInputValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Content: FC<ContentType> = ({message, onSubmit, label, inputValue, changeInputValueHandler, onClose}) => {
    return (
        <>
            <Block flexDirection="column">
                {label}
                {
                    message
                    && <ErrorMessage>{message}</ErrorMessage>
                }
                <Block width="100%">
                    <Input value={inputValue} onChange={changeInputValueHandler} autofocus/>
                </Block>
            </Block>
            <Block>
                <BasicButton name="Сохранить" onClick={onSubmit}/>
                <BasicButton name="Отмена" onClick={onClose}/>
            </Block>
        </>
    )
}