function FilterSidebar(props) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={props.category}
          onChange={function (e) {
            props.onCategoryChange(e.target.value);
          }}
          className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50"
        >
          <option value="all">All Categories</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          value={props.sort}
          onChange={function (e) {
            props.onSortChange(e.target.value);
          }}
          className="w-full border border-gray-300 p-2 rounded-lg bg-gray-50"
        >
          <option value="default">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;
