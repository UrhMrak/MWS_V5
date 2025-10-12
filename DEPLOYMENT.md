# Deployment Guide for GitHub Pages

This guide will help you deploy your portfolio website to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Your code pushed to a GitHub repository

## Deployment Steps

### 1. Push to GitHub

First, make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site when you push to main branch

### 3. Access Your Site

Your site will be available at:
`https://yourusername.github.io/MWS_V5`

Replace `yourusername` with your actual GitHub username.

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the project
npm run deploy

# The files will be generated in the 'out' directory
# You can then manually upload these to GitHub Pages
```

## Configuration Details

- **Static Export**: The site is configured for static export
- **Base Path**: Set to `/MWS_V5` for GitHub Pages
- **Image Optimization**: Disabled for static export
- **Trailing Slashes**: Enabled for GitHub Pages compatibility

## Troubleshooting

### Images Not Loading

- Make sure all images are in the `public/images/` directory
- Check that image paths use relative URLs

### 404 Errors

- Ensure `trailingSlash: true` is set in next.config.js
- Check that all internal links use relative paths

### Build Failures

- Run `npm run lint` to check for any linting errors
- Ensure all dependencies are properly installed with `npm ci`

## Custom Domain (Optional)

To use a custom domain:

1. Add your domain to the `cname` field in `.github/workflows/deploy.yml`
2. Create a `CNAME` file in your `public` directory with your domain name
3. Configure DNS settings with your domain provider

## Local Development

To test the production build locally:

```bash
npm run export
npx serve out
```

This will serve the static files locally so you can test the production build.
