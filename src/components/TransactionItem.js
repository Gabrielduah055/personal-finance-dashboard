import { formatCurrency, formatDisplayDate } from '../utils/helpers';

function TransactionItem({ transaction, onEditTransaction, onDeleteTransaction }) {
  return (
    <article className="transaction-card">
      <div className="transaction-main">
        <div>
          <div className="transaction-top-row">
            <h3>{transaction.title}</h3>
            <span className={`transaction-pill ${transaction.type}`}>
              {transaction.type}
            </span>
          </div>

          <div className="transaction-meta">
            <span>{transaction.category}</span>
            <span>{formatDisplayDate(transaction.date)}</span>
          </div>
        </div>

        <p className={`transaction-amount ${transaction.type}`}>
          {transaction.type === 'expense' ? '-' : '+'}
          {formatCurrency(transaction.amount)}
        </p>
      </div>

      <div className="transaction-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => onEditTransaction(transaction)}
        >
          Edit
        </button>
        <button
          type="button"
          className="danger-button"
          onClick={() => onDeleteTransaction(transaction.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TransactionItem;
