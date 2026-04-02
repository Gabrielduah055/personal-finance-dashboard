export function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

export function createTransactionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getDefaultFormState() {
  return {
    title: '',
    amount: '',
    category: '',
    type: 'income',
    date: getTodayDate(),
  };
}

export function getDefaultFormErrors() {
  return {
    title: '',
    amount: '',
    category: '',
    type: '',
    date: '',
  };
}

export function getDefaultFilters() {
  return {
    search: '',
    type: 'all',
    category: 'all',
  };
}

export function normalizeTextInput(value) {
  return value.trim().replace(/\s+/g, ' ');
}

export function isValidTransactionType(type) {
  return type === 'income' || type === 'expense';
}

export function isValidDateString(dateString) {
  if (!dateString) {
    return false;
  }

  const date = new Date(dateString);

  return !Number.isNaN(date.getTime()) && dateString.length >= 10;
}

export function normalizeTransactionPayload(values) {
  const title = normalizeTextInput(values.title || '');
  const category = normalizeTextInput(values.category || '');
  const amount = Number(values.amount);
  const type = values.type;
  const date = values.date;

  if (
    !title ||
    !category ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !isValidTransactionType(type) ||
    !isValidDateString(date)
  ) {
    return null;
  }

  return {
    title,
    amount,
    category,
    type,
    date,
  };
}

export function validateTransactionForm(values) {
  const errors = getDefaultFormErrors();
  const cleanedValues = normalizeTransactionPayload(values);

  if (!normalizeTextInput(values.title || '')) {
    errors.title = 'Please enter a title.';
  }

  if (!Number.isFinite(Number(values.amount))) {
    errors.amount = 'Please enter a valid amount.';
  } else if (Number(values.amount) <= 0) {
    errors.amount = 'Amount must be greater than zero.';
  }

  if (!normalizeTextInput(values.category || '')) {
    errors.category = 'Please enter a category.';
  }

  if (!isValidTransactionType(values.type)) {
    errors.type = 'Please select a valid transaction type.';
  }

  if (!isValidDateString(values.date)) {
    errors.date = 'Please choose a valid date.';
  }

  return {
    isValid: Boolean(cleanedValues),
    errors,
    cleanedValues,
  };
}

export function sortTransactionsByDate(transactions) {
  return [...transactions].sort((firstTransaction, secondTransaction) => {
    return new Date(secondTransaction.date) - new Date(firstTransaction.date);
  });
}

export function getCategoryOptions(transactions) {
  return Array.from(
    new Set(
      transactions
        .map((transaction) => normalizeTextInput(transaction.category || ''))
        .filter(Boolean)
    )
  ).sort((firstCategory, secondCategory) =>
    firstCategory.localeCompare(secondCategory)
  );
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

export function formatDisplayDate(date) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  } catch (error) {
    return date;
  }
}
