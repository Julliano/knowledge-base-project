<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="Volpato's Blog" :hideToggle="!user" :hideUserDropdown="!user" />
		<Menu v-if="user" />
		<Content />
		<Footer />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/template/Header';
import Menu from './components/template/Menu';
import Footer from './components/template/Footer';
import Content from './components/template/Content';

export default {
	name: "App",
	components: {
		Menu,
		Header,
		Footer,
		Content
	},
	computed: mapState(['isMenuVisible', 'user'])
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}
	body {
		margin: 0;
	}
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}
	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>