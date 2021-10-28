/*
 * Name: Machines.js
 * Purpose: Renders various components that make up the 'Machine Tiles' 
 * 
 * Usage: Dashboard.js - maps an array of machines to this tile component
 */

// Module imports here
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components'
import clsx from "clsx";
import ip2int from 'ip2integer'

// Component imports here
import MachineMetrics from './MachineMetrics';
import { IconButton, Collapse, TextField } from '@material-ui/core'

// Icon and assset imports here
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import windows from '../../assets/windows.png'
import linux from '../../assets/linux.png'

// Styled component declarations
const Container = styled.div`
  padding-bottom: 10px;
`;
const Wrapper = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 2px;
  width: 100%;
  box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
`;
const Top = styled.div`
  display: flex;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex: 2.5;  
  margin-top: 5px;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 400;
`;
const MachineNameContainer = styled.span`
  font-size: 28px;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin: 5px 0px;
`;
const DetailsRow = styled.span`
  display: flex;
  margin-top: 5px;
  font-size: 20px;
  font-weight: 300;
  align-items: center;
`;
const RightContainer = styled.div`
  flex: 2;  
  display: flex;
  justify-content: flex-end;
  font-size: 22px;
  font-weight: 300;
  margin: 5px 10px;;
`;
const Bottom = styled.div`
`;
const Image = styled.img`
  padding: 5px;
  margin-top: 5px;
  width: 120px;
  height: 120px;
  src: ${(props) => props.src };
`;
const EditName = styled.span`
  margin-left: 10px;
`;
const MachineStatusIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color === 1 ? 'green' : 'red' };
`;
const MachineStatusName = styled.span`
  margin-left: 5px;
`;
const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 20px;
  font-weight: 300;
`;
const Metrics = styled.div`
  padding-top: 10px;
  display: flex;
  border-top: 1px solid #687CA1;
  font-size: 22px;
  font-weight: 300;
`;
const Text = styled.span`
  font-size: 22px;
  font-weight: 600;
  margin: 7px 0px;
`;

// Use Material UI styles to handles rotation of arrow icon on drop down
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

/*
 * This is the main implementation for the Machines component
 * Renders a machine tile with an expandable Metrics dropdown
 * Dropdown passess machine_name to the MachienMetrics component
 */
const Machines = (props) => {
  
  // destructure machine objecct from props
  const {machine} = props

  // Instantiate useHistory hook to navigate to other pages
  const history = useHistory();

  // Instantiate useStyles for material UI animation
  const classes = useStyles();

  // Variable to handle expansion of metrics container
  const [expanded, setExpanded] = useState(false);

  // Variables to handle the change of nickname on the UI
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')

  // Variable to receive data from child component (MachineMetrics.js)
  const [childData, setChildData] = useState('')

  // Function to handle callback from child component
  // Receives timestamp from latest data metrics
  // Converts timestamp to datetime using "Date" function
  const handleCallback = (childData) =>{
    const time = new Date(childData * 1000).toLocaleString()
    setChildData(time)
  }

  // Function to handle the click event of the dropdown arrow
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Function to send a DELETE rquest to the API
  // Remove a client machine from the DB
  const handleDelete = () => {
    fetch(`/dash/clientmachines/${machine.id}`, {
      method: 'DELETE',
    }).then(() => {
      window.location.reload();
    })
  };

  // Function to handle state of editable name field
  const changeEditMode = () => {
    setEdit(!edit)
  }

  // Function to send PUT request to API
  // Updates nickname in DB using user input from editable field
  const handleEdit = () => {
    fetch(`/dash/clientmachines/${machine.id}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({"new_name": name})
    }).then(() => {
      setEdit(false)
      window.location.reload();
    })
  };

  // Redirect functions to navigate to "Commands page"
  const redirect_command = () =>{
    //set the pathname to update the sidebar selection
    window.location.pathname = '/command';

    // Pass data to prefill commands form with "machine name"
    history.push({
      pathname: '/command',
      state:{machine_name: machine.name}
    })
  }
  
  // Redirect functions to navigate to "Query page"
  const redirect_query = () =>{
    // Pass data to prefill query filter with "machine name"
    history.push({
      pathname: '/query',
      state:{machine_name: machine.name}
    })
  }

  return (
    <Container>
      <Wrapper>
        {/*
          * "Top" renders top half of Machine Tile
          * Includes machine connection information
          * plus in depth machine details
          * and common functions w/ delete functionality 
          */}
        <Top>
          <ColumnContainer>
            {
              machine.os.toLowerCase() === "windows"
              ? <Image src={windows}/>
              : <Image src={linux}/>
            }
            <DetailsContainer style={{marginLeft: "10px"}}>
              <MachineNameContainer>
                <b>Name: </b> 
                <EditName>
                {
                  edit === true ?
                    <div>
                      <TextField
                        type="text"
                        placeholder="Edit nickname"
                        required
                        id="name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                      <FaIcons.FaTimes size={20} style={{color: "red", cursor: "pointer"}} onClick={changeEditMode}/>
                      <FaIcons.FaCheck size={20} style={{margin: "0px 5px", color: "green", cursor: "pointer"}} onClick={handleEdit}/>
                    </div>
                  :
                    <div>
                      {machine.name}
                      <FaIcons.FaPen size={16} style={{ margin: "0px 5px", color: "#2C374B", cursor: "pointer"}} onClick={changeEditMode}/>
                    </div>
                }   
                </EditName>
              </MachineNameContainer>
              <DetailsRow>
                <b>Host name:&nbsp;</b>{machine.host_name}     
              </DetailsRow>
              <DetailsRow>
                <b>Last Update:&nbsp;</b>
                { childData === ""
                ? "pending"
                : childData }
              </DetailsRow>
              <DetailsRow>
                <b>Status:&nbsp;</b>
                <MachineStatusIcon color={machine.status} />
                <MachineStatusName>
                {
                  machine.status === 1
                  ? "Connected"
                  : "Disconnected"
                }
                </MachineStatusName>
              </DetailsRow>
            </DetailsContainer>
          </ColumnContainer>

          <ColumnContainer>
            <DetailsContainer>
              <Text>Machine Details:</Text>
              <DetailsRow>
                <b>MAC address:&nbsp;</b>{machine.mac_address}     
              </DetailsRow>
              <DetailsRow>
                <b>IP address:&nbsp;</b>{ip2int.toIp(machine.address)}     
              </DetailsRow>
              <DetailsRow>
                <b>Ports:&nbsp;</b>{machine.ports}  
              </DetailsRow>
            </DetailsContainer>
          </ColumnContainer>

          <ColumnContainer>
            <DetailsContainer>
              <Text>Common Functions:</Text>
              <DetailsRow>
                <IoIcons.IoMdPower
                  onClick={redirect_command}
                  style={{color: "#A53C27", padding: "3px 10px 0px 0px", cursor: "pointer"}}
                />
                <b>Power</b>
              </DetailsRow>
              <DetailsRow>
                <FaIcons.FaDatabase
                  onClick={redirect_query}
                  style={{color: "#4A5A76", padding: "3px 10px 0px 0px", cursor: "pointer"}}
                />
                <b>Query</b>
              </DetailsRow>   
            </DetailsContainer>      
          </ColumnContainer>
          <RightContainer>
            <FaIcons.FaRegTrashAlt 
              onClick={handleDelete}
              style={{color: "#A53C27", padding: "5px", cursor: "pointer"}}
            />
          </RightContainer>
        </Top>

        {/*
          * "Bottom" renders expandable Metrics section
          * Pass machine name To "MachineMetrics" component
          * which gets metrics from API and renders up to date
          * machine metric tables & graphs
          */}
        <Bottom>
          <MetricsContainer>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show More"
            >
              <ExpandMoreIcon/>
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Metrics>
                <MachineMetrics parentCallback={handleCallback} machineName={machine.mac_address}/>
              </Metrics>
            </Collapse>  
          </MetricsContainer>
        </Bottom>
      </Wrapper>
    </Container>
  )
}
export default Machines