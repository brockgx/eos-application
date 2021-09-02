import  {useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';

import Machines from '../components/concept/Machines';
import Commands from '../components/concept/Commands';

import '../styles/concept.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

//Concept Page view/component
const Concept = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }
    return (
        <div className="concept">
            <Container fluid="md">
            <Row className="titleContainer">
                <h1 className="title">Concept Page</h1>
            </Row>
            <Row className="tile">
                <Tabs  value={selectedTab} onChange={handleChange} >
                    <Tab label=" Connected Machines" />

                    <Tab label="Execute Commands" />
                </Tabs>
                {selectedTab === 0 && <Machines/>}
                {selectedTab === 1 && <Commands />}
            </Row>
        </Container>

        </div>
    )
}

export { Concept }