import {useState} from 'react';
import { Modal, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 26px;
  padding: 30px 0px 0px 20px;
`;

const FormContainer = styled.div`
  width: 600px;
  height 650px;
  background-color: #F3F4F7;
  border-radius: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right 0;
  margin auto;
`;

const Form = styled.form`
  display: flex;
  justifu-content: space-between;
  flex-direction: column;
  padding: 20px;
`;

const FormInputs = styled.div`
  margin-bottom: 20px;
`;

const FormItem = styled.div`
  margin-bottom: 20px;
`;

const FormButtons = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;


const Button = styled.button`
  padding: 10px;
  margin-right: ${(props) => props.marginRight};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: filled;
  border-radius: 5px;
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.hoverColor};
    background-color: ${(props) => props.hoverColor};
  }
`;

const defaultValues = {
  name: "",
  os: "",
  address: "",
  status: "0",
};

const AddMachine = ({userInput}) => {
  const [open, setOpen] = useState(false);

  const [newMachine, setNewMachine] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMachine({
      ...newMachine,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/dash/clientmachines', {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(newMachine)
    }).then(() => {
      setOpen(false)
      window.location.reload();
    })
  };

  return (
    <Container>
      <Button
        marginRight="0"
        borderColor="#3e885b"
        backgroundColor="#3e885b"
        textColor="#f8f7ff"
        fontWeight="500"
        fontSize="18px"
        hoverColor="#4DA871"
        onClick={()=>setOpen(true)}
        >
        Add New Machine
      </Button>
      <Modal open={open}>
        <FormContainer>
          <Text>
            Add New Machine
          </Text>
          <Form onSubmit={handleSubmit}>
            <FormInputs>
              <FormItem>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Machine Name"
                  type="text"
                  value={newMachine.name}
                  onChange={handleInputChange}
                  style={{width: "100%"}}
                />
              </FormItem>
              <FormItem>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="IP Address"
                  type="text"
                  value={newMachine.address}
                  onChange={handleInputChange}
                  style={{width: "100%"}}
                />
              </FormItem>
              <FormItem>
                <FormControl style={{width: "100%"}}>
                  <InputLabel>Operating System</InputLabel>
                  <Select
                    name="os"
                    value={newMachine.os}
                    onChange={handleInputChange}
                  >
                    <MenuItem key="windows" value="windows">
                      Windows
                    </MenuItem>
                    <MenuItem key="linux" value="linux">
                      Linux
                    </MenuItem>
                  </Select>
                </FormControl>
              </FormItem>
            </FormInputs>
            <FormButtons>
              <Button
                type="submit"
                marginRight="5px"
                borderColor="#3e885b"
                backgroundColor="#3e885b"
                textColor="#f8f7ff"
                fontWeight="400"
                fontSize="18px"
                hoverColor="#4DA871"
                >
                Add Machine
              </Button>
              <Button
                borderColor="#A53C27"
                backgroundColor="#A53C27"
                textColor="#f8f7ff"
                fontWeight="400"
                fontSize="18px"
                hoverColor="#B6422B"
                onClick={()=>setOpen(false)}
                >
                Cancel
              </Button>
            </FormButtons>
          </Form>
      </FormContainer>           
      </Modal>
    </Container>
  )
}

export default AddMachine
