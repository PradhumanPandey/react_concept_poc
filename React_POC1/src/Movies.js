import React, { Component } from "react";
import { getMovies } from "./fakeMovieService";
import Like from "./Like";
import ListGroup from "./ListGroup";
import Pagination from "./Pagination";
import Paginate from "./utils/Paginate";
import { getGenres } from "./services/fakeGenreService";
import _ from "lodash";
import TableMove from "./components/TableMove";
export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Generes" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });
  };
  handleClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genres) => {
    this.setState({ selectedGenre: genres, currentPage: 1 });
  };
  print = () => {
    console.log(this.state.genres, "kjeaysgrdfbckjqerwnagb");
  };
  handleSort = (path) => {
    // console.log(path);
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allmovie,
      selectedGenre,
      sortColumn,
    } = this.state;
    if (this.state.movies.length === 0) {
      return <h3>Sorry, there are no movis in the database.</h3>;
    }
    const filtered =
      selectedGenre && selectedGenre._id
        ? allmovie.filter((m) => m.genre._id === selectedGenre._id)
        : allmovie;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = Paginate(sorted, currentPage, pageSize);
    return (
      <div
        className="row"
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h3>Showing {filtered.length} movies in the database.</h3>
          <TableMove
            movies={movies}
            onLike={this.handleClick}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={this.state.movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

//----------------------------------------------------//
// Lodash _.orderBy() Method

// // Requiring the lodash library
// const _ = require("lodash");

// // Original array
// var users = [
//   { 'patron': 'jonny',   'age': 48 },
//   { 'patron': 'john', 'age': 34 },
//   { 'patron': 'john',   'age': 40 },
//   { 'patron': 'jonny', 'age': 36 }
// ];

// // Use of _.orderBy() method
// // Sort by `patron` in ascending order
// // and by `age` in descending order

// let gfg = _.orderBy(users, ['patron', 'age'],
//              ['asc', 'desc']);

// // Printing the output
// console.log(gfg);
//---------------------------------------------------//
