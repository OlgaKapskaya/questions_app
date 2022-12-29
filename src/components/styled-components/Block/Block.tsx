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