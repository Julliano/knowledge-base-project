<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }
    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>

<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Category" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                {{ article.name }}
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore" @click="getArticles" class="btn btn-lg btn-outline-primary">
                Load more articles
            </button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global';
import axios from 'axios';
import PageTitle from '../template/PageTitle';

export default {
    name: 'ArticleByCategory',
    components: {
        PageTitle
    },
    data() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    mounted() {
        this.category.id = this.$route.params.id;
        this.getCategory();
        this.getArticles();
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`;
            axios.get(url).then(res => this.category = res.data);
        },
        getArticles() {
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`;
            axios.get(url).then(res => {
                this.articles = this.articles.concat(res.data);
                this.page++;
                if (res.data.length === 0) this.loadMore = false;
            });
        }
    }
}
</script>
