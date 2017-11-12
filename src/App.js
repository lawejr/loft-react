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
        id: getNewsId()
      };

      this.setState({
        newsInput: '',
        news: [...news, newPost]
      });
    }
  }

  render () {
    const { newsInput, news } = this.state;

    return (
      <div className="App">
        <input type="text"
               placeholder="Добавить новость"
               value={newsInput}
               onChange={this.handleChange}
               onKeyDown={this.handleKeyDown} />
        {news.map((newsItem) => {
          return (
            <NewsPost
              key={newsItem.text}
              text={newsItem.text}
            />
          )
        })}
      </div>
    );
  }
}

export default App;
