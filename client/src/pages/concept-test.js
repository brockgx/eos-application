import React from 'react';

import { useState, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap'
import Button from '../components/Button';
import '../styles/concept.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//Concept Page view/component
const Concept = () => {
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
      const resp = await fetch('/testget')
      const data = await resp.json()
      if(resp.ok) {
        //console.log(data.content[4].message)
        return data;
      } else {
        throw Error(`Request rejected with status ${resp.status}`);
      }
    }

    //Get Method
    const apiGet = () => {
        fetch("/api")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
        });
    };

    // Columns for device grid
    const columns = [
        { 
            field: "machine-name",
            headerName: "Machine",
            width: 140,
        },
        { 
            field: "collection-time",
            headerName: "Time", 
            width: 120, 
        },
        { 
            field: "app_metrics",
            headerName: "Application", 
            width: 140, 
        },
        { 
            field: "cpu_usage",
            headerName: "CPU", 
            width: 100, 
        },
        { 
            field: "ram_usage",
            headerName: "RAM", 
            width: 100, 
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
                        rows={messages}
                        disableColumnMenu
                        disableSelectionOnClick
                        pageSize={5}
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
                                rowsPerPageOptions="[5,10,15]"
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