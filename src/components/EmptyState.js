function EmptyState({ hasTransactions }) {
  return (
    <section className="empty-state glass-card-inner">
      <div className="empty-illustration">◎</div>
      <h3>{hasTransactions ? 'No matching transactions' : 'No transactions yet'}</h3>
      <p>
        {hasTransactions
          ? 'Try adjusting your search or filter settings to see more results.'
          : 'Add your first income or expense to start tracking your finances.'}
      </p>
    </section>
  );
}

export default EmptyState;
