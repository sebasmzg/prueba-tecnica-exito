import React from 'react';

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  resultsCount: number;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  resultsCount
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '300px',
          fontSize: '16px'
        }}
      />
      {searchTerm && (
        <button
          onClick={onClearSearch}
          style={{
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#f5f5f5',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      )}
      <span style={{ color: '#666', fontSize: '14px' }}>
        {resultsCount} product(s) finded
      </span>
    </div>
  );
};