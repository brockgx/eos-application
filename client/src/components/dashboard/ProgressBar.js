/*
 * Name: ProgressBar.js
 * Purpose: Renders a progress bar component that accepts a numeric value
 * 
 * Usage: Rendered in MachineMetrics.js for disk & network usage visuals 
 */

// Module imports here
import styled from 'styled-components';

// Styled component declarations
const Container = styled.div`
 display: flex;
 align-items: center;
`;
const BarContainer = styled.div`
`;
const Bar = styled.div`
  height: 34px;
  width: 100%;
  min-width: 185px;
  background-color: #E7E9EF;
  border-radius: 5px;
`;
const FillBar = styled.div`
  height: 100%;
  width: ${(props) => props.fill}%;
  background-color: ${(props) => props.color};
  border-radius: inherit;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Label = styled.span`
  color: ${(props) => props.color >= 80 ? 'red' : '#475571;' };
  font-size: 22px;
  font-weight: 400;
  padding-left: 5px;
`;

/*
 * This is the main implementation for the Progress Bar component
 * Requries two props to be passed to it to fill bar:
 * backgroundColor: sets the color of the fill
 * complete: sets the percentage filled + the label value
 */
const ProgressBar = ({ backgroundColor, completed }) => {
  return (
    <Container>   
      <BarContainer>
        <Bar>
          <FillBar color={backgroundColor} fill={completed} >
            <Label color={completed}>
              {completed}%
            </Label>
          </FillBar>
        </Bar>
      </BarContainer>
    </Container>
  )
}
export default ProgressBar
