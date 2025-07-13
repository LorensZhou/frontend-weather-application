
import React, { useState, useRef, useEffect } from 'react'; // Import useRef
import './SearchableInput.css';

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

    // Ref om bij te houden of een item wordt geselecteerd
    const isSelectingItemRef = useRef(false);

    // Ref traceert of het component is mounted
    const isMountedRef = useRef(false);

    // Ref slaat de timeout id op
    const blurTimeoutRef = useRef(null);

    useEffect(() => {
        // zet isMountedRef op true wanneer het component is mounted
        isMountedRef.current = true;
        // Cleanup functie wanneer het component unmount
        return () => {
            isMountedRef.current = false;
            // stopt alle pending timeout wanneer het component unmount
            if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current);
            }
        };
    }, []); // lege dependency array betekent dit wordt uitgevoerd een keer bij mounting en een keer bij unmounting

    const [searchValue, setSearchValue] = useState(initialValue || "");

    useEffect(() => {
        // Werk de interne state bij naar de nieuwe waarde van de prop
        setSearchValue(initialValue || "");

    }, [initialValue]); // <-- Dependency array: deze effect draait als 'initialValue' verandert.

    const [showSuggestionsDropdown, tglShowSuggestionsDropdown] = useState(false);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        onSearch(newValue);
        tglShowSuggestionsDropdown(true);
        isSelectingItemRef.current = false;
    };

    const handleItemClick = (item) => {
        setSearchValue(item);
        onSearch(item);
        tglShowSuggestionsDropdown(false);
        isSelectingItemRef.current = false;
    };

    const handleSuggestionMouseDown = () => {
        isSelectingItemRef.current = true;
    };

    const handleBlur = (event) => {

        // vorige timeout stoppen om conflicts te vermijden
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
        }

        blurTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current && !isSelectingItemRef.current) {
                tglShowSuggestionsDropdown(false);
            }
            // controleer of component is mounted, dan pas status updaten
            else if (isMountedRef.current) {
                tglShowSuggestionsDropdown(false);
            }
            isSelectingItemRef.current = false;
            blurTimeoutRef.current = null; // timeout ref leegmaken na de timeout
        }, 100);
    };

    const handleFocus = () => {
        tglShowSuggestionsDropdown(true);
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