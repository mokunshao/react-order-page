import React, { Component } from "react";
import "./style.css";
class OrderItem extends Component {
  render() {
    return (
      <div className="orderItem">
        <div className="picContainer">
          <img width="130" height="130" src={this.props.data.picture} />
        </div>
        <div>
          <div>{this.props.data.product}</div>
          <div>{this.props.data.shop}</div>
        </div>
        <div>
          <div>￥{this.props.data.price}</div>
          <div>
            {this.props.data.isCommented ? (
              <button className='greyButton'>已评价</button>
            ) : (
              <button className="redButton">评价</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default OrderItem;
