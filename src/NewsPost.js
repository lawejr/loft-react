import React, { Component } from 'react';
import Comment from './Comment'

let id = 0;

function getCommentId () {
  id += 1;
  return 'c' + id;
}

class NewsPost extends Component {
  state = {
    newValue: ''
  }

  handleChange = (e) => {
    this.setState({ newValue: e.target.value })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { addComment, id } = this.props;
      const newComment = {
        text: this.state.newValue,
        id: getCommentId()
      };

      addComment(newComment, id)

      this.setState({
        newValue: '',
      });
    }
  }

  handleDelete = () => {
    const { id, deleteComment } = this.props

    deleteComment(id)
  }

  render () {
    const { text, comments, deleteComment } = this.props

    return (
      <div>
        <p>{text}</p>
        <span className="delete" onClick={this.handleDelete}>УДАЛИТЬ</span>
        {comments.map((comment) => {
          return (
            <Comment key={comment.id}
                     id={comment.id}
                     text={comment.text}
                     onDelete={deleteComment} />
          )
        })}
        <input type="text"
               value={this.state.newValue}
               onChange={this.handleChange}
               onKeyDown={this.handleKeyDown} />
      </div>
    );
  }
}

export default NewsPost;
