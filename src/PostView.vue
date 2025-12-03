<template>
	<div class="post">
		<nav class="nav">
			<a href="#" @click.prevent="$emit('back')">← Back to Home</a>
		</nav>

		<article>
			<h1>{{ post.title }}</h1>
			<div class="post-date">{{ formatDate(post.date) }}</div>
			<!-- HTML is safe: sanitized by marked during build, not user input -->
			<div v-html="post.content"></div>
		</article>
	</div>
</template>

<script>
import { formatDate } from './utils.js';

export default {
	name: "PostView",
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
	methods: {
		formatDate,
	},
};
</script>

