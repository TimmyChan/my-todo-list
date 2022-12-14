import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  buttons line up veritcally (+)
  icons for buttons (+)
  text: click to strike thru instead of button (+)
  input box can be prettier
  center layout (+)
  make less wide (+)
  pizzazz
==Code==
  refactor top level todo list component (+)
  store list in browser memory, only use hard coded when it's not present.
  (find a lib)

req 10/24:
  do not use pixels for sizing, use relative units instead (+)
==Aesthetics==
  more vertical space between buttons (+)
  center list within its container (+)
  center containers (+)
  bring back bullet points (+)
  pen button change to save button (and change color)
  break file into 3 separate files. (Todolist, TodoItem, App) (+)
  tooltips to buttons (+)
  Text > buttons:
    different color for buttons (+)
    make text pop more (+)
==Code==
  refactor, inline AddItem (+)
  store list in browser memory, (+)

11/14 Goals:
==Code==
  List of TodoLists (+)
    use context to deal with this
  Button to add a Todolist
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
    text: 'don\'t die',
    completed: false,
  },
];

const HARDCODED_LIST_LIST = [
  {list: HARDCODED_LIST, title: 'Todo List'},
  {list: HARDCODED_LIST, title: 'Todo List'},
  {list: HARDCODED_LIST, title: 'Todo List'},
];

const TodoListList = ({initialListOfLists}) => {
  // source:
  // https://stackoverflow.com/questions/31352141/how-do-you-split-an-array-into-array-pairs-in-javascript
  const pairedList = initialListOfLists.reduce(
      function(result, value, index, array) {
        if (index % 2 === 0) {
          result.push(array.slice(index, index + 2));
        }
        return result;
      }, []);

  console.log(`pairedList: ${pairedList}`);
  return (
    <Container>
      {
        pairedList.map((listPair, listIndex) =>
          (

            <Row key={listIndex}>
              <Col>
                <TodoList
                  inputList={listPair[0].list}
                  listTitle={listPair[0].title} />
              </Col>
              {(listPair.length > 1 ?
                <Col>
                  <TodoList
                    inputList={listPair[1].list}
                    listTitle={listPair[1].title} />
                </Col> : <Col></Col>)
              }
              <p />
            </Row>
          ))
      }
    </Container>
  );
};
TodoListList.propTypes = {
  initialListOfLists: PropTypes.array.isRequired,
};


function App() {
  // const saved = JSON.parse(localStorage.getItem('todo'));
  // const initial = saved !== null ? saved : HARDCODED_LIST;
  return (
    <TodoListList initialListOfLists={HARDCODED_LIST_LIST} />
  );
}

export default App;
