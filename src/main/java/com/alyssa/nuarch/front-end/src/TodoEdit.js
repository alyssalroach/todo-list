import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

const TodoEdit = () => {
  const initialFormState = {
    corpus: "",
  };
  const [todo, setTodo] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== "new") {
      fetch(`/todo/${id}`)
        .then((response) => response.json())
        .then((data) => setTodo(data));
    }
  }, [id, setTodo]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/todo${todo.id ? `/${todo.id}` : ""}`, {
      method: todo.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodo(initialFormState);
    navigate("/todos");
  };

  const title = <h2>{todo.id ? "Edit Todo" : "Add Todo"}</h2>;

  return (
    <div>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="todo">Todo</Label>
            <Input
              type="text"
              name="corpus"
              id="corpus"
              onChange={handleChange}
              autoComplete="corpus"
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
            <Button color="secondary" tag={Link} to="/todos">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default TodoEdit;
