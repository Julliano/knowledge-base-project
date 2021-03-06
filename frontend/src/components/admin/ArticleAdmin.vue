<style>

</style>

<template>
    <div class="article-admin">
        <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-form-group label="Name:" label-for="article-name">
                <b-form-input id="article-name" type="text" v-model="article.name" placeholder="Inform article name..." 
                :readonly="mode === 'remove'" required />
            </b-form-group>
            <b-form-group label="Description:" label-for="article-description">
                <b-form-input id="article-description" type="text" v-model="article.description" placeholder="Inform article description..." 
                :readonly="mode === 'remove'" required />
            </b-form-group>
            <b-form-group label="Image (URL):" label-for="article-imageUrl" v-if="mode === 'save'">
                <b-form-input id="article-imageUrl" type="text" v-model="article.imageUrl" placeholder="Inform article url image..." 
                :readonly="mode === 'remove'" />
            </b-form-group>
            <b-form-group label="Category:" label-for="article-categoryId" v-if="mode === 'save'">
                <b-form-select id="article-categoryId" :options="categories" v-model="article.categoryId" />
            </b-form-group>
            <b-form-group label="Author:" label-for="article-userId" v-if="mode === 'save'">
                <b-form-select id="article-userId" :options="users" v-model="article.userId" />
            </b-form-group>
            <b-form-group label="Content" label-for="category-content" v-if="mode === 'save'">
                <VueEditor v-model="article.content" placeholder="Inform article content" />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">
                Save
            </b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
                Remove
            </b-button>
            <b-button class="ml-2" @click="reset">
                Cancel
            </b-button>
            <hr>
        </b-form>
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError } from '@/global';
import axios from 'axios';

export default {
    name: 'ArticleAdmin',
    components: {
        VueEditor
    },
    data() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Code', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'description', label: 'Description', sortable: true },
                { key: 'actions', label: 'Actions'}
            ]
        }
    },
    mounted() {
        this.loadUsers();
        this.loadCategories();
        this.loadArticles();
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`;
            axios.get(url).then(res => {
                this.users = res.data.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` };
                });
            });
        },
        loadCategories() {
            const url = `${baseApiUrl}/categories`;
            axios.get(url).then(res => {
                this.categories = res.data.data.map(category => {
                    return { value: category.id, text: category.path};
                });
            });
        },
        loadArticles() {
            const url = `${baseApiUrl}/articles?page=${this.page}`;
            axios.get(url).then(res => {
                this.articles = res.data.data;
                this.count = res.data.count;
                this.limit = res.data.limit;
            });
        },
        reset() {
            this.mode = 'save';
            this.article = {};
            this.loadArticles();
        },
        save() {
            const method = this.article.id ? 'put' : 'post';
            const id = this.article.id ? `/${this.article.id}` : '';
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        remove() {
            const id = this.article.id;
            axios.delete(`${baseApiUrl}/articles/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError)
        },
        loadArticle(article, mode = 'save') {
            this.mode = mode;
            axios.get(`${baseApiUrl}/articles/${article.id}`)
                .then(res => this.article = res.data)
                .catch(showError)
        }
    },
    watch: {
        page() {
            this.loadArticles();
        }
    }
}
</script>
