/*
 * Name: MachineMetrics.js
 * Purpose: Renders various graphs & tables that make up the 'Machine Metrics' dropdown
 * 
 * Usage: Child of "Machines.js"
 *          Takes machine_name as a prop to get machien metrics from DB
 */

// Module imports here
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";


// Component imports here
// import ProgressBar from "@ramonak/react-progress-bar";
import ProgressBar from "./ProgressBar";

// Styled component declarations
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const MetricContainer = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChartContainer = styled.div`
`;
const ProgressWrapper = styled.div`
  margin: 10px ;
`;
const DiskContainer = styled.div`

`;
const DiskWrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
const TableWrapper = styled.div`
  display: flex;
  margin: 10px 50px;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
const TableHeader = styled.th`
  border: 1px solid #687CA1;
  padding: 8px;  
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  border: 1px solid white;
  background-color: #687CA1;
  color: white;
  font-size: 18px;
  font-weight: 400;
`;
const TableHead = styled.thead`
`;
const TableBody = styled.tbody`
`;
const TableRow = styled.tr`
  font-size: 16px;
  font-weight: 300;
  text-align: center;

  &:nth-child(even) {
    background-color: #CDD3E0;
  }

  &:hover{
    background-color: #AEB8CC;
  }
`;
const TableData = styled.td`
  border: 1px solid #687CA1;
  padding: 8px;
`;
const Title = styled.span`
  margin-top: 5px;
  font-size: 22px;
  font-weight: 400;
`;
const Text = styled.span`
  padding: 5px;
  font-size: 20px;
  font-weight: 400;
  margin-right: 5px;
`;

/*
 * This is the main implementation for the Machine Metrics component
 * Fetches machine metrics from API and renders graphs & tables
 */
const MachineMetrics = (props) => {
  
  // destructure machine name from props
  const {machineName} = props
  
  // Object to define characteristics of Radial Chart components
  const radialChart = (
    {
      options: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              show: true,
              name: {show: false},
              value: {
                show: true,
                fontSize: '22px',
                fontWeight: 300,
                color: undefined,
                offsetY: 12
              }
            },
          }
        },
        colors: ["#687CA1"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.2,
            opacityFrom: 0.8,
            opacityTo: 1,
            stops: [0, 75, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
      },
    }
  );

  // Variable used to store the machines metrics returned from the API
  const [machineMetrics, setMachineMetrics] = useState({description: "waiting", content: {sysMetrics: [], appMetrics: []}})

  // Hook used to render the machine metrics returned from API call
  // Implements "callback" to pass collection time of metrics to parent component ("Machines.js")
  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchMetrics()
      setMachineMetrics(data)
      props.parentCallback(data.content.sysMetrics[0].time)
    }
    getMetrics()
  }, [])

  // Function to fetch machine metrics from DB
  const fetchMetrics = async () => {
    const resp = await fetch(`/dash/clientmachinemetrics/${machineName}`)
    const data = await resp.json()
    if(resp.ok) {
      console.log(data)
      return data;
    } else {
      throw Error(`Request rejected with status ${resp.status}`);
    }
  }
  return (
    <Container>
        {machineMetrics.description === "waiting"
          ? <Text>No machine metrics to display.</Text>
          : <Wrapper>
              {machineMetrics.content.sysMetrics.map((metrics) => {
                return (
                  <Wrapper>
                    <MetricContainer>
                      <Title>
                        CPU Usage:
                      </Title>
                      <ChartContainer>
                        <Chart
                          key={metrics.name}
                          options={radialChart.options}
                          series={[metrics.cpu]}
                          type="radialBar"
                          width="300"
                        />
                      </ChartContainer>
                    </MetricContainer>
                    <MetricContainer>
                      <Title>
                        RAM Usage:
                      </Title>
                      <ChartContainer>
                        <Chart
                          key={metrics.name}
                          options={radialChart.options}
                          series={[metrics.ram]}
                          type="radialBar"
                          width="300"
                        />
                      </ChartContainer>
                    </MetricContainer>
                    <MetricContainer >
                      <Title>
                        Disk Usage:
                      </Title>
                      <ProgressWrapper >
                        <DiskContainer>
                          {metrics.disk.map((disk) => {
                            return (
                              <DiskWrapper>
                                <Text >{disk.name}</Text>
                                <ProgressBar
                                  labelAlignment="outside"
                                  labelColor="black"
                                  bgColor="#7587A9"
                                  height="30px"
                                  backgroundColor="#7587A9"
                                  width="150px"
                                  completed={parseFloat(disk.usage)}
                                />
                              </DiskWrapper>
                            )
                          })}
                        </DiskContainer>
                      </ProgressWrapper>
                    </MetricContainer>
                    <MetricContainer>
                      <Title>
                          Network Usage:
                      </Title>
                      <ProgressWrapper style={{marginLeft: "42px"}}>
                        <ProgressBar 
                          labelAlignment="outside"
                          labelColor="black"
                          bgColor="#7587A9"
                          height="30px"
                          width="150px"
                          backgroundColor="#7587A9"
                          completed={parseFloat(metrics.network)} 
                          />
                      </ProgressWrapper>
                    </MetricContainer>
                  </Wrapper>
                );
              })}
              <TableContainer>
                <Title >
                  Top 5 Processes:
                </Title>
                <TableWrapper>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableHeader>App Name</TableHeader>
                        <TableHeader align="center">Time</TableHeader>
                        <TableHeader align="center">CPU (%)</TableHeader>
                        <TableHeader align="center">RAM (%)</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {machineMetrics.content.appMetrics.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableData >
                            {row.app_name}
                          </TableData>
                          <TableData align="center">{new Date(row.time * 1000).toLocaleString()}</TableData>
                          <TableData align="center">{row.cpu}</TableData>
                          <TableData align="center">{row.ram}</TableData>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableWrapper>
              </TableContainer>
            </Wrapper>
        }
    </Container>
  )
}
export default MachineMetrics
