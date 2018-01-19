// console.log('hello');

import Vue from 'vue';
import './style.scss'
import genres from './util/genres'
import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource);

new Vue({
     el: '#app',
    data: {
      genre: [],
      time: [],
      movies: []
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
        'movie-list' : MovieList,
        'movie-filter': MovieFilter
    },
    created(){
         //console.log(this.$http);
        this.$http.get('/api').then(response => {
           this.movie = response.data;
        });
    }
});
