import { useEffect, useMemo, useState } from 'react';
import {
  getDefaultFormErrors,
  getDefaultFormState,
  getTodayDate,
  validateTransactionForm,
} from '../utils/helpers';

function TransactionForm({
  initialValues,
  onSaveTransaction,
  onCancelEdit,
  isEditing,
  categoryOptions,
}) {
  const [formValues, setFormValues] = useState(initialValues || getDefaultFormState());
  const [formErrors, setFormErrors] = useState(getDefaultFormErrors());

  useEffect(() => {
    setFormValues(initialValues || getDefaultFormState());
    setFormErrors(getDefaultFormErrors());
  }, [initialValues]);

  const combinedCategories = useMemo(() => {
    const defaults = ['Salary', 'Freelance', 'Food', 'Transport', 'Shopping', 'Bills'];
    return Array.from(new Set([...defaults, ...categoryOptions]));
  }, [categoryOptions]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validation = validateTransactionForm(formValues);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    onSaveTransaction(validation.cleanedValues);
    setFormErrors(getDefaultFormErrors());

    if (!isEditing) {
      setFormValues(getDefaultFormState());
    }
  };

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Transaction Form</p>
          <h2>{isEditing ? 'Update transaction' : 'Add a new transaction'}</h2>
        </div>
      </div>

      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group full-width">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
            placeholder="e.g. Client payment"
          />
          {formErrors.title && <span className="field-error">{formErrors.title}</span>}
        </div>

        <div className="field-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            value={formValues.amount}
            onChange={handleChange}
            placeholder="0.00"
          />
          {formErrors.amount && <span className="field-error">{formErrors.amount}</span>}
        </div>

        <div className="field-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            max={getTodayDate()}
            value={formValues.date}
            onChange={handleChange}
          />
          {formErrors.date && <span className="field-error">{formErrors.date}</span>}
        </div>

        <div className="field-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            list="category-suggestions"
            value={formValues.category}
            onChange={handleChange}
            placeholder="e.g. Food"
          />
          <datalist id="category-suggestions">
            {combinedCategories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          {formErrors.category && (
            <span className="field-error">{formErrors.category}</span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={formValues.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {formErrors.type && <span className="field-error">{formErrors.type}</span>}
        </div>

        <div className="form-actions full-width">
          <button type="submit" className="primary-button">
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>

          {isEditing && (
            <button type="button" className="secondary-button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TransactionForm;
