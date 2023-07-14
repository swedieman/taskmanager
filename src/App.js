import TaskManager from './components/TaskManager.js';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const App = () => (
  <div className="pageContainer">
    <header>
      <h1>Task Manger</h1>
    </header>
    {/* TODO: center main on page */}
    <main className="main" id="main">
      <TaskManager />
    </main>
    <footer>
      <p>Managing tasks like never before...</p>
    </footer>
  </div>
);

export default App;
