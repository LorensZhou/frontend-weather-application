
import React, { useState, useRef, useEffect } from "react"; // Import useRef
import './SearchableInput.css'

function SearchableInput(
    {   items,
        onSearch,
        label = "Search",
        maxSuggestions,
        inputId,
        inputName,
        disabled = false,
        initialValue,
    })
{
    const [searchValue, setSearchValue] = useState(initialValue || "");

    useEffect(() => {
        // Werk de interne state bij naar de nieuwe waarde van de prop
        setSearchValue(initialValue || "");

    }, [initialValue]); // <-- Dependency array: deze effect draait als 'initialValue' verandert.

    const [showSuggestionsDropdown, togShowSuggestionsDropdown] = useState(false);

    const isSelectingItemRef = useRef(false);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
        togShowSuggestionsDropdown(true);
        isSelectingItemRef.current = false;
    };

    const handleItemClick = (item) => {
        setSearchValue(item);
        onSearch(item);
        togShowSuggestionsDropdown(false);
        isSelectingItemRef.current = false;
    };

    const handleSuggestionMouseDown = () => {
        isSelectingItemRef.current = true;
    };

    const handleBlur = (event) => {

        setTimeout(() => {
            if (!isSelectingItemRef.current) {
                console.log("Blurred without selecting. Clearing input.");
                if (!items.find ((item) => item === event.target.value)){
                    setSearchValue('');
                    console.log( "target.value komt niet voor in items array.");
                }
                togShowSuggestionsDropdown(false);
            } else {
                togShowSuggestionsDropdown(false);
                isSelectingItemRef.current = false;
            }
            isSelectingItemRef.current = false;
        }, 100);
    };

    const handleFocus = () => {
        togShowSuggestionsDropdown(true);
        isSelectingItemRef.current = false;
    }

    const filteredItems = items.filter((item) =>
        searchValue && showSuggestionsDropdown &&
        item.toLowerCase().includes(searchValue.toLowerCase()) &&
        item !== searchValue
    ).slice(0, maxSuggestions);

    return (
        <div className="dropdown-container">
            <label htmlFor={inputId}>{label}</label>
            <div className="search-container">
                <input
                    type="text"
                    id={inputId}
                    name={inputName}
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}
                    autoComplete="off"
                />

                {showSuggestionsDropdown && filteredItems.length > 0 && (
                    <div className="dropdown">
                        {filteredItems.map((item) => (
                            <div key={item}
                                 className="dropdown-row"
                                 onClick={() => handleItemClick(item)}
                                 onMouseDown={handleSuggestionMouseDown}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchableInput;