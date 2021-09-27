import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import { IconButton, Collapse, Table, TableBody, TableCell,TableHead, TableRow } from '@material-ui/core'
import styled from 'styled-components'
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as FaIcons from 'react-icons/fa';
import MachineMetrics from './MachineMetrics';

import ip2int from 'ip2integer'
import windows from '../../assets/windows.png'
import linux from '../../assets/linux.png'

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
const DetailsMiddle = styled.div`
  display: flex;
  justify-content: flex-start; 
  flex: 1;
  font-size: 20px;
  font-weight: 400;
`;

const DetailsRight = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 22px;
  font-weight: 300;
  margin: 5px 10px;;
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
  padding: 10px 0px 0px 5px;
  display: flex;
  border-top: 1px solid #687CA1;
  font-size: 22px;
  font-weight: 300;
`;

const MachineInfo = styled.span`
  margin-top: 5px;
  font-size: 22px;
  font-weight: 300;
`;

const Text = styled.span`
  font-size: 22px;
  font-weight: 400;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  border-top: 1px solid #687CA1;
`;

const Tags = styled.div`
  font-size: 18px;
  font-weight: 400;
  display: flex;
  padding: 10px 0px;
`;

const AddTags = styled.button`
  font-size: 16px;
  font-weight: 400;
  border-radius: 5px;
  border-color: #8B9AB7;
  background-color: #8B9AB7;
  color: #f8f7ff;
  cursor: pointer;
  &:hover {
    border-color: #AEB8CC;
    background-color: #AEB8CC;
  }
  width: 100px;
  height: 35px;
  margin-left: auto;
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

const Machines = ({machine}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const history = useHistory();

  const handleDelete = () => {
    fetch('/dash/clientmachines', {
      method: 'DELETE',
    }).then(() => {
        history.push('/dashboard')
    })
  };

  const handleEdit = () => {
    history.push('/dashboard')
  };

  const rows = [
    {
      key: "Name",
      value: "miz007"
    },
    {
      key: "Location",
      value: "swin-01"
    },
  ]

  return (
    <Container>
      <MachinesWrapper>
        <Top>
          <DetailsLeft>
            {
              machine.os === "windows"
              ? <Image src={windows}/>
              : <Image src={linux}/>
            }
            <Details>
              <MachineName>
                <b>Name:</b> {machine.name}  
                <MachineInfo> ({ip2int.toIp(machine.address)})</MachineInfo>
              </MachineName>
              <MachineTime>
                <b>Last Update:</b> {machine.time}
              </MachineTime>
              <MachineStatus>
                <MachineStatusIcon color={machine.status} />
                <MachineStatusName>
                {
                  machine.status === "0"
                  ? "Connected"
                  : "Disconnected"
                }
                </MachineStatusName>
              </MachineStatus>
            </Details>
          </DetailsLeft>
          <DetailsMiddle>
            Common Functions: <br/>
            - Restart <br/>
            - Shut Down
          </DetailsMiddle>
          <DetailsRight>
            <FaIcons.FaEdit
              onClick={handleEdit}
              style={{color: "#4A5A76", padding: "5px", cursor: "pointer"}}
            />
            <FaIcons.FaRegTrashAlt 
              onClick={handleDelete}
              style={{color: "#A53C27", padding: "5px", cursor: "pointer"}}
            />
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
                <MachineMetrics machineName={machine.name} />
              </MachineDetails>
              <TagsWrapper>
                <Text>Tags:</Text>
                <Tags style={{width: "100%", padding: "10px 0px"}}>
                <Table sx={{ minWidth: 750, border: "solid 0.5px" }}>
                  <TableHead style={{ backgroundColor: "#F3F4F7", borderBottom:"solid 1px"}}>
                    <TableRow style={{borderBottom: "solid 2px #56698A "}}>
                      <TableCell style={{fontSize: "18px", fontWeight: "400"}}>Key</TableCell>
                      <TableCell style={{fontSize: "18px", fontWeight: "400", borderLeft: "solid 1px #56698A "}}>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {rows.map((row) => ( 
                      <TableRow
                        key={row.key}
                        style={{fontSize: "16px", fontWeight: "300"}}
                      >
                        <TableCell component="th" scope="row" style={{fontSize: "16px", fontWeight: "300", width: "50%"}}>
                          {row.key}
                        </TableCell>
                        <TableCell style={{fontSize: "16px", fontWeight: "300", borderLeft: "solid 1px #56698A ", width: "50%"}}>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tags>
                <AddTags>Add Tags</AddTags>
              </TagsWrapper>
            </Collapse>  
          </MoreDetails>
        </Bottom>
      </MachinesWrapper>
    </Container>
  )
}

export default Machines
