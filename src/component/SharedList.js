import React, { useState } from "react";
import { Link } from "react-router-dom";

const SharedList = ({ items }) => {
  const [categories, setCategories] = useState([localStorage.getItem("checklistCategories")]);
  const [sharedMessage, setSharedMessage] = useState(localStorage.getItem("checklistItems"));

  // Function to handle sharing the categories and their lists via message
  const handleShareCategories = () => {
    const sharedContent = categories.map((category) => {
      const categoryItems = items[category] || [];
      const formattedItems = categoryItems.join("\n"); // Join items with line breaks

      return `${category}:\n${formattedItems}\n`; // Format category and items
    });

    const sharedMessage = sharedContent.join("\n"); // Join categories with line breaks

    setSharedMessage(sharedMessage);
  };

  return (
    <div>
      {/* Render your category list */}
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>

      {/* Share button */}
      <button onClick={handleShareCategories}>Share Categories</button>

      {/* Render shared message */}
      {sharedMessage && (
        <div>
          <h3>Shared Categories and Lists:</h3>
          <pre>{sharedMessage}</pre>
        </div>
      )}

      {/* Link to navigate to other routes */}
      <Link to="/share">Go to Shared List</Link>
    </div>
  );
};

export default SharedList;
