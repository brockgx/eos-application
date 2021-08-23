import React from 'react';

import { useState, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap'
import Button from '../components/Button';
import '../styles/concept.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//Concept Page view/component
const Concept = (props) => {
     const [devices, setDevices] = useState([])
  
    // useEffect(() => {
    //   const getDevices = async () => {
    //     const devicesFromServer = await fetchDevices()
    //     setDevices(devicesFromServer)
    //   }
  
    //   getDevices()
    // }, [])
  
    // // Fetch device data from DB
    // const fetchDevices = async () => {
    //   const res = await fetch('sqlite:/path/to/devices')
    //   const data = await res.json()
  
    //   return data
    // }

    // Columns for device grid
    const columns = [
        { 
            field: "id",
            headerName: "ID",
            width: 80,
        },
        { 
            field: "msg",
            headerName: "Message", 
            width: 280, 
            sortable: false,
        }
    ]

    return (
        <Container fluid="md">
            <Row className="titleContainer">
                <h1 className="title">Concept Page</h1>
            </Row>
            <Row>
                <Col className="machinesTile">
                    <h2 className="containerTitle">Connected Machines</h2>
                    <DataGrid
                        className="deviceList"
                        rows={devices}
                        pageSize={5}
                        disableColumnMenu
                        columns={columns}
                    />
                </Col>
                <Col className="commandTile">
                        <h2 className="containerTitle">Execute Commands</h2>
                    <Form>
                        <FloatingLabel label="Connected Machines">
                            <Form.Select size="sm">
                                <option>Select a machine from the list...</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea" label="Type Commands...">
                            <Form.Control
                                as="textarea"
                                placeholder="Commands"
                                style={{ height: '200px', }}
                            />
                        </FloatingLabel>
                        <div className="btnExecute">
                            <Button
                                className="btnExecute"
                                bColor={'teal'}
                                textColor={'white'}
                                text={'Execute'}
                                onClick={() => {}}
                            />
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export { Concept }