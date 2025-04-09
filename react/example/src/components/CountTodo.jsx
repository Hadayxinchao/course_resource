import { Component } from "react";

class CountTodo extends Component {
  constructor(props) {
    super(props);
  }

  countTodo() {
    return this.props.todos.length;
  }

  render() {
    return (
      <div>
        <h3>Count Todo</h3>
        <p>Total Todos: {this.countTodo()}</p>
      </div>
    );
  }
}

export default CountTodo;
