import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <Jumbotron>
      <h1>Welcome to Escrow Management</h1>
      <p>
       Use this to manage your escrow with a simle mouse click.!!
      </p>
      <p>
        <Button variant="primary">Get Started</Button>
      </p>
    </Jumbotron>
  );
};

export default Home;