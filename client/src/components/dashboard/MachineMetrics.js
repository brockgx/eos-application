import {useState, useEffect} from 'react';

import styled from 'styled-components';
import Chart from "react-apexcharts";

const Container = styled.div`
display: flex;
`;

const MachineChart = styled.span`
  padding-top: 10px;
`;

const Label = styled.span`
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
        colors: ["#56698A"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.2,
            opacityFrom: 0.7,
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
    const getMachines = async () => {
      const data = await fetchMachineMetrics()
      setMachineMetrics(data)
    }

    getMachines()
  }, [])

  // Fetch device data from DB
  const fetchMachineMetrics = async () => {
    const resp = await fetch('/dash/clientmachinemetrics')
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
      <Label>
        CPU Usage:
      </Label>
      <MachineChart>
        <Chart
          options={radialChart.options}
          series={[]}
          type="radialBar"
          width="300"
        />
      </MachineChart>
      <Label>
        RAM Usage:
      </Label>
      <MachineChart>
        <Chart
          options={radialChart.options}
          series={[]}
          type="radialBar"
          width="300"
        />
      </MachineChart>
    </Container>
  )
}

export default MachineMetrics
