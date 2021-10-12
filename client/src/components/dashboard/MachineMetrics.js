import {useState, useEffect} from 'react';

import styled from 'styled-components';
import Chart from "react-apexcharts";
import ProgressBar from './ProgressBar';

const Container = styled.div`
  display: flex;
`;

const MetricContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChartContainer = styled.div`
  margin-left: 80px;
`;
const DataContainer = styled.div`
  display: flex;
  margin: 20px 0px 0px 120px;
`;

const Title = styled.span`
  margin-top: 5px;
  font-size: 22px;
  font-weight: 400;
`;

const MachineMetrics = ({machineName}) => {
  const [radialChart, setRadialChart] = useState(
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

  const [machineMetrics, setMachineMetrics] = useState({description: "default desc", content: []})

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
    <>
    {machineMetrics.content.map((metrics) => {
      return (
        <Container>
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
          <MetricContainer>
            <Title>
              Disk Usage:
            </Title>
            <DataContainer>
              <ProgressBar backgroundColor="#7587A9" completed={metrics.disk} />
            </DataContainer>
            <Title style={{marginTop: "30px"}}>
              Network Usage:
            </Title>
            <DataContainer>
              <ProgressBar backgroundColor="#7587A9" completed={metrics.network} />
            </DataContainer>
          </MetricContainer>
          <MetricContainer style={{marginLeft: "100px"}}>
            <Title >
              Top 5 Processes:
            </Title>
          </MetricContainer>
        </Container>
        
      );
    })}
    </>
  )
}

export default MachineMetrics
