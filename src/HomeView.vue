<template>
	<div>
		<h1>Fresh Blog ✈️</h1>
		<p>A minimal travel blog about adventures around the world.</p>

		<ul class="post-list">
			<li v-for="post in posts" :key="post.slug" class="post-item">
				<h2 class="post-title">
					<a href="#" @click.prevent="$emit('view-post', post.slug)">
						{{ post.title }}
					</a>
				</h2>
				<div class="post-date">{{ formatDate(post.date) }}</div>
				<div class="post-excerpt">{{ post.excerpt }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { formatDate } from './utils.js';

export default {
	name: "HomeView",
	props: {
		posts: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		formatDate,
	},
};
</script>
