import React from 'react';
import { useState, useEffect } from 'react';
import api from '../api';
import Expense from '../components/Expense';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [cost, setCost] = useState(0);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const [isAscending, setIsAscending] = useState(true);
  const [searchExpenses, setSearchExpenses] = useState([]);

  const [searchText, SetSearchText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = async () => {
    api
      .get('/api/expenses/')
      .then((res) => res.data)
      .then((data) => {
        setExpenses(data), setSearchExpenses(data);
        SetSearchText('');
      })
      .catch((err) => alert(err));
  };

  const deleteExpense = (id) => {
    api
      .delete(`/api/expenses/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert('expense deleted');
        else alert('failed to delete expense');
        getExpenses();
      })
      .catch((error) => alert(error));
  };

  const createExpense = (e) => {
    e.preventDefault();
    api
      .post('/api/expenses/', { title, cost, date })
      .then((res) => {
        if (res.status === 201) alert('expense created');
        else alert('failed to make expense');
        getExpenses();
      })
      .catch((err) => {
        alert(err), console.log('its over');
      });
  };

  const editExpense = (id, data) => {
    api
      .put(`/api/expenses/update/${id}/`, data)
      .then((res) => {
        if (res.status === 200) {
          // Status code for successful update is 200
          alert('Expense updated');
        } else {
          alert('Failed to update expense');
        }
        getExpenses();
      })
      .catch((err) => {
        alert('An error occurred: ' + err.response.data.detail);
        console.log('Error:', err);
      });
  };
  const sortExpenses = () => {
    const sourceExpenses =
      searchText.length > 0 ? [...searchExpenses] : [...expenses];
    const sortedExpenses = sourceExpenses.sort((a, b) =>
      isAscending ? a.cost - b.cost : b.cost - a.cost
    );
    searchText.length > 0
      ? setSearchExpenses(sortedExpenses)
      : setExpenses(sortedExpenses);
    setIsAscending(!isAscending);
  };

  const Search = (text) => {
    console.log('search', text);
    const terms = [...expenses];

    setSearchExpenses(
      terms.filter((expense) =>
        expense.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <div className="container">
      <div className="expenses-container">
        <div>
          <h2>Expenses</h2>
          <input
            className="Search"
            type="text"
            value={searchText}
            onChange={(e) => {
              Search(e.target.value), SetSearchText(e.target.value);
            }}
          />
          <button onClick={() => sortExpenses()}>
            sort {isAscending ? 'ascending' : 'descending'}
          </button>
        </div>

        <div className="expenses">
          {searchText.length > 0
            ? searchExpenses.map((expense) => (
                <Expense
                  expense={expense}
                  onDelete={deleteExpense}
                  key={expense.id}
                  onEdit={editExpense}
                />
              ))
            : expenses.map((expense) => (
                <Expense
                  expense={expense}
                  onDelete={deleteExpense}
                  key={expense.id}
                  onEdit={editExpense}
                />
              ))}
        </div>
      </div>
      <div className="left">
        <button onClick={() => navigate('/logout')}>logout</button>
        <form onSubmit={createExpense}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <label htmlFor="cost">Cost:</label>

          <input
            type="number"
            id="cost"
            required
            name="cost"
            onChange={(e) => setCost(e.target.value)}
            value={cost}
          />

          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Home;
