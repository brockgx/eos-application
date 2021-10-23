/*
 * Name: Topbar.js
 * Purpose: Renders the Topbar component
 * 
 * Usage: implemented in App.js to render a topbar on every page
 */

// Module imports here
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// import icons and assets here
import * as FaIcons from 'react-icons/fa';
import logo from '../../assets/logo.png'

// Styled component declarations
const TopbarContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #212D40;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0px 1px 5px -3px rgba(47,84,117,0.53);
  -webkit-box-shadow:0px 1px 5px -3px rgba(47,84,117,0.53);
  -moz-box-shadow: 0px 1px 5px -3px rgba(47,84,117,0.53);
`;
const TopbarWrapper = styled.div`
  height: 100%;
  padding: 5px 0px 0px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopLeft = styled.div`
  padding-right: 20px;
`;
const TopRight = styled.div`
  padding-right: 20px;
  display: flex;
  align-items: center;
  color: rgb(183, 192, 199);
  cursor: pointer;
`;
const Image = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-bottom: 10px;
  background-color: #687CA1;
`;
const Logo = styled.span`
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 42px;
  font-weight: 600;
  color: #FFFF;
  cursor: pointer;
`;
const Text = styled.span`
  margin-left: 15px;
  color: rgb(183, 192, 199);
  font-size: 26px;
  font-weight: 500;
  text-decoration: none;

  :hover {
    font-weight: 600;
  }
`;

/*
 * This is the main implementation for the Topbar component 
*/
const Topbar = () => {
  return (
    <TopbarContainer>
      <TopbarWrapper>
        <TopLeft>
          <Link
            style={{display: "flex", alignItems: "center", textDecoration: "none"}}
            to='/dashboard'
          >
            <Image src={logo} alt="logo" />
            <Logo>EoS Monitor</Logo>
          </Link>
        </TopLeft>
          
        <TopRight>
          <FaIcons.FaRegUserCircle size={24}/>
          <Text>Account</Text>
        </TopRight>
      </TopbarWrapper>
    </TopbarContainer>
  )
}
export default Topbar