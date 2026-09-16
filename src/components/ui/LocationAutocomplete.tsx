import React, { useState, useEffect, useRef, useMemo, KeyboardEvent } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { CITIES, LocationData } from '@/data/locations';
import { Input } from './input';

export interface LocationResult {
  id: string;
  city: string;
  stateOrRegion?: string;
  country: string;
  countryCode?: string;
  formattedAddress: string;
  latitude?: number;
  longitude?: number;
}

interface LocationAutocompleteProps {
  value: LocationResult | null;
  onSelect: (location: LocationResult | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function LocationAutocomplete({
  value,
  onSelect,
  placeholder = "Start typing a city or country",
  disabled = false
}: LocationAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync input value when selected value changes externally
  useEffect(() => {
    if (value) {
      setInputValue(value.formattedAddress);
    } else {
      setInputValue('');
    }
  }, [value]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Don't clear selected location just because it closes, as requested
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchLocal = (query: string): LocationResult[] => {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return [];

    const scored = CITIES.map(c => {
      let score = 0;
      const city = c.city.toLowerCase();
      const country = c.country.toLowerCase();

      if (city === q) score = 100;
      else if (city.startsWith(q)) score = 80;
      else if (city.includes(q)) score = 60;
      else if (country.startsWith(q)) score = 40;
      else if (country.includes(q)) score = 20;

      return { ...c, score };
    }).filter(c => c.score > 0);

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 10).map(c => ({
      id: c.id,
      city: c.city,
      country: c.country,
      formattedAddress: `${c.city}, ${c.country}`
    }));
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      const q = inputValue.trim();
      
      // If the input matches the currently selected location's formatted address exactly,
      // it means the user just selected it, or hasn't changed it.
      if (value && q === value.formattedAddress) {
        setSuggestions([]);
        return;
      }

      if (q.length >= 2) {
        setIsLoading(true);
        // Simulate async local/external search
        const results = searchLocal(q);
        setSuggestions(results);
        setIsOpen(true);
        setHighlightedIndex(-1);
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    
    // Clear selected value if the user types something different
    if (value && newVal !== value.formattedAddress) {
      onSelect(null);
    }
  };

  const handleSelect = (location: LocationResult) => {
    setInputValue(location.formattedAddress);
    onSelect(location);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="bg-white border-gray-200 h-12 rounded-xl text-gray-900 font-sans focus-visible:ring-blue-600 pl-10"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )}
      </div>

      {isOpen && inputValue.trim().length >= 2 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
          {suggestions.length > 0 ? (
            <ul role="listbox">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  className={`px-4 py-3 cursor-pointer flex items-center gap-3 ${
                    index === highlightedIndex ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelect(suggestion)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-sm truncate">{suggestion.city}</span>
                    <span className="text-xs text-gray-500 truncate">{suggestion.country}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
