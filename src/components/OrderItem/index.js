import React, { Component } from "react";
import "./style.css";
class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      editing: false,
      stars: this.props.data.stars,
      comment: this.props.data.comment
    };
    this.renderEditArea = () => {
      return (
        <div>
          <textarea
            placeholder="请输入您的评价"
            onChange={this.handleCommentChange}
            value={this.state.comment}
          />
          {this.renderStars()}
          {this.state.showAlert ? <div>请输入评价并打星</div> : null}
          <button className="redButton" onClick={this.handleSubmitComment}>
            提交
          </button>
          <button className="greyButton" onClick={this.handleCancelComment}>
            取消
          </button>
        </div>
      );
    };
    this.renderStars = () => {
      return (
        <div>
          {[1, 2, 3, 4, 5].map((item, key) => {
            const lightStar = this.state.stars >= item ? "redStar" : "";
            return (
              <span
                className={`star ${lightStar}`}
                key={key}
                onClick={this.handleClickStars.bind(this,item)}
              >
                ★
              </span>
            );
          })}
        </div>
      );
    };
    this.handleOpenEditArea = () => {
      this.setState(state => ({
        editing: !state.editing
      }));
    };
    this.handleCommentChange = e => {
      this.setState({
        comment: e.target.value
      });
    };
    this.handleClickStars = stars => {
      this.setState({
        stars
      });
    };
    this.handleCancelComment = () => {
      this.setState({
        editing: false,
        showAlert: false
      });
    };
    this.handleSubmitComment = () => {
      if (this.state.comment && this.state.stars) {
        this.setState({
          editing: false
        });
        this.props.onSubmit(
          this.props.data.id,
          this.state.comment,
          this.state.stars
        );
      } else {
        this.setState({ showAlert: true });
      }
    };
  }
  render() {
    return (
      <div className="orderItem">
        <div className="orderMain">
          <div className="orderInfo">
            <img
            width="100px"
            height="100px"
              src={this.props.data.picture}
              alt={this.props.data.product}
            />
            <div className="orederDetail">
              <h3>{this.props.data.product}</h3>
              <div>{this.props.data.shop}</div>
              <div>￥{this.props.data.price}</div>
            </div>
          </div>
          <div className="rateButtons">
            {this.props.data.isCommented ? (
              <button className="greyButton" onClick={this.handleOpenEditArea}>
                已评价
              </button>
            ) : (
              <button className="redButton" onClick={this.handleOpenEditArea}>
                未评价
              </button>
            )}
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    );
  }
}

export default OrderItem;
