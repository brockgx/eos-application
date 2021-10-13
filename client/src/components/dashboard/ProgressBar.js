import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
margin-right: 30px;
margin-top: 50px;
`;

const Bar = styled.div`
  height: 34px;
  width: 120%;
  background-color: #E7E9EF;
  border-radius: 50px;
  margin: 0px 50px;
`;

const FillBar = styled.div`
  height: 100%;
  width: ${(props) => props.fill}%;
  background-color: ${(props) => props.color};
  border-radius: inherit;
  text-align: right;
`;

const Label = styled.span`
  padding: 10px;
  color: ${(props) => props.color <= 0 ? 'red' : '#212D40' };
  font-size: 14px;
  font-weight: 500;
`;

const ProgressBar = ({ backgroundColor, completed }) => {
  return (
    <Container>
      <Bar>
        <FillBar color={backgroundColor} fill={completed}>
          <Label color={completed}>
          {
            completed === 0
            ? " 0.0% " 
            : `${completed}%`
          }
          </Label>
        </FillBar>
      </Bar>
    </Container>
  )
}
export default ProgressBar
