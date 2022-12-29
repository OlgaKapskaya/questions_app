import {FC} from "react";
import {BasicButton} from "../../BasicButton/BasicButton";
import {Block} from "../../styled-components/Block/Block";

export type OnlyMessageContentPropsType = {
    message: string | null
    onSubmit: () => void
}
export const OnlyMessageContent: FC<OnlyMessageContentPropsType> = ({message, onSubmit}) => {
    return (
        <Block flexDirection="column">
            {message}
            <Block>
                <BasicButton name="OK" onClick={onSubmit}/>
            </Block>
        </Block>
    )
}