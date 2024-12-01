import React from 'react';
import { useRouter } from 'next/navigation';
import useSearchBar from '@/hooks/useSearchBar';
import { legalities } from '@/types/legalities'; // Import legalities

type SearchBarProps = {
  handleSearch: (params: URLSearchParams) => void;
};

const colorMap = {
  White: 'W',
  Blue: 'U',
  Black: 'B',
  Red: 'R',
  Green: 'G',
};

const colors = Object.keys(colorMap);

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const { state, setColor, setName, setType, setFormat, setActiveFilters, removeFilter, resetFilters } = useSearchBar();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (state.color) {
      params.set('color', state.color);
    } else {
      params.delete('color');
    }
    if (state.name) {
      params.set('name', state.name);
    } else {
      params.delete('name');
    }
    if (state.type) {
      params.set('type', state.type);
    } else {
      params.delete('type');
    }
    Object.entries(state.legalities).forEach(([format, value]) => {
      if (value === 'legal') {
        params.set(`legalities.${format}`, value);
      } else {
        params.delete(`legalities.${format}`);
      }
    });

    // Add active filters to the URL parameters
    Object.entries(state.activeFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${window.location.pathname}?${params.toString()}`);
    handleSearch(params);
  };

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (value) {
        newFilters[key] = value; // Set the filter if there's a value
      } else {
        delete newFilters[key]; // Remove the filter if value is empty
      }
      return newFilters;
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColor = e.target.value;
    const colorValue = colorMap[selectedColor];
    const newColor = state.color ? `${state.color},${colorValue}` : colorValue;
    setColor(newColor);
    handleFilterChange('color', newColor);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFormat = e.target.value;
    setFormat(selectedFormat, 'legal');
    handleFilterChange(`legalities.${selectedFormat}`, 'legal'); // Update filter key to 'legalities'
  };

  const handleFilterClick = (key: string) => {
    removeFilter(key);

    // Reset the corresponding input state
    if (key === 'color') setColor('');
    if (key === 'name') setName('');
    if (key === 'type') setType('');
    if (key.startsWith('legalities.')) {
      const format = key.split('.')[1];
      setFormat(format, '');
    }

    // Update the search after removing the filter
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    router.push(`${window.location.pathname}?${params.toString()}`);
    handleSearch(params);
  };

  const handleResetFilters = () => {
    resetFilters();
    setColor('');
    setName('');
    setType('');
    Object.keys(state.legalities).forEach((format) => setFormat(format, ''));
    const params = new URLSearchParams();
    router.push(`${window.location.pathname}`);
    handleSearch(params);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={state.name}
            onChange={(e) => {
              setName(e.target.value);
              handleFilterChange('name', e.target.value);
            }}
            placeholder="Search cards..."
            className="p-2 border bg-black border-gray-300 rounded-l"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-r">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value=""
            onChange={handleColorChange}
            className="p-2 border bg-black border-gray-300 rounded"
          >
            <option value="">Select color</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={state.type}
            onChange={(e) => {
              setType(e.target.value);
              handleFilterChange('type', e.target.value);
            }}
            placeholder="Type"
            className="p-2 border bg-black border-gray-300 rounded"
          />
          <select
            value=""
            onChange={handleFormatChange}
            className="p-2 border bg-black border-gray-300 rounded"
          >
            <option value="">Select format</option>
            {legalities.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="flex flex-wrap space-x-2">
        {Object.entries(state.activeFilters).map(([key, value]) => (
          <span
            key={key}
            className="p-2 bg-black text-white rounded cursor-pointer"
            onClick={() => handleFilterClick(key)}
          >
            {key}: {value} &times;
          </span>
        ))}
      </div>
      <button onClick={handleResetFilters} className="mt-4 p-2 bg-red-500 text-white rounded">
        Reset Filters
      </button>
    </div>
  );
};

export default SearchBar;