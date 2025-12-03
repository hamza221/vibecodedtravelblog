import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentDir = join(__dirname, 'public', 'content');
const postsJsonPath = join(__dirname, 'src', 'data', 'posts.json');

try {
  // Read the posts metadata
  let postsJson;
  try {
    postsJson = JSON.parse(readFileSync(postsJsonPath, 'utf-8'));
  } catch (error) {
    console.error(`Error reading posts.json: ${error.message}`);
    process.exit(1);
  }

  // Process each post: read markdown and convert to HTML
  const postsWithHtml = postsJson.map((post) => {
    const markdownPath = join(contentDir, `${post.slug}.md`);
    let markdown;
    try {
      markdown = readFileSync(markdownPath, 'utf-8');
    } catch (error) {
      console.error(`Error reading ${post.slug}.md: ${error.message}`);
      process.exit(1);
    }

    const html = marked(markdown);

    return {
      ...post,
      content: html,
    };
  });

  // Write the new posts.json with HTML content
  try {
    writeFileSync(postsJsonPath, JSON.stringify(postsWithHtml, null, 2));
  } catch (error) {
    console.error(`Error writing posts.json: ${error.message}`);
    process.exit(1);
  }

  console.log(`✓ Processed ${postsWithHtml.length} posts and generated HTML content`);
} catch (error) {
  console.error(`Unexpected error during build: ${error.message}`);
  process.exit(1);
}

