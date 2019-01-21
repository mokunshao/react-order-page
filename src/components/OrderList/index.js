import React, { Component } from "react";
import OrderItem from "../OrderItem";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount = () => {
    fetch("data.json").then(res => {
      if (res.ok) {
        res.json().then(data => {
          this.setState({ data });
        });
      }
    });
  };
  handleOnSubmit = (id, comment, stars) => {
    const newData = this.state.data.map(item => {
      return id === item.id
        ? {
            ...item,
            id,
            comment,
            stars,
            isCommented: true
          }
        : item;
    });
    this.setState({ data: newData });
  };
  render() {
    return (
      <div>
        {this.state.data.map(item => {
          return (
            <OrderItem
              key={item.id}
              data={item}
              onSubmit={this.handleOnSubmit}
            />
          );
        })}
      </div>
    );
  }
}

export default OrderList;
