import React, { Component } from 'react';
import Comment from './Comment'

let id = 0;

function getCommentId () {
  id += 1;
  return 'c' + id;
}

class NewsPost extends Component {
  state = {
    commentInput: '',
    comments: []
  }

  handleChange = (e) => {
    this.setState({ commentInput: e.target.value })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { commentInput, comments } = this.state

      const newComment = {
        text: commentInput,
        id: getCommentId()
      };

      this.setState({
        commentInput: '',
        comments: [...comments, newComment]
      });
    }
  }

  handleDelete = (id) => {
    this.setState({
      comments: this.state.comments.filter((comment) => comment.id !== id)
    })
  }

  render () {
    const { text } = this.props
    const { commentInput, comments } = this.state

    return (
      <div>
        <p>{text}</p>
        {comments.map((comment) => {
          return (
            <Comment key={comment.id}
                     id={comment.id}
                     text={comment.text}
                     onDelete={this.handleDelete} />
          )
        })}
        <input type="text"
               placeholder="Добавить комментарий"
               value={commentInput}
               onChange={this.handleChange}
               onKeyDown={this.handleKeyDown} />
      </div>
    );
  }
}

export default NewsPost;
