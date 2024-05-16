import React from 'react';
import '../styles/Expense.css';

function Expense({ expense, onDelete }) {
  const formattedDate = new Date(expense.created_at).toLocaleDateString(
    'en-UK'
  );
  return (
    <div className="expense-container">
      <p className="expense-title">{expense.title}</p>
      <p className="expense-cost">£{expense.cost}</p>
      <p className="expense-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(expense.id)}>
        Delete
      </button>
    </div>
  );
}

export default Expense;
