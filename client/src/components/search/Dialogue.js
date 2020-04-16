import React, { Component } from "react";

export default class Dialogue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, isOpen } = this.props;
    if (!isOpen) return null;
    return (
      <div>
        {items &&
          items.map(item => {
            return <div key={item._id}>{item.moduleName}</div>;
          })}
        {!items && <div className="alert-warning">Nothing found!</div>}
      </div>
    );
  }
}
