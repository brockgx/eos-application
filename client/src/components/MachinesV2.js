import {useState} from 'react';

import { IconButton, Collapse } from '@material-ui/core'
import styled from 'styled-components'
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import windows from '../assets/windows.png'
// import windows1 from '../assets/windows1.png'
// import windows2 from '../assets/windows2.png'
import windows3 from '../assets/windows3.png'
// import linux from '../assets/linux.png'
import linux1 from '../assets/linux1.png'

const Container = styled.div`
  padding-bottom: 10px;

`;
const MachinesWrapper = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 2px;
  width: 100%;
  box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
`;

const DetailsLeft = styled.div`
  display: flex;  
  flex: 1;
`;

const DetailsRight = styled.div`
  display: flex;
  flex: 1.5;
  font-size: 22px;
  font-weight: 300;
`;

const Top = styled.div`
  display: flex;
`;

const Bottom = styled.div`

`;

const Image = styled.img`
  padding: 5px;
  width: 90px;
  height: 90px;
  margin-top: 5px;
  src: ${(props) => props.src };
`;

const Details = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const MachineName = styled.span`
font-size: 28px;
font-weight: 400;
`;

const MachineTime = styled.span`
font-size: 18px;
font-weight: 400;
`;

const MachineStatus = styled.div`
  display: flex;
  justify-contet: space-around;
`;

const MachineStatusIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color === "Connected" ? 'green' : 'red' };
`;

const MachineStatusName = styled.span`
  margin-left: 5px;
`;

const MoreDetails = styled.div`
padding: 0px 10px;
display: flex;
flex-direction: column;
justify-content: space-around;
font-size: 20px;
font-weight: 300;
`;

const MachineDetails = styled.div`
  padding: 10px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-top: 1px solid #687CA1;

`;

const MachineInfo = styled.span`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 5px;
`;

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));
const MachinesV2 = ({machine}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Container>
      <MachinesWrapper>
        <Top>
          <DetailsLeft>
            {
              machine.machine_type === "windows"
              ? <Image src={windows3}/>
              : <Image src={linux1}/>
            }
            <Details>
              <MachineName>
                <b>Name:</b> {machine.machine_name}  
                <MachineInfo> ({machine.ip_address})</MachineInfo>
              </MachineName>
              <MachineTime>
                <b>Last Update:</b> {machine.time}
              </MachineTime>
              <MachineStatus>
                <MachineStatusIcon color={machine.status} />
                <MachineStatusName>{machine.status}</MachineStatusName>
              </MachineStatus>
            </Details>
          </DetailsLeft>
          <DetailsRight>
            <Details>
            </Details>
          </DetailsRight>
        </Top>
        <Bottom>
          <MoreDetails>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <MachineDetails>
                <MachineInfo>
                  <b>CPU Usage:</b> {machine.cpu}
                </MachineInfo>
                <MachineInfo>
                  <b>RAM Usage:</b> {machine.ram}
                </MachineInfo>
              </MachineDetails>
            </Collapse>  
          </MoreDetails>
        </Bottom>
      </MachinesWrapper>
    </Container>
  )
}

export default MachinesV2
