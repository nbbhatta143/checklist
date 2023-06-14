import React from "react";

class SharedList extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const searchParams = new URLSearchParams(location.search);
    const sharedData = searchParams.get("data");

    // Parse the shared data and set it in the component state
    try {
      const parsedData = JSON.parse(decodeURIComponent(sharedData));
      // Set the parsed data in the state or perform any other required logic
      console.log(parsedData);
    } catch (error) {
      console.error("Error parsing shared data:", error);
    }
  }

  render() {
    return <div>Shared List</div>;
  }
}

export default SharedList;
