import logo from './logo.svg';
import Button from '../src/components/Button/Button'
import Input from '../src/components/Input/Input';
import './App.css';

function App() {
  return (
    <div className="App">
      <Button text="버튼에 들어갈 텍스트" />
      <Input labelText="이름"/>
    </div>
  );
}

export default App;
