/*
  <ReactComment text={`
      Very long comment with html link
      <a href="https://gist.github.com/alexeychikk/bfe72a072a9a962f2da900b6151e4aae">Star me :)</a>
  `} />
*/

import React from "react";
import ReactDOM from "react-dom";

class ReactComment extends React.Component {
  static defaultProps = {
    trim: true
  };

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    ReactDOM.unmountComponentAtNode(el);
    el.outerHTML = this.createComment();
  }

  createComment() {
    let text = this.props.text;

    if (this.props.trim) {
      text = text.trim();
    }

    return `<!-- ${text} -->`;
  }

  render() {
    return <div />;
  }
}

export default ReactComment;
