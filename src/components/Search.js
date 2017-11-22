import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { searchRequest } from '../actions/search'

class Search extends PureComponent {
  state = {
    searchQuery: ''
  }

  handleInputChange = (e) => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleSearchBtnClick = () => {
    this.props.searchRequest(this.state.searchQuery)
  }

  render () {
    const { isFetching, films } = this.props

    return (
      <div className="Search">
        <input type="text"
               name="searchQuery"
               placeholder="Название сериала"
               onChange={this.handleInputChange}
               value={this.state.searchQuery} />
        <button type="button" onClick={this.handleSearchBtnClick}>Найти</button>
        {
          isFetching
          ? <div>Загрузка...</div>
          : <div className="results">
              {films.map((film) => (
                <article className="results-item" key={film.id}>
                  <a href={`/show/${film.id}`}>{film.name}</a>
                  {film.image &&
                  <img src={film.image.original} alt={film.name} />}
                  <div dangerouslySetInnerHTML={{ __html: film.summary }} />
                </article>
              ))}
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.search.isFetching,
  films: state.search.results
})

const mapDispatchToProps = {
  searchRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
