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
                onClick={this.handleClickStars.bind(this, item)}
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
        <div className="picContainer">
          <img
            width="130"
            height="130"
            src={this.props.data.picture}
            alt={this.props.data.product}
          />
        </div>
        <div>
          <div>{this.props.data.product}</div>
          <div>{this.props.data.shop}</div>
        </div>
        <div>
          <div>￥{this.props.data.price}</div>
          <div>
            {this.props.data.isCommented ? (
              <button className="greyButton" onClick={this.handleOpenEditArea}>
                已评价
              </button>
            ) : (
              <button className="redButton" onClick={this.handleOpenEditArea}>
                评价
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
