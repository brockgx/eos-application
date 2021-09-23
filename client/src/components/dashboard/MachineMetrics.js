import {useState} from 'react';

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
  font-weight: 300;
`;

const MachineMetrics = ({machine}) => {
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
            shadeIntensity: 0,
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

  return (
    <Container>
      <Label>
        CPU Usage:
      </Label>
      <MachineChart>
        <Chart
          options={radialChart.options}
          series={[machine.cpu]}
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
          series={[machine.ram]}
          type="radialBar"
          width="300"
        />
      </MachineChart>
    </Container>
  )
}

export default MachineMetrics
