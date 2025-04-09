/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import CountTodo from './CountTodo';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      editMode: false,
      editedTodo: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTodo = this.state.inputVal.trim();
    
    if (newTodo) {
      this.setState((state) => ({
        todos: state.todos.concat(newTodo),
        inputVal: '',
      }));
    }
  }

  deleteTodo(todoToDelete) {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo !== todoToDelete),
    }));
  }

  editTodo(todoToEdit) {
    this.setState((state) => ({
      ...state,
      inputVal: todoToEdit,
      editMode: true,
      editedTodo: todoToEdit
    }));
  }

  updateTodo() {
    const todoToUpdate = this.state.inputVal.trim();
    
    if (todoToUpdate) {
      const newTodos = this.state.todos.map((todo) => 
        todo === this.state.editedTodo ? todoToUpdate : todo
      )
      
      this.setState(() => ({
        todos: newTodos,
        inputVal: '',
        editMode: false,
        editedTodo: ''
      }));
    } else {
      this.setState(() => ({
        inputVal: '',
        editMode: false,
        editedTodo: ''
      }));
    }
  }

  render() {
    return (
      <section>
        <CountTodo todos={this.state.todos} />
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          {this.state.editMode ? (
            <button
              type="button"
              onClick={this.updateTodo}
            >
              Resubmit
            </button>
          ) : (
            <button type="submit">
              Submit
            </button>
          )}
        
        </form>
        <h4>All the tasks!</h4>
        <ul>
          { this.state.todos.map((todo) => (
            <li key={todo}>
              {todo}
              <button
                type="button"
                onClick={() => this.editTodo(todo)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => this.deleteTodo(todo)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
