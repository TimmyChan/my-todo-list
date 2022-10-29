import './App.css';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {BsFillTrashFill, BsFillPencilFill, BsSave2Fill} from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const TodoItem = ({todoObj, onChange, onDelete}) => {
  const [editing, setEditing] = useState(todoObj.editable);
  const [input, setInput] = useState(todoObj.text);
  const {text, completed} = todoObj;

  return (
    <li>
      <Row style={{textAlign: 'center'}}>
        <Col>
          {editing ? (
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          ) : (
            <>
              {completed ? (
                <s>
                  {
                    <h2
                      onClick={() => {
                        onChange({text: text, completed: !completed});
                      }}>
                      {text}
                    </h2>
                  }
                </s>
              ) : (
                <h2
                  onClick={() => {
                    onChange({text: text, completed: !completed});
                  }}>
                  {text}
                </h2>
              )}
            </>
          )}
        </Col>
        <Col style={{textAlign: 'center'}}>
          <Button
            variant="dark"
            onClick={() => {
              setEditing(!editing);
              setInput(todoObj.text);
              onChange({text: input, completed: completed});
            }}>
            {editing ? (
              <BsSave2Fill style={{color: 'green'}} />
            ) : (
              <BsFillPencilFill />
            )}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setEditing(false);
              onDelete();
            }}>
            <BsFillTrashFill />
          </Button>
        </Col>
        <p></p>
      </Row>
    </li>
  );
};
TodoItem.propTypes = {
  todoObj: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
