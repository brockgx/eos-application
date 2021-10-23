/*
 * Name: support.js
 * Purpose: Renders various components that make up the 'Support Page' 
 * 
 * Used by: App.js to render the Support page
 */

// Module imports here
import React from 'react';
import styled from 'styled-components';


// Styled component declarations
const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Details = styled.div`
  display: flex;
  border: 1px #212D40;
  border-radius: 5px;
  padding: 10px;
  flex-direction: column;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  width: 95%;
  height: 1000px;
`;
const TopText = styled.span`
  font-weight: 600;
  font-size: 44px;
  padding: 15px;
`;
const Text = styled.span`
  font-weight: 500;
  font-size: 24px;
  padding: 15px;
`;
const Support = () => {
    return (
        <Container>
            <Details>
                <TopText>Need Help?</TopText>
                <Text>Contact:</Text>
            </Details>
        </Container>
    )
}
export { Support }