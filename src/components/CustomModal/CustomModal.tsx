import {FC} from "react";
import {BasicButton} from "../BasicButton/BasicButton";
import {Block, ErrorMessage, Input} from "../styled-components/common";
import Modal from "react-modal";
import {useCustomModal} from "./useCustomModal";

const customStyles = {
    content: {
        top: "20%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};


type CustomModalPropsType = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const CustomModal: FC<CustomModalPropsType> = ({isOpen, setIsOpen}) => {
    const {
        label,
        error,
        inputValue,
        changeInputValueHandler,
        onSubmitHandler,
        onCloseModalHandler
    } = useCustomModal(setIsOpen)

    return (
        <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
            <Block flexDirection="column">
                {label}
                {
                    error
                    && <ErrorMessage>{error}</ErrorMessage>
                }
                <Block width="100%">
                    <Input value={inputValue} onChange={changeInputValueHandler}/>
                </Block>
            </Block>
            <Block>
                <BasicButton name="Сохранить" onClick={onSubmitHandler}/>
                <BasicButton name="Отмена" onClick={onCloseModalHandler}/>
            </Block>
        </Modal>
    )
}