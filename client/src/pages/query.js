import {useState, useEffect} from 'react'

import { DataGrid } from "@material-ui/data-grid";
import { Columns } from '../components/query/ColumnData';
import styled from 'styled-components';
import { Modal, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';


// import '../styles/query.css';

const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
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

const Text = styled.span`
  font-weight: 400;
  font-size: 22px;
  padding-bottom: 10px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  justify-content: space-between;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const FormWrapper = styled.div`
  padding: 30px;
`;

const Form = styled.form`
  padding: 30px;
  height: 100%;
`;

const FormItem = styled.div`
`;

const QueryResult = styled.div`
  padding: 20px;
  height: 700px;
`;

const defaultValues = {
  name: ""
};


const Query = (props) => {
    const [query, setQuery] = useState(defaultValues)
    const [machines, setMachines] = useState({description: "default desc", content: []})
    const [machineMetrics, setMachineMetrics] = useState({description: "default desc", content: []})

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setQuery({ ...query, [name]: value,});
      fetch(`/query/clientmachinemetrics?name=${query.name}`, {
        method: 'GET',
        body: query.name
      }).then(() => {
        window.location.reload();
      })
    };

    // Get all machines from db to display in drop down
    useEffect(() => {
      const getMachines = async () => {
        const machinesFromServer = await fetchMachines()
        setMachines(machinesFromServer)
      }
  
      getMachines()
    }, [])

    const fetchMachines = async () => {
      const resp = await fetch('/query/clientmachines')
      const data = await resp.json()
      if(resp.ok) {
        return data;
      } else {
        throw Error(`Request rejected with status ${resp.status}`);
      }
    }

    // Get sys and app metrics from db based on machine name
    useEffect(() => {
      const getMetrics = async () => {
        const data = await fetchMetrics()
        setMachineMetrics(data)
      }
  
      getMetrics()
    }, [])
  
    // Fetch device data from DB
    const fetchMetrics = async () => {
      const resp = await fetch(`/query/clientmachinemetrics?name=${query.name}`)
      const data = await resp.json()
      if(resp.ok) {
        console.log(data.content)
        return data;
      } else {
        throw Error(`Request rejected with status ${resp.status}`);
      }
    }
    
    return (
      <Container>
        <Wrapper>
          <Top>
            <TopText>Query Database</TopText>
          </Top>
          <Bottom>
              <Form>
              <Text>Choose a machine to query</Text>
                <FormItem>
                  <FormControl style={{width: "100%"}}>
                    <InputLabel>Machine Name</InputLabel>
                    <Select
                      name="name"
                      value={query.name}
                      onChange={handleInputChange}
                    >
                      <MenuItem key="all" value="all">
                        All Machines
                      </MenuItem>
                      {machines.content.map((machine) => (
                        <MenuItem key= {machine.name} value={machine.name}>
                          {machine.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </FormItem>
              </Form>
              <QueryResult>
                {/* <DataGrid
                  className="deviceList"
                  rows={messages.content}
                  disableColumnMenu
                  disableSelectionOnClick
                  pageSize={15}
                  rowsPerPageOptions={[15, 25, 50]}
                  columns={Columns}
                /> */}
              </QueryResult>
          </Bottom>
        </Wrapper>

      </Container>
    )
}

export { Query }