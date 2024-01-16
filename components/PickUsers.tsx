'use client'
import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import Chip from './Chip';
import { Item } from '../data/UsersData';

interface AutocompleteChipInputProps {
  items: Item[];
}

const PickUser: React.FC<AutocompleteChipInputProps> = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showList, setShowList] = useState(false)
  const inputRef = useRef(null);

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  }, [showList]);


  const suggestionListRef = useRef<HTMLUListElement | null>(null);

  const filteredItems = filter
    ? items.filter(
      (item) =>
        item.username.toLowerCase().includes(filter.toLowerCase()) &&
        !selectedItems.includes(item)
    )
    : items.filter((item) => !selectedItems.includes(item));

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setHighlightedIndex(null);
  };

  const selectItem = (item: Item) => {
    setSelectedItems([...selectedItems, item]);
    setFilter('');
    setHighlightedIndex(null);
  };

  const removeChip = (item: Item) => {
    setSelectedItems(selectedItems.filter((si) => si.id !== item.id));
    setHighlightedIndex(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && filter === '') {
      if (selectedItems.length > 0) {
        const lastSelected = selectedItems[selectedItems.length - 1];
        removeChip(lastSelected);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (highlightedIndex === null || highlightedIndex === filteredItems.length - 1) {
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex + 1));
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (highlightedIndex === null || highlightedIndex === 0) {
        setHighlightedIndex(filteredItems.length - 1);
      } else {
        setHighlightedIndex((prevIndex) => (prevIndex === null ? filteredItems.length - 1 : prevIndex - 1));
      }
    } else if (event.key === 'Enter' && highlightedIndex !== null) {
      selectItem(filteredItems[highlightedIndex]);
    }
  };


  const handleItemClick = (item: Item) => {
    selectItem(item);
  };

  const handleItemMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  useEffect(() => {
    if (highlightedIndex !== null && suggestionListRef.current && suggestionListRef.current.children.length > 0) {
      const itemElement = suggestionListRef.current.children[highlightedIndex] as HTMLElement;
      if (itemElement) {
        itemElement.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 p-2 bg-white border-b-2 border-gray-200 w-full">
        {selectedItems.map((item, idx) => (
          <Chip key={idx} label={item.username} img={item.profilePic} onRemove={() => removeChip(item)} />
        ))}
        <input
          type="text"
          value={filter}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          onClick={() => setShowList(true)}
          className="outline-none text-gray-600 bg-white px-4 w-full flex-1"
          placeholder="Search users..."
        />
      </div>
      {showList &&
        <ul
          ref={suggestionListRef}
          className="list-none my-2 max-h-64 overflow-auto bg-slate-500 rounded-lg"
        >
          {filteredItems.length === 0 ? (
            <li className="text-white p-3">No more users!</li>
          ) : (
            filteredItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => handleItemMouseEnter(index)}
                className={`cursor-pointer  ${index === highlightedIndex
                  ? 'bg-cyan-600'
                  : 'bg-gray-50'
                  } p-0 md:p-3 flex items-center gap-4 trasnsition-all duration-300`}
              >
                <img
                  src={item.profilePic}
                  alt={item.username}
                  className="w-10 h-10 rounded-full p-1 border"
                />
                <div className={`${index === highlightedIndex ? " text-white" : "text-gray-600"} flex flex-col`}>
                  <span className="text-xs md:text-sm font-normal md:font-semibold pr-2">{item.username}</span>
                  <span className="text-xs md:text-sm pr-2">{item.email}</span>
                </div>
              </li>
            ))
          )}
        </ul>}
    </div>
  );
};

export default PickUser;
