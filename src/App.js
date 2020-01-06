import React from 'react';
import TodoList from './containers/TodoList'
import './App.css';

function App() {
  return (
    <div className="app-container" data-test='container'>
      <TodoList />
    </div>
  );
}

export default App;
