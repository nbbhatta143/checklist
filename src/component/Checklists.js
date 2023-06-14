import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";

import "./Checklist.css";

class Checklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      selectedCategory: "",
      items: {},
      text: "",
      editedCategory: "",
      editedItemIndex: -1,
      editedItem: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    const storedCategories = localStorage.getItem("checklistCategories");
    const storedItems = localStorage.getItem("checklistItems");

    if (storedCategories) {
      this.setState({ categories: JSON.parse(storedCategories) });
    }

    if (storedItems) {
      this.setState({ items: JSON.parse(storedItems) });
    }
  }

  handleCategoryChange = (e) => {
    this.setState({ selectedCategory: e.target.value });
  };

  handleCategorySubmit = (e) => {
    e.preventDefault();

    const { selectedCategory, categories } = this.state;
    const trimmedCategory = selectedCategory.trim();

    if (trimmedCategory !== "") {
      if (categories.includes(trimmedCategory)) {
        this.setState({ errorMessage: "Category already exists!", selectedCategory: "" });
      } else {
        this.setState(
          (prevState) => ({
            categories: [...prevState.categories, trimmedCategory],
            selectedCategory: "",
            errorMessage: "",
          }),
          () => {
            const { categories } = this.state;
            localStorage.setItem("checklistCategories", JSON.stringify(categories));
          }
        );
      }
    } else {
      this.setState({ errorMessage: "Please enter a category!" });
    }
  };

  handleItemChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleItemSubmit = (e) => {
    e.preventDefault();

    const { selectedCategory, text, items } = this.state;
    const trimmedText = text.trim();

    if (trimmedText !== "") {
      const categoryItems = items[selectedCategory] || [];
      const updatedItems = [...categoryItems, { id: Date.now(), text: trimmedText, done: false }];

      this.setState(
        (prevState) => ({
          items: {
            ...prevState.items,
            [selectedCategory]: updatedItems,
          },
          text: "",
          errorMessage: "",
        }),
        () => {
          const { items } = this.state;
          localStorage.setItem("checklistItems", JSON.stringify(items));
        }
      );
    } else {
      this.setState({ errorMessage: "Please enter an item!" });
    }
  };

  handleItemEdit = (category, index, item) => {
    this.setState({
      editedCategory: category,
      editedItemIndex: index,
      editedItem: item.text,
      errorMessage: "",
    });
  };

  handleItemUpdate = () => {
    const { editedCategory, editedItemIndex, editedItem, items } = this.state;
    const trimmedItem = editedItem.trim();

    if (trimmedItem !== "") {
      const categoryItems = [...(items[editedCategory] || [])];
      categoryItems[editedItemIndex] = { ...categoryItems[editedItemIndex], text: trimmedItem };

      const updatedItems = {
        ...items,
        [editedCategory]: categoryItems,
      };

      this.setState(
        {
          items: updatedItems,
          editedCategory: "",
          editedItemIndex: -1,
          editedItem: "",
          errorMessage: "",
        },
        () => {
          localStorage.setItem("checklistItems", JSON.stringify(updatedItems));
        }
      );
    } else {
      this.setState({ errorMessage: "Please enter an item!" });
    }
  };

  handleItemDelete = (category, index) => {
    const { items } = this.state;
    const categoryItems = [...(items[category] || [])];
    categoryItems.splice(index, 1);

    const updatedItems = {
      ...items,
      [category]: categoryItems,
    };

    this.setState(
      {
        items: updatedItems,
      },
      () => {
        localStorage.setItem("checklistItems", JSON.stringify(updatedItems));
      }
    );
  };

  handleCategoryDelete = (category) => {
    const { categories, items } = this.state;
    const updatedCategories = categories.filter((cat) => cat !== category);
    const updatedItems = { ...items };
    delete updatedItems[category];
    this.setState(
      {
        categories: updatedCategories,
        items: updatedItems,
        selectedCategory: "",
        editedItemIndex: -1,
        editedItem: "",
      },
      () => {
        localStorage.setItem("checklistCategories", JSON.stringify(updatedCategories));
        localStorage.setItem("checklistItems", JSON.stringify(updatedItems));
      }
    );
  };

  handleCancelEdit = () => {
    this.setState({ editedCategory: "", editedItemIndex: -1, editedItem: "", errorMessage: "" });
  };

  handleCheckboxToggle = (category, index) => {
    const { items } = this.state;
    const categoryItems = [...(items[category] || [])];
    categoryItems[index].checked = !categoryItems[index].checked;

    const updatedItems = {
      ...items,
      [category]: categoryItems,
    };

    this.setState({ items: updatedItems }, () => {
      const { items } = this.state;
      localStorage.setItem("checklistItems", JSON.stringify(items));
    });
  };

  renderCategoryDropdown = () => {
    const { categories } = this.state;

    return (
      <select className="form-container" onChange={this.handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    );
  };

  renderCategoryDeleteButton = (category) => {
    return <DeleteIcon onClick={() => this.handleCategoryDelete(category)} />;
  };

  render() {
    const {
      categories,
      selectedCategory,
      items,
      text,
      editedCategory,
      editedItemIndex,
      editedItem,
      errorMessage,
    } = this.state;
    const defaultCategory = categories[0];

    return (
      <div className="container">
        <div className="card">
          <h1 className="title">Checklist App</h1>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form className="form-container" onSubmit={this.handleCategorySubmit}>
            <input
              type="text"
              value={selectedCategory}
              onChange={this.handleCategoryChange}
              placeholder="Enter category"
            />
            <IconButton type="submit">
              <Add />
            </IconButton>
          </form>

          {this.renderCategoryDropdown()}

          <div className="card">
            {selectedCategory || defaultCategory ? (
              <>
                <h2 className="title">
                  {selectedCategory || defaultCategory}
                  {selectedCategory && this.renderCategoryDeleteButton(selectedCategory)}
                </h2>

                <form className="form-container" onSubmit={this.handleItemSubmit}>
                  <input
                    type="text"
                    value={text}
                    onChange={this.handleItemChange}
                    placeholder="Enter item"
                  />
                  <IconButton type="submit">
                    <Add />
                  </IconButton>
                </form>

                <ul className="items-container">
                  {(items[selectedCategory || defaultCategory] || []).map((item, index) => (
                    <li key={index} className="subcard">
                      {editedCategory === selectedCategory && editedItemIndex === index ? (
                        <>
                          <input
                            type="text"
                            onChange={(e) => this.setState({ editedItem: e.target.value })}
                            value={editedItem}
                            placeholder={item.text}
                          />
                          <button className="edit-button" onClick={this.handleItemUpdate}>
                            Save
                          </button>
                          <button className="edit-button" onClick={this.handleCancelEdit}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <label className={item.done ? "done" : ""}>
                            <Checkbox
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => this.handleCheckboxToggle(selectedCategory, index)}
                            />
                          </label>
                          <span>{item.text}</span>
                          <Edit
                            className="category-button"
                            onClick={() =>
                              this.handleItemEdit(
                                selectedCategory || defaultCategory,
                                index,
                                item.text
                              )
                            }
                          />
                          <DeleteIcon
                            className="category-button"
                            onClick={() =>
                              this.handleItemDelete(selectedCategory || defaultCategory, index)
                            }
                          />
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Checklist;
