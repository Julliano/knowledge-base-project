<style>

</style>

<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Name:" label-for="user-name">
                        <b-form-input id="user-name" type="text" v-model="user.name" placeholder="Inform user name..." required />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Email:" label-for="user-email">
                        <b-form-input id="user-email" type="text" v-model="user.email" placeholder="Inform user email..." required />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3">
                Administrator?
            </b-form-checkbox>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Password:" label-for="user-password">
                        <b-form-input id="user-password" type="password" v-model="user.password" placeholder="Inform user password..." required />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Password Confirm:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password" v-model="user.confirmPassword" placeholder="Inform user confirm password..." required />
                    </b-form-group>
                </b-col>
            </b-row>
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
        <b-table hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global';
import axios from 'axios';

export default {
    name: 'UserAdmin',
    data() {
        return {
            mode: 'save',
            user: {},
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Code', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'admin', label: 'Admin', sortable: true,
                    formatter: value => value ? 'Yes' : 'No' },
                { key: 'actions', label: 'Actions'}
            ]
        }
    },
    mounted() {
        this.loadUsers();
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users?page=${this.page}`;
            axios.get(url).then(res => {
                this.count = res.data.count;
                this.limit = res.data.limit;
                this.users = res.data.data;
            });
        },
        reset() {
            this.mode = 'save';
            this.user = {};
            this.loadUsers();
        },
        save() {
            const method = this.user.id ? 'put' : 'post';
            const id = this.user.id ? `/${this.user.id}` : '';
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        remove() {
            const id = this.user.id;
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save') {
            this.mode = mode;
            this.user = { ...user };
        }
    },
    watch: {
        page() {
            this.loadUsers();
        }
    }
}
</script>
