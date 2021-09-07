import {useState, useEffect} from 'react'

import { DataGrid } from "@material-ui/data-grid";
import styled from 'styled-components';

import '../styles/query.css';

const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

// const Title = styled.h1`
//   font-weight: 600;
//   text-align: center;
// `;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 20px 40px;
`;

const TopText = styled.span`
  font-weight: 500;
  font-size: 44px;
  padding-bottom: 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 40px;
`;

const Left = styled.div`
  flex: 1;  
  display: flex;
  padding: 5px;
  flex-direction: column;
  height: 75vh;
`;
const Form = styled.div`
  border-radius: 5px;
  padding: 30px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  height: 100%;
`;

const Right = styled.div`
  flex: 1;  
  display: flex;
  flex-direction: column;
  padding: 5px;

  height: 75vh;
  background-colour: white;
`;

const BottomText = styled.span`
  font-weight: 400;
  font-size: 38px;
  padding-bottom: 20px;
`;

const QueryResult = styled.div`
  border-radius: 5px;
  padding: 20px;
  background-color: #ffffff;
  height: 100%;
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;



const Query = (props) => {
    const [messages, setMessages] = useState({description: "default desc", content: []})
  
    useEffect(() => {
      const getMessages = async () => {
        const messagesFromServer = await fetchMessages()
        setMessages(messagesFromServer)
      }
  
      getMessages()
    }, [])
  
    // Fetch device data from DB
    const fetchMessages = async () => {
      const resp = await fetch('/getmetrics')
      const data = await resp.json()
      if(resp.ok) {
        //console.log(data.content[4].message)
        return data;
      } else {
        throw Error(`Request rejected with status ${resp.status}`);
      }
    }

    // Columns for device grid
    const columns = [
        { 
            field: "id",
            headerName: " ID",
            width: 100,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: "machine_name",
            headerName: "Machine Name",
            width: 180,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: "time",
            headerName: "Time", 
            width: 160,
            headerAlign: 'center', 
            align: 'center',
        },
        { 
            field: "app_name",
            headerName: "Application", 
            width: 160,
            headerAlign: 'center', 
            align: 'center',
        },
        { 
            field: "app_cpu",
            headerName: "CPU (%)", 
            width: 160,
            headerAlign: 'center', 
            align: 'center',
        },
        { 
            field: "app_ram",
            headerName: "RAM (%)", 
            width: 160,
            headerAlign: 'center', 
            align: 'center',
        }
    ]
    
    return (
      <Container>
        <Wrapper>
          <Bottom>
            <Left>
              <BottomText>Query Form</BottomText>
              <Form>
                [TODO]
              </Form>
            </Left>
            <Right>
              <BottomText>Results</BottomText>
              <QueryResult>
                <DataGrid
                  className="deviceList"
                  rows={messages.content}
                  disableColumnMenu
                  disableSelectionOnClick
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  columns={columns}
                />
              </QueryResult>
            </Right>
          </Bottom>
          
        </Wrapper>

      </Container>
    )
}

export { Query }