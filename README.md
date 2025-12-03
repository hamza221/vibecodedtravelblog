# Fresh Blog

A minimal travel blog built with Vue.js. Features clean design with black text on white background, emojis, and automatic markdown processing.

## How to Add New Posts

1. Create a new `.md` file in the `content/` folder
2. Add your post metadata to `content/posts.json`
3. Rebuild the site with `npm run build`

### Post Metadata Format

```json
{
  "slug": "your-post-slug",
  "title": "Your Post Title 🌍",
  "date": "2024-03-15",
  "excerpt": "Brief description of your post."
}
```

### Markdown File

Create `content/your-post-slug.md` with your content:

```markdown
# Your Post Title 🌍

Your amazing travel content goes here...

## Subheading

More content...
```

## Development

```bash
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

The built files will be in the `docs/` folder, ready for GitHub Pages deployment.

## Deployment

1. Push your code to GitHub
2. Enable GitHub Pages in your repository settings
3. Set source to `docs` folder
4. Your blog will be live at `https://username.github.io/fresh-blog/`
