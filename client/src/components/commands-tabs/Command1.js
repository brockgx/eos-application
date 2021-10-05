import * as React from 'react'
import PresetCommandOptions from './PresetCommandOptions';
import styled from 'styled-components';

const CmdOneContainer = styled.div`
      border: 3px solid grey;
      marginBottom: 30;
`;

const HeadingText = styled.div`
      border: 3px solid grey;
`;

  export default function Command1() {

return (
  <CmdOneContainer>
    <HeadingText>
    [TODO: command 1]
    </HeadingText>
    <div>
      <PresetCommandOptions />
    </div>
  </CmdOneContainer>
  )
}


