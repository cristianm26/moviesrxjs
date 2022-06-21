import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movies';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinct,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs/operators';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;
  movieSubscription!: Subscription;

  constructor(private moviesService: MovieService) {}

  ngOnInit(): void {
    this.movieSubscription = fromEvent<Event>(
      this.movieSearchInput.nativeElement,
      'keyup'
    )
      .pipe(
        map((event: Event) => {
          const searchTerm = (event.target as HTMLInputElement).value;
          return searchTerm;
        }),
        filter((searchTerm) => searchTerm.length > 3),
        debounceTime(500),
        distinct(),
        tap((searchTerm: string) => console.log(searchTerm))
      )

      .subscribe((searchTerm: string) => {
        this.getMovies(searchTerm);
      });
  }

  /*   ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
 */
  getMovies(searchTerm: string) {
    return this.moviesService.getMovies(searchTerm).subscribe((data) => {
      this.movies = data !== undefined ? data : [];
      /* if(data.Response === "False"){
        this.movies = [];
      }else{
        this.movies = data.Search;
      } */
    });
  }

  /*  getMoviesT(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    return this.moviesService.getMovies(searchTerm).subscribe((data) => {
      this.movies = data !== undefined ? data : [];
    });
  } */

  getMoviesT(searchTerm: string) {
    return this.moviesService.getMovies(searchTerm).subscribe((data) => {
      this.movies = data !== undefined ? data : [];
    });
  }
}
