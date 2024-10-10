import { useRef, useState } from "react";

interface Item {
  icon: string;
  text: string;
  description: string;
}

const useDropdown = (items: Item[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const getAriaAttribtes = () => ({
    role: "combobox",
    "aria-expanded": isOpen,
    "aria-activedescendant": selectedItem ? selectedItem.text : undefined,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) => (prev + 1 === items.length ? 0 : prev + 1));
        break;
      case "ArrowUp":
        setSelectedIndex((prev) => (prev - 1 === 0 ? 0 : items.length - 1));
        break;
      case "Enter":
      case "Space":
        setSelectedItem(items[selectedIndex]);
        break;
    }
  };

  const toggleDropdown = () => setIsOpen((isOpen) => !isOpen);

  return {
    isOpen,
    toggleDropdown,
    handleKeyDown,
    selectedItem,
    setSelectedItem,
    selectedIndex,
    getAriaAttribtes,
    ref,
  };
};

export default useDropdown;
