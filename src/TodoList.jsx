import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import TodoItem from './TodoItem.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoList = ({inputList, listTitle}) => {
  // state todo which is a list of objects [{text: string, completed: bool}]
  // paramatize this list
  const [todo, setTodo] = useState(inputList);

  // produces delete function for a given xIndex
  const getDeletionFunction = (xIndex) => {
    // console.log(`Deletion Function ${xIndex} generated`);
    return () => {
      const newTodo = todo.filter((y, yIndex) => yIndex !== xIndex);
      setTodo(newTodo);
      localStorage.setItem('todo', JSON.stringify(newTodo));
    };
  };

  // produces mutation function for a given xIndex, replace with todoitem
  const getTodoMutator = (xIndex) => {
    // console.log(`Mutator Function ${xIndex} generated`);
    return (todoItem) => {
      const newTodo = Array.from(todo);
      newTodo[xIndex] = todoItem;
      setTodo(newTodo);
      localStorage.setItem('todo', JSON.stringify(newTodo));
    };
  };

  return (
    <div
      className="TodoList"
      style={{
        backgroundColor: 'rgba(208, 244, 234)',
      }}>
      <h1 style={{textAlign: 'center'}}> {listTitle} </h1>
      <Container>
        <ul>
          {todo.map((todoItem, xIndex) => (
            <TodoItem
              todoObj={todoItem}
              onChange={getTodoMutator(xIndex)}
              onDelete={getDeletionFunction(xIndex)}
              key={xIndex}
            />
          ))}
        </ul>
        <Row>
          <Col style={{textAlign: 'center'}}>
            <Button
              onClick={() => {
                const placeHolderTask = {
                  text: 'New Task',
                  completed: false,
                  editable: true,
                };
                const newTaskList = todo.concat([placeHolderTask]);
                setTodo(newTaskList);
                localStorage.setItem('todo', JSON.stringify(newTaskList));
              }}>
              Add task
            </Button>
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

export default TodoList;
