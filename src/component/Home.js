import React, { Component } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "@fortawesome/fontawesome-free/css/all.css";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Checkbox from "@mui/material/Checkbox";

class Home extends Component {
  state = {
    items: [],
    newItemText: "",
    clicked: "",
    check: "",
  };
  componentDidMount() {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    let clickValue = "";
    if (storedItems) {
      this.setState({ items: storedItems });
    }
    if (storedItems) {
      if (storedItems.length >= 1) {
        clickValue = "activated";
      } else {
        clickValue = "inActive";
      }
      this.setState(() => ({
        clicked: clickValue,
      }));
    }
  }

  componentDidUpdate() {
    localStorage.setItem("items", JSON.stringify(this.state.items));
  }

  handleInputChange = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  handleAddItem = (event) => {
    event.preventDefault();
    const newItemText = this.state.newItemText.trim();
    if (!newItemText) {
      return;
    }
    const newItem = {
      id: Date.now(),
      text: newItemText,
      done: false,
    };
    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
      newItemText: "",
      clicked: "activated",
    }));
  };

  handleDeleteItem = (itemId) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((item) => item.id !== itemId),
    }));
  };

  handleDeleteAllChange = () => {
    this.setState((prevState) => ({
      items: [],
      clicked: "inActive",
    }));
  };

  handleToggleDone = (itemId) => {
    this.setState((prevState) => ({
      items: prevState.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            done: !item.done,
          };
        } else {
          return item;
        }
      }),
    }));
  };

  handleToggleAll = () => {
    this.setState((prevState) => ({
      items: prevState.items.map((item) => {
        return {
          ...item,
          done: !item.done,
        };
      }),
    }));
  };
  render() {
    return (
      <div className="checklist" style={{ marginTop: "3%" }}>
        <h1>Create your checklist</h1>
        <form onSubmit={this.handleAddItem}>
          {" "}
          <Checkbox
            value="checkedA"
            type="checkbox"
            color="primary"
            className={this.state.clicked}
            inputProps={{
              "aria-label": "Checkbox A",
            }}
            size="small"
            defaultValue={""}
            onChange={() => this.handleToggleAll()}
          ></Checkbox>
          <DeleteIcon
            className="delete"
            color="secondary"
            xs={10}
            onClick={() => this.handleDeleteAllChange()}
          >
            Delete
          </DeleteIcon>{" "}
          <IconButton type="submit" color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Enter your lists"
            maxLength={40}
            value={this.state.newItemText}
            onChange={this.handleInputChange}
            required
          />
        </form>

        <ul>
          {this.state.items.map((item) => (
            <li key={item.id}>
              <label className={item.done ? "done" : ""}>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={item.done}
                  onChange={() => this.handleToggleDone(item.id)}
                />{" "}
                {item.text}
              </label>

              <DeleteIcon
                className="delete"
                color="success"
                id="deleteItems"
                xs={10}
                onClick={() => this.handleDeleteItem(item.id)}
              >
                Delete
              </DeleteIcon>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
