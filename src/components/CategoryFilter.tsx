import React from 'react';

const categories = [
  'Workspaces',
  'Platforms',
  'Plugins',
  'Skills',
  'Agents',
];

const CategoryFilter = ({ onCategorySelect }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button key={category} onClick={() => onCategorySelect(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
