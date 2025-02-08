import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuItemModal from "../components/MenuItemModal";

const mockItem = {
  id: "1",
  label: "Test Item",
  price: 9.99,
  image: "test-item.jpg",
  modifierGroups: [
    {
      id: "mg1",
      label: "Options",
      items: [{ id: "opt1", label: "Option 1", price: 1.0 }],
    },
  ],
};

const mockOnClose = jest.fn();

describe("MenuItemModal", () => {
  beforeEach(() => {
    cleanup();
  });
  it("renders unavailable message when item is available and menu group is not available", () => {
    render(
      <MenuItemModal
        item={mockItem}
        onClose={mockOnClose}
        isAvailable={false}
      />
    );
    expect(screen.getByText("Not Available")).toBeInTheDocument();
    expect(screen.queryByText("Add")).not.toBeInTheDocument();
  });

  it("renders add button when item is available and menu group is available", () => {
    render(
      <MenuItemModal item={mockItem} onClose={mockOnClose} isAvailable={true} />
    );
    expect(
      screen.queryByText("This item is currently unavailable")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("disables add button when item is sold out but menu group is available", () => {
    const mockItemUnavailable = { ...mockItem, isSoldOut: true };
    render(
      <MenuItemModal
        item={mockItemUnavailable}
        onClose={mockOnClose}
        isAvailable={true}
      />
    );

    expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with correct item details", () => {
    render(
      <MenuItemModal item={mockItem} onClose={mockOnClose} isAvailable={true} />
    );

    expect(screen.getByText(mockItem.label)).toBeInTheDocument();
    expect(
      screen.getByText(`($${mockItem.price.toFixed(2)})`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockItem.label)).toBeInTheDocument();
  });

  it("handles quantity increment and decrement", () => {
    render(
      <MenuItemModal item={mockItem} onClose={mockOnClose} isAvailable={true} />
    );

    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("−");

    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.click(incrementButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();

    // Test minimum quantity
    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls onClose when clicking close button", () => {
    render(
      <MenuItemModal item={mockItem} onClose={mockOnClose} isAvailable={true} />
    );

    // Get all close buttons (mobile and desktop)
    const closeButtons = screen.getAllByText("✕");
    // Click the first available close button
    fireEvent.click(closeButtons[0]);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking overlay", () => {
    render(
      <MenuItemModal item={mockItem} onClose={mockOnClose} isAvailable={true} />
    );

    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders modifier groups when present", () => {
    render(
      <MenuItemModal item={mockItem} onClose={mockOnClose} isAvailable={true} />
    );

    expect(screen.getByText("Customization Options")).toBeInTheDocument();
    expect(
      screen.getByText(mockItem.modifierGroups[0].label)
    ).toBeInTheDocument();
  });

  it("manages body overflow style", () => {
    render(
      <MenuItemModal item={mockItem} onClose={mockOnClose} isAvailable={true} />
    );
    expect(document.body.style.overflow).toBe("hidden");

    cleanup();
    expect(document.body.style.overflow).toBe("unset");
  });

  it("renders with empty modifier groups", () => {
    const itemWithoutModifiers = { ...mockItem, modifierGroups: [] };
    render(
      <MenuItemModal
        item={itemWithoutModifiers}
        onClose={mockOnClose}
        isAvailable={true}
      />
    );

    expect(screen.queryByText("Customization Options")).not.toBeInTheDocument();
  });
});
