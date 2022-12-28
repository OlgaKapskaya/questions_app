import styled from "styled-components";

type BlockPropsType = {
    flexDirection?: string
    alignItems?: string
    justifyContent?: string
    width?: string
}
export const Block: any = styled.div<BlockPropsType>`
  display: flex;
  align-items: ${(props) => props.alignItems ? props.alignItems : "center"};
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : "center"};
  flex-direction: ${(props) => props.flexDirection ? props.flexDirection : "row"};
  margin-top: 10px;
  width: ${(props) => props.width ? props.width : "auto"};
`;

type AppContainerPropsType = {
    padding?: string
}
export const AppContainer: any = styled.div<AppContainerPropsType>`
  display: flex;
  padding: ${(props) => props.padding};
  align-items: flex-start;
  flex-direction: column;
`;


export const Input: any = styled.input`
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0 0.75rem;
  margin: 5px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #32274B;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &::placeholder {
    color: #32274B;
    opacity: 0.4;
  }
  &:focus {
    border-color: #32274B;
    outline: 0;
  }
`;
export const ErrorMessage: any = styled.span`
  margin-top: 10px;
  color: #850000;
`;