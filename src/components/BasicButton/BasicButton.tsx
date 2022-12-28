import {FC} from "react";
import styled from "styled-components";

type ButtonPropsType = {
    primary?: string
}
const Button: any = styled.button<ButtonPropsType>`
  background: ${props => props.primary ? "#32274B" : "white"};
  color: ${props => props.primary ? "white" : "#32274B"};
  
  font-size: 1em;
  margin: 0 0.5em;
  padding: 0.25em 1em;
  border: 3px solid #32274B;
  border-radius: 5px;
  &:hover {
    background: ${props => props.primary ? "#4E447F" : "white"};
    color: ${props => props.primary ? "white" : "#4E447F"};
    border: 3px solid #4E447F;
  }
  &:disabled {
    background: ${props => props.primary ? "#4E447F" : "white"};
    color: ${props => props.primary ? "white" : "#4E447F"};
    border: 3px solid #4E447F;
  }
`;

type BasicButtonPropsType = ButtonPropsType & {
    name: string
    onClick: () => void
    disabled?: boolean
}
export const BasicButton:FC<BasicButtonPropsType> = ({name, onClick , disabled}) => {
    return (
        <Button onClick={onClick} disabled={disabled} primary > {name} </Button>
    )
}