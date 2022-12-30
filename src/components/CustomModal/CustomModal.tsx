import {FC} from "react";
import Modal from "react-modal";
import {useCustomModal} from "./useCustomModal";
import {OnlyMessageContent} from "./OnlyMessageContent/OnlyMessageContent";
import {Content} from "./Content/Content";

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
    onClose: () => void
    onlyMessage?: boolean
}

export const CustomModal: FC<CustomModalPropsType> = ({isOpen, onClose, onlyMessage}) => {
    const {
        label,
        message,
        inputValue,
        changeInputValueHandler,
        onSubmitHandler,
        onCloseModalHandler
    } = useCustomModal(onClose)

    return (
        <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
            {
                onlyMessage
                    ? <OnlyMessageContent message={message}
                                          onSubmit={onSubmitHandler}/>
                    : <Content message={message}
                               label={label}
                               inputValue={inputValue}
                               changeInputValueHandler={changeInputValueHandler}
                               onSubmit={onSubmitHandler}
                               onClose={onCloseModalHandler}/>
            }
        </Modal>
    )
}

