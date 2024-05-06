import logo from './logo.svg';
import './App.css';
import CreateCustomer from './CreateCustomer';
import InquiryCustomer from './InquiryCustomer';

function App() {
  return (
    <div className="App">
      <CreateCustomer />
      <hr />
      <InquiryCustomer />
    </div>
  );
}

export default App;
