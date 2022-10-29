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
    <Row>
      <Col md={6}>
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
                  <span
                    onClick={() => {
                      onChange({text: text, completed: !completed});
                    }}>
                    {text}
                  </span>
                }
              </s>
            ) : (
              <span
                onClick={() => {
                  onChange({text: text, completed: !completed});
                }}>
                {text}
              </span>
            )}
          </>
        )}
      </Col>
      <Col md={3}>
        <Button
          variant="dark"
          onClick={() => {
            setEditing(!editing);
            setInput(todoObj.text);
            onChange({text: input, completed: completed});
          }}>
          {/* different color based on editing tag */}
          {editing ? <BsSave2Fill /> : <BsFillPencilFill />}
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
    </Row>
  );
};
TodoItem.propTypes = {
  todoObj: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
