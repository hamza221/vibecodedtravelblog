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
			posts: [],
			isDarkMode: false,
		};
	},
	async mounted() {
		await this.loadPosts();
		// Load dark mode preference from localStorage
		const savedTheme = localStorage.getItem("theme");
		this.isDarkMode = savedTheme === "dark";
	},
	methods: {
		async loadPosts() {
			try {
				const response = await fetch(
					`${import.meta.env.BASE_URL}content/posts.json`,
				);
				this.posts = await response.json();
			} catch (error) {
				console.error("Error loading posts:", error);
			}
		},
		async viewPost(slug) {
			try {
				const response = await fetch(
					`${import.meta.env.BASE_URL}content/${slug}.md`,
				);
				const markdown = await response.text();
				const post = this.posts.find((p) => p.slug === slug);
				this.currentPost = { ...post, content: markdown };
				this.currentView = "post";
			} catch (error) {
				console.error("Error loading post:", error);
			}
		},
		toggleDarkMode() {
			this.isDarkMode = !this.isDarkMode;
			localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
		},
	},
};
</script>

<style>
* {
	transition: background-color 0.3s ease, color 0.3s ease;
}

body {
	width: 100vw;
	margin: 0;
	padding: 0;
}

#app {
	min-height: 100vh;
}

body:has(#app.dark-mode) {
	background-color: #1a1a1a;
	color: #e0e0e0;
}

.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	margin-bottom: 2rem;
	border-bottom: 1px solid #e0e0e0;
}

.dark-mode .nav {
	border-bottom-color: #404040;
}

.theme-toggle {
	background: none;
	border: 2px solid #ccc;
	border-radius: 50%;
	width: 48px;
	height: 48px;
	font-size: 24px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	padding: 0;
}

.theme-toggle:hover {
	transform: scale(1.1);
	border-color: #999;
}

.dark-mode .theme-toggle {
	border-color: #666;
}

.dark-mode .theme-toggle:hover {
	border-color: #888;
}

/* Dark mode styles */
.dark-mode {
	background-color: #1a1a1a;
	color: #e0e0e0;
}

.dark-mode a {
	color: #64b5f6;
}

.dark-mode a:hover {
	color: #90caf9;
}

.dark-mode .home-link {
	color: #e0e0e0;
}

.dark-mode .home-link:hover {
	color: #fff;
}
</style>
