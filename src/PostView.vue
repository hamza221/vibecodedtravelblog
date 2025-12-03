<template>
	<div class="post">
		<nav class="nav">
			<a href="#" @click.prevent="$emit('back')">← Back to Home</a>
		</nav>

		<article>
			<h1>{{ post.title }}</h1>
			<div class="post-date">{{ formatDate(post.date) }}</div>
			<div v-html="renderedContent"></div>
		</article>
	</div>
</template>

<script>
import { marked } from "marked";

export default {
	name: "PostView",
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
	computed: {
		renderedContent() {
			return marked(this.post.content);
		},
	},
	methods: {
		formatDate(dateString) {
			const options = { year: "numeric", month: "long", day: "numeric" };
			return new Date(dateString).toLocaleDateString(undefined, options);
		},
	},
};
</script>
