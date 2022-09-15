import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/esm/FormControl';

export default function SearchBox() {
  const router = useNavigate();
  const [query, setQuesry] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    router(query ? `/search/?query=${query}` : `/search`);
  };
  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuesry(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search" />
        </Button>
      </InputGroup>
    </Form>
  );
}
