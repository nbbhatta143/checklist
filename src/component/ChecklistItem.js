import React from "react";

class ChecklistItem extends React.Component {
  render() {
    const { item, onDelete } = this.props;

    return (
      <li>
        {item}
        <button onClick={onDelete}>Delete</button>
      </li>
    );
  }
}

export default ChecklistItem;
