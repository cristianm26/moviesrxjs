import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movies';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css'],
})
export class CardMovieComponent implements OnInit {
  @Input('movie') movie!: Movie;
  constructor() {}

  ngOnInit(): void {}

  getPoster() {
    return this.movie.Poster !== 'N/A'
      ? this.movie.Poster
      : 'https://via.placeholder.com/600';

    /* if (this.movie.Poster === 'N/A') {
      return 'https://via.placeholder.com/600';
    } else {
      return this.movie.Poster;
    } */
  }
}
