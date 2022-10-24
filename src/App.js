import './App.css';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

/*
should have the ability to:
- add tasks to the to-do list
- tasks added to the list should be check-offable
- tasks should be deletable
general design hint/suggestions:
you should have at least 2-3 components,
without accounting for styling up buttons and the like
1. a list container
2. a list element
side comment: part 2 can be two components if you so choose,
it can either be one component with a toggleable editing mode,
or you can have a separate editing component and a separate component
for displaying the list. IMO there are good reasons for either approach,
i would not decompose this much further. (with the exception of styling
  other components to use inside these, for the most part these styling
  components should be pretty dumb and just focused on aesthetic)
general guidelines:
- do not use class components
- use functional components
- you will want to store the to-do list entries with a react hook.
  you will also use hooks for pretty much all state, whether or not
  something is toggleable, whether or not its completed, etc.
- if you want to persist the elements being stored between page visits,
  you can store the elements in the browser storage.
- there should not be any backend code other than the scripts that start
  up the server, these should be included by default with the create react
  app scaffolding
why not class components?
- class components are more work for the same reward.
- they are outdated and not part of the modern react workflow
- they can have problematic interactions with the react component lifecycle.
  having to learn about the react component lifecycle to the degree that class
  components require is a pretty major detour from PRODUCTIVITY
- they introduce state which is not referentially transparent
*/

/* req 10/21:
==Aesthetics==
  buttons line up veritcally
  icons for buttons
  text: click to strike thru instead of button (+)
  input box can be prettier
  center layout + make less wide
  pizzazz
==Code==
  refactor top level todo list component (+)
  store list in browser memory, only use hard coded when it's not present.
  (find a lib)
*/

const HARDCODED_LIST = [
  {
    text: 'stay quitted',
    completed: false,
  },
  {
    text: 'walk',
    completed: true,
  },
  {
    text: 'walk',
    completed: true,
  },
  {
    text: 'walk',
    completed: true,
  },
  {
    text: 'walk',
    completed: true,
  },
  {
    text: 'don\'t die',
    completed: false,
  },
];

const TodoItem = ({todoObj, onChange, onDelete}) => {
  const [editing, setEditing] = useState(todoObj.editable);
  const [input, setInput] = useState(todoObj.text);
  const {text, completed} = todoObj;

  return (
    <Row>
      <Col md={3}>
        <button
          onClick={() => {
            setEditing(!editing);
            setInput(todoObj.text);
            onChange({text: input, completed: completed});
          }}>
          {editing ? 'Finish Edit' : 'Begin Edit'}
        </button>
      </Col>
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
        <button
          onClick={() => {
            setEditing(false);
            onDelete();
          }}>
          Delete
        </button>
      </Col>
    </Row>
  );
};
TodoItem.propTypes = {
  todoObj: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const AddTask = ({addfcn}) => {
  return <button onClick={addfcn}>Add task</button>;
};
AddTask.propTypes = {
  addfcn: PropTypes.func.isRequired,
};

const TodoList = ({inputList, listTitle}) => {
  // state todo which is a list of objects [{text: string, completed: bool}]
  // paramatize this list
  const [todo, setTodo] = useState(inputList);

  // produces delete function for a given xIndex
  const getDeletionFunction = (xIndex) => () => {
    const newTodo = todo.filter((y, yIndex) => yIndex !== xIndex);
    setTodo(newTodo);
  };

  // produces mutation function for a given xIndex, replace with todoitem
  const getTodoMutator = (xIndex) => (todoItem) => {
    const newTodo = Array.from(todo);
    newTodo[xIndex] = todoItem;
    setTodo(newTodo);
  };

  return (
    <div
      className="TodoList"
      style={{width: 800, backgroundColor: 'rgba(255, 0, 0, 0.1)'}}>
      <h1> {listTitle} </h1>
      <Container fluid>
        {todo.map((todoItem, xIndex) => (
          <TodoItem
            todoObj={todoItem}
            onChange={getTodoMutator(xIndex)}
            onDelete={getDeletionFunction(xIndex)}
            key={xIndex}
          />
        ))}
        <Row>
          <Col>
            <AddTask
              addfcn={() => {
                const placeHolderTask = {
                  text: 'New Task',
                  completed: false,
                  editable: true,
                };
                const newTaskList = todo.concat([placeHolderTask]);
                setTodo(newTaskList);
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
TodoList.propTypes = {
  inputList: PropTypes.array.isRequired,
  listTitle: PropTypes.string.isRequired,
};

function App() {
  return <TodoList inputList={HARDCODED_LIST} listTitle={'Hardcoded List'} />;
}

export default App;
