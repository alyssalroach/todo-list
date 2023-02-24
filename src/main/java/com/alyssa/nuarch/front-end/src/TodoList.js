import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const remove = async (id) => {
    await fetch(`/todo/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedTodos = [...todos].filter((i) => i.id !== id);
      setTodos(updatedTodos);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const todoList = todos.map((todo) => {
    return (
      <tr key={todo.id}>
        <td style={{ whiteSpace: "nowrap" }}>{todo.corpus}</td>
        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="primary"
              tag={Link}
              to={"/todo/" + todo.id}
            >
              Edit
            </Button>
            <Button size="sm" color="danger" onClick={() => remove(todo.id)}>
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/todo/new">
            Add Todo
          </Button>
        </div>
        <h3>My Todo List</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="70%">Todo</th>
              <th width="30%">Actions</th>
            </tr>
          </thead>
          <tbody>{todoList}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default TodoList;
