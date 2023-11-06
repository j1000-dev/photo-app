import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
export function AlbumCard(props) {
  const {folder} = props
  return (
    <Card style={{ width: '18rem', backgroundColor: '#212529', color: '#ffffff' }}>
      <Card.Body>
        <Card.Title>{folder.name}</Card.Title>
          <Card.Text>All your {folder.name} images</Card.Text>
          <Link to={`/albums/${folder.name}`}>
            <Button className="my-2" variant="secondary">View your album</Button>
          </Link>
      </Card.Body>
    </Card>
  );
}