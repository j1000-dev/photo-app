import { useState } from "react";
import {Form, Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export function SearchForm(props) {
  const navigate = useNavigate();
  const [tag, setTag] = useState("");

  return (
    <Form className="container">
      <div className="row">
        <div className="col-md-10">
          <Form.Group className="mb-3" controlId="tg">
            <Form.Control 
              type="text" 
              placeholder="Search by tag" 
              onChange={(e) => setTag(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-md-2">
          <Button variant="secondary" onClick={(e) => {
            e.preventDefault()
            navigate(`/gallery?search=${encodeURIComponent(tag)}`);
          }}>
            Search
          </Button>
        </div>
      </div>
    </Form>
  )
}