import {useState, useEffect} from 'react'

import styled from 'styled-components';
import MetricsTable from '../components/query/MetricsTable';

import { ColumnData } from '../components/query/ColumnData'

const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

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

// const Text = styled.span`
//   font-weight: 400;
//   font-size: 22px;
//   padding-bottom: 10px;
// `;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  justify-content: space-between;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Query = () => {
  const [sysMetrics, setMetrics] = useState({description: "default desc", content: []})
  
  // Get sys metrics from API call
  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchMetrics()
      setMetrics(data)
    }
    getMetrics()
  }, [])

  // Fetch data from DB
  const fetchMetrics = async () => {
    const resp = await fetch('/query/clientmachinemetrics')
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
          <MetricsTable data={sysMetrics.content}  />
        </Bottom>
      </Wrapper>
    </Container>
  )
}

export { Query }