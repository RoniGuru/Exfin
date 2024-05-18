import React from 'react';
import '../styles/Expense.css';
import { useState } from 'react';

function Expense({ expense, onDelete, onEdit }) {
  const [title, setTitle] = useState(expense.title);
  const [cost, setCost] = useState(expense.cost);
  const [date, setDate] = useState(expense.date);

  const formattedDate = new Date(expense.date).toLocaleDateString('en-UK');
  return (
    <div className="expense-container">
      <div>
        <input
          className="expenseInput"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          £
          <input
            className="expenseInput"
            value={cost}
            type="number"
            onChange={(e) => setCost(e.target.value)}
          />
          <input
            className="expenseInput"
            value={new Date(date).toISOString().split('T')[0]}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="expense-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
        <button
          onClick={() =>
            onEdit(expense.id, { title: title, cost: cost, date: date })
          }
        >
          Update
        </button>
        <button
          onClick={() => {
            setCost(expense.cost),
              setTitle(expense.title),
              setDate(expense.date);
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}

export default Expense;
