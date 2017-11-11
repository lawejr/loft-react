import React, { Component } from 'react';
import NewsPost from './NewsPost';

let id = 0;

function getNewsId () {
  id += 1;
  return id;
}

class App extends Component {
  state = {
    news: [],
    newsInput: ''
  }

  handleChange = (e) => {
    this.setState({ newsInput: e.target.value })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { newsInput, news } = this.state;
      const newPost = {
        text: newsInput,
        id: getNewsId(),
        comments: []
      };

      this.setState({
        inputValue: '',
        news: [...news, newPost]
      });
    }
  }

  addComment = (comment, newsId) => {
    this.setState({
      news: this.state.news.map((newsItem) => {
        return newsItem.id === newsId
          ? {
            ...newsItem,
            comments: [...newsItem.comments, comment]
          }
          : newsItem
      })
    })
  }

  deleteComment = (id) => {
    this.setState({
      news: this.state.news.filter((newsItem) => newsItem.id !== id)
    })
  }

  render () {
    const { newsInput, news } = this.state;

    return (
      <div className='App'>
        <input type="text"
               value={newsInput}
               onChange={this.handleChange}
               onKeyDown={this.handleKeyDown} />
        {news.map((newsItem) => {
          return (
            <NewsPost
              key={newsItem.id}
              id={newsItem.id}
              text={newsItem.text}
              comments={newsItem.comments}
              addComment={this.addComment}
              deleteComment={this.deleteComment}
            />
          )
        })}
      </div>
    );
  }
}

export default App;
