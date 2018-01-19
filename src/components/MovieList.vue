<template>
    <div id="movie-list">
        <!--<div v-for="item in filteredModules" class="movie">{{item.movie.Title}}</div>-->
        <div v-if="filteredModules.length">
            <movie-item v-for="movie in filteredModules" v-bind:movie="movie.movie"></movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            No result...
        </div>
        <div v-else class="no-results">
            Loading...
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import MovieItem from './MovieItem.vue'

    export  default {
/*        data(){
            return {
                movies: [
                    {title: 'Pulp Fiction', genre: genres.CRIME},
                    {title: 'Home Along', genre: genres.COMEDY},
                    {title: 'Austin Powers', genre: genres.COMEDY}
                ]
            }
        },*/
        props: ['genre', 'time', 'movies'],
        methods: {
            moviePassesGenreFilter(movie){
                if(!this.genre.length){
                    return true;
                }
                else {
                    //return this.genre.find(genre => movie.genre === genre);
                    let movieGenres = movie.movie.Genre.split(", ");
                    let matched = true;
                    this.genre.forEach(genre => {
                       if (movieGenres.indexOf(genre) === -1){
                           matched = false;
                       }
                    });
                    return matched;
                }
            }
        },
        computed: {
            filteredModules(){
                //return this.movies;
                return this.movies.filter(this.moviePassesGenreFilter);
            }
        },
        components: {
            MovieItem
        }
    }
</script>
<style>

</style>