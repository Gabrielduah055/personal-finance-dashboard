import TransactionItem from './TransactionItem';

function TransactionList({ transactions, onEditTransaction, onDeleteTransaction }) {
  return (
    <section>
      <div className="section-heading filter-heading">
        <div>
          <p className="eyebrow">Transactions</p>
          <h2>Recent activity</h2>
        </div>
      </div>

      <div className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEditTransaction={onEditTransaction}
            onDeleteTransaction={onDeleteTransaction}
          />
        ))}
      </div>
    </section>
  );
}

export default TransactionList;
