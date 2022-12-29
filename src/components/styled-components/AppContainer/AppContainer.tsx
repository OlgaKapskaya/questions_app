import styled from "styled-components";

type AppContainerPropsType = {
    padding?: string
}
export const AppContainer: any = styled.div<AppContainerPropsType>`
  display: flex;
  padding: ${(props) => props.padding};
  align-items: flex-start;
  flex-direction: column;
`;
