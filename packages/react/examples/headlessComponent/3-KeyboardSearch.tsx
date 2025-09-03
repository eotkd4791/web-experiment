import { useState } from "react";
import { cn } from "../../utils/cn";

interface Item {
  icon: string;
  text: string;
  description: string;
}

type DropdownProps = {
  items: Item[];
};

const Dropdown = ({ items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) => prev + 1);
        break;
      case "ArrowUp":
        setSelectedIndex((prev) => prev - 1);
        break;
      case "Enter":
      case "Space":
        break;
    }
  };

  return (
    <div className="dropdown" onKeyDown={handleKeyDown}>
      <Trigger
        label={selectedItem ? selectedItem.text : "Select an item..."}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <DropdownMenu
          items={items}
          selectedIndex={selectedIndex}
          onItemClick={setSelectedItem}
        />
      )}
    </div>
  );
};

type TriggerProps = {
  label: string;
  onClick: () => void;
};

const Trigger = ({ label, onClick }: TriggerProps) => {
  return (
    <div className="trigger" tabIndex={0} onClick={onClick}>
      <span className="selection">{label}</span>
    </div>
  );
};

type DropdownMenuProps = {
  items: Item[];
  selectedIndex: number;
  onItemClick: (item: Item) => void;
};

const DropdownMenu = ({
  items,
  selectedIndex,
  onItemClick,
}: DropdownMenuProps) => {
  return (
    <div className="dropdown-menu" role="listbox">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(item)}
          className={cn(
            "item-container",
            selectedIndex === index && "selected-item"
          )}
        >
          <img src={item.icon} alt={item.text} />
          <div className="details">
            <div>{item.text}</div>
            <small>{item.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
