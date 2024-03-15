readonly getMovie = this.effect((movieId$: Observable<string>) => {
    return movieId$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((id) => this.moviesService.fetchMovie(id).pipe(
        //👇 Act on the result within inner pipe.
        tapResponse(
          (movie) => this.addMovie(movie),
          (error: HttpErrorResponse) => this.logError(error),
        ),
      )),
    );
  });

//   readonly getMoviesByQuery = this.effect<string>((query$) => {
//     return query$.pipe(
//       tap(() => this.patchState({ loading: true }),
//       switchMap((query) =>
//         this.moviesService.fetchMoviesByQuery(query).pipe(
//           tapResponse({
//             next: (movies) => this.patchState({ movies }),
//             error: (error: HttpErrorResponse) => this.logError(error),
//             finalize: () => this.patchState({ loading: false }),
//           })
//         )
//       )
//     );
//   });