import { Form, FloatingLabel } from 'react-bootstrap'
import Button from '../Button';

import '../../styles/concept.css';

const Commands = () => {
  return (
    <div className="commandTile">
      <Form>
          <Form.Select size="sm">
              <option>Select a machine from the list...</option>
            </Form.Select>
          <FloatingLabel controlId="floatingTextarea" label="">
              <Form.Control
                  as="textarea"
                  placeholder="Commands"
                  style={{ height: '350px', width: '700px', }}
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
    </div>
  )
}

export default Commands
