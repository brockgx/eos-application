import {useState, useEffect} from 'react';

import styled from 'styled-components';
import Chart from "react-apexcharts";
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
`;

const MetricContainer = styled.div`
  display: flex;
  flex: 1;
  margin-left: 10px;
  flex-direction: column;
`;

const TableContainer = styled.div`
  display: flex;
  margin-left: 70px;
  flex-direction: column;
`;

const ChartContainer = styled.div`
  margin-left: 50px;
`;
const ProgressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;
const ProgressContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  padding: 80px 0px 0px 20px;
`;

const TableWrapper = styled.div`
  display: flex;
  margin: 10px 0px 0px 170px;
`;

const Title = styled.span`
  margin-top: 5px;
  font-size: 22px;
  font-weight: 400;
`;

const MachineMetrics = ({machineName}) => {
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

  const [machineMetrics, setMachineMetrics] = useState({description: "default desc", content: {sysMetrics: [], appMetrics: []}})

  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchMetrics()
      setMachineMetrics(data)
    }

    getMetrics()
  }, [])

  // Fetch device data from DB
  const fetchMetrics = async () => {
    const resp = await fetch(`/dash/clientmachinemetrics/${machineName}`)
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
        {machineMetrics.content.sysMetrics.map((metrics) => {
          return (
            <>
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
                <ProgressWrapper >
                  <Title>
                    Disk Usage:
                  </Title>
                  <ProgressContainer>
                    <ProgressBar
                      labelAlignment="outside"
                      labelColor="black"
                      bgColor="#7587A9"
                      height="30px"
                      width="150px"
                      completed={metrics.disk} />
                  </ProgressContainer>
                </ProgressWrapper>
                <ProgressWrapper >
                  <Title>
                    Network Usage:
                  </Title>
                  <ProgressContainer>
                    <ProgressBar 
                      labelAlignment="outside"
                      labelColor="black"
                      bgColor="#7587A9"
                      height="30px"
                      width="150px"
                      completed={metrics.network} 
                      />
                  </ProgressContainer>
                </ProgressWrapper>
              </MetricContainer>
            </>
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
                  <TableCell>App Name</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">CPU (%)</TableCell>
                  <TableCell align="center">RAM (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {machineMetrics.content.appMetrics.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell >
                      {row.app_name}
                    </TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">{row.cpu}</TableCell>
                    <TableCell align="center">{row.ram}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </TableContainer>
      </Wrapper>
    </Container>
  )
}

export default MachineMetrics
