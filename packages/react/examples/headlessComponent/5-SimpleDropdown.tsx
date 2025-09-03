import useDropdown from "./4-useDropdown";

interface Item {
  icon: string;
  text: string;
  description: string;
}

type DropdownProps = {
  items: Item[];
};

const SimpleDropdown = ({ items }: DropdownProps) => {
  const {
    isOpen,
    toggleDropdown,
    selectedIndex,
    selectedItem,
    setSelectedItem: updateSelectedItem,
    getAriaAttribtes,
    ref: dropdownRef,
  } = useDropdown(items);

  return (
    <div
      tabIndex={0}
      ref={dropdownRef}
      {...getAriaAttribtes()}
      className="dropdown"
    >
      <button className="trigger" onClick={toggleDropdown}>
        Select
      </button>
      <p data-testid="selected-item">{selectedItem?.text}</p>
      {isOpen && (
        <ul role="listbox" className="dropdown-menu">
          {items.map((item, index) => (
            <li
              role="option"
              key={index}
              className="item-container"
              onClick={() => updateSelectedItem(item)}
              aria-selected={index === selectedIndex}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleDropdown;
