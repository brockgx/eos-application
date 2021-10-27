import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
 display: flex;
 align-items: center;
 
`;
const BarContainer = styled.div`

`;

const Bar = styled.div`
  height: 34px;
  width: 100%;
  background-color: #E7E9EF;
  border-radius: 50px;
  margin: 0px 100px 0px 40px;
`;

const FillBar = styled.div`
  height: 100%;
  width: ${(props) => props.fill}%;
  background-color: ${(props) => props.color};
  border-radius: inherit;
  text-align: right;
`;

const Label = styled.span`
  color: ${(props) => props.color >= 90 ? 'red' : '#212D40' };
  font-size: 18px;
  font-weight: 400;
`;

const ProgressBar = ({ backgroundColor, completed }) => {
  return (
    <Container>
      <Label color={completed}>
          {
            completed === 0
            ? " 0.0% " 
            : `${completed}%`
          }
      </Label>
      <BarContainer>
        <Bar>
          <FillBar color={backgroundColor} fill={completed} />
        </Bar>
      </BarContainer>
      
    </Container>
  )
}
export default ProgressBar
