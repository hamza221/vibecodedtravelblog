<template>
	<div id="app" :class="{ 'dark-mode': isDarkMode }">
		<nav class="nav">
			<a href="/" class="home-link">Fresh Blog ✈️</a>
			<button
				@click="toggleDarkMode"
				class="theme-toggle"
				:aria-label="
					isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
				"
			>
				{{ isDarkMode ? "☀️" : "🌙" }}
			</button>
		</nav>
		<HomeView
			v-if="currentView === 'home'"
			:posts="posts"
			@view-post="viewPost"
		/>
		<PostView
			v-else-if="currentView === 'post'"
			:post="currentPost"
			@back="currentView = 'home'"
		/>
	</div>
</template>

<script>
import HomeView from "./HomeView.vue";
import PostView from "./PostView.vue";
import { getPosts, getPostBySlug } from "./posts.js";

export default {
	name: "App",
	components: {
		HomeView,
		PostView,
	},
	data() {
		return {
			currentView: "home",
			currentPost: null,
			posts: getPosts(),
			isDarkMode: false,
		};
	},
	mounted() {
		// Load dark mode preference from localStorage
		const savedTheme = localStorage.getItem("theme");
		this.isDarkMode = savedTheme === "dark";
		this.applyDarkMode();
	},
	methods: {
		applyDarkMode() {
			if (this.isDarkMode) {
				document.documentElement.classList.add("dark-mode");
			} else {
				document.documentElement.classList.remove("dark-mode");
			}
		},
		viewPost(slug) {
			const post = getPostBySlug(slug);
			if (post) {
				this.currentPost = post;
				this.currentView = "post";
			}
		},
		toggleDarkMode() {
			this.isDarkMode = !this.isDarkMode;
			localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
			this.applyDarkMode();
		},
	},
};
</script>
