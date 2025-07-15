import React from 'react';
import { TodoProvider } from './context/TodoContext';
import Layout from './components/layout/Layout';
import TodoStats from './components/todo/TodoStats';
import TodoFilters from './components/todo/TodoFilters';
import TodoSearch from './components/todo/TodoSearch';
import TodoForm from './components/todo/TodoForm';
import TodoList from './components/todo/TodoList';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <Layout>
        <div className="max-w-4xl mx-auto">
          <TodoStats />
          <div className="glass-card p-6 mb-6">
            <TodoSearch />
            <TodoFilters />
            <TodoForm />
          </div>
          <TodoList />
        </div>
      </Layout>
    </TodoProvider>
  );
}

export default App;