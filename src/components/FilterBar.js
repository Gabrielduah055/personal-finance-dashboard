function FilterBar({ filters, categoryOptions, onFilterChange }) {
  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    onFilterChange((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      type: 'all',
      category: 'all',
    });
  };

  return (
    <section className="filter-bar">
      <div className="section-heading filter-heading">
        <div>
          <p className="eyebrow">Filter & Search</p>
          <h2>Find a transaction fast</h2>
        </div>
        <button type="button" className="secondary-button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="filter-grid">
        <div className="field-group">
          <label htmlFor="search">Search by title</label>
          <input
            id="search"
            name="search"
            type="text"
            value={filters.search}
            onChange={handleFieldChange}
            placeholder="Search transactions"
          />
        </div>

        <div className="field-group">
          <label htmlFor="filter-type">Type</label>
          <select
            id="filter-type"
            name="type"
            value={filters.type}
            onChange={handleFieldChange}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            name="category"
            value={filters.category}
            onChange={handleFieldChange}
          >
            <option value="all">All categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
