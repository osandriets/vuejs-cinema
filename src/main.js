// console.log('hello');

import Vue from 'vue';
import './style.scss'
import genres from './util/genres'

new Vue({
     el: '#app',
    // data:{
    //      msg: 'Hello world'
    // },
    data: {
      genre: [],
      time: []
    },
    methods: {
        checkFilter(category, title, checked){
            console.log(category, title, checked);
            // this.$emit('check-filter');
            if(checked){
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if(index > -1){
                    this[category].splice(index,1);
                }
            }
        }
    },
    components: {
         'movie-list': {
             template: '<div id="movie-list">' +
             '<div v-for="movie in filteredModules" class="movie">{{movie.title}}</div>' +
             '</div>',
             data(){
                 return {
                     movies: [
                         {title: 'Pulp Fiction', genre: genres.CRIME},
                         {title: 'Home Along', genre: genres.COMEDY},
                         {title: 'Austin Powers', genre: genres.COMEDY}
                     ]
                 }
             },
             props: ['genre', 'time'],
             methods: {
                 moviePassesGenreFilter(movie){
                     if(!this.genre.length){
                         return true;
                     }
                     else {
                         return this.genre.find(genre => movie.genre === genre);
                     }
                 }
             },
             computed: {
                 filteredModules(){
                     //return this.movies;
                     return this.movies.filter(this.moviePassesGenreFilter);
                 }
             }
         },
        'movie-filter': {
             data(){
               return{
                   genres
               }
             },
            template: `<div id="movie-filter">
                            <h2>Filter result</h2>
                            <div class="filter-group">
                                <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                            </div>
                        </div>`,
            methods: {
                checkFilter(category, title, checked){
                    //console.log('checkFilter');
                    this.$emit('check-filter', category, title, checked);

                }
            },
            components: {
                'check-filter': {
                    data(){
                        return{
                            checked: false
                        }
                    },
                    props: ['title'],
                    template: `<div  class="check-filter" v-bind:class="{active: checked}" v-on:click="checkFilter">
                    <span class="checkbox"></span><span class="check-filter-title">{{title}}</span>
                    </div>`,
                    methods: {
                        checkFilter(){
                            this.checked = !this.checked;
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            }
        }
    }
});
