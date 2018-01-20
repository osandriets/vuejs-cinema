// console.log('hello');

import Vue from 'vue';
import './style.scss';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
Object.defineProperty(Vue.prototype, '$moment')

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: []
    },
    methods: {
        checkFilter(category, title, checked) {
            //  console.log(category, title, checked);
            if (checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if (index > -1) {
                    this[category].splice(index, 1);
                }
            }
        }
    },
    components: {
        'movie-list': MovieList,
        'movie-filter': MovieFilter
    },
    created() {
        //console.log(this.$http);
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
    }
});
