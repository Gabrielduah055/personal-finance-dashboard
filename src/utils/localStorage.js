const STORAGE_KEY = 'personal-finance-dashboard-transactions';

const isBrowser = typeof window !== 'undefined';

export function loadTransactionsFromStorage() {
  if (!isBrowser) {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((item) => {
      return (
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        typeof item.category === 'string' &&
        typeof item.type === 'string' &&
        typeof item.date === 'string' &&
        Number.isFinite(Number(item.amount))
      );
    });
  } catch (error) {
    console.error('Could not load transactions from localStorage.', error);
    return [];
  }
}

export function saveTransactionsToStorage(transactions) {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Could not save transactions to localStorage.', error);
  }
}
