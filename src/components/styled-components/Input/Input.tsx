import styled from "styled-components";

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