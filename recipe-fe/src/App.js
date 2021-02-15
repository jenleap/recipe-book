import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './components/Home';
import FullRecipe from './components/FullRecipe';
import CreateRecipe from './components/CreateRecipe';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={ Home } exact />
          <Route path='/recipe/:id' component={ FullRecipe } />
          <Route path='/recipe/create' component={ CreateRecipe } />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
