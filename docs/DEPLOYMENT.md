# FAA.Zone Deployment Guide

## Overview
This document provides comprehensive instructions for deploying and maintaining the faa.zone Jekyll site on GitHub Pages.

## Quick Start

### Prerequisites
- Git installed
- GitHub account with access to the repository
- (Optional) Ruby and Jekyll for local testing

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/heyns1000/faa.zone.git
   cd faa.zone
   ```

2. **Install dependencies (optional, for local testing):**
   ```bash
   cd docs
   bundle install
   ```

3. **Run Jekyll locally:**
   ```bash
   bundle exec jekyll serve
   ```
   
   Visit `http://localhost:4000/faa.zone` in your browser.

## Directory Structure

```
faa.zone/
├── .github/
│   └── workflows/
│       └── jekyll.yml          # GitHub Actions workflow
├── docs/                        # Jekyll site root
│   ├── _config.yml             # Jekyll configuration
│   ├── _layouts/               # Page layouts
│   │   └── default.html
│   ├── _includes/              # Reusable components
│   ├── _data/                  # Data files
│   ├── assets/
│   │   └── css/
│   │       └── style.scss      # Main stylesheet
│   ├── index.md                # Homepage
│   ├── 404.html                # Error page
│   └── Gemfile                 # Ruby dependencies
├── .gitignore
└── README.md
```

## GitHub Pages Configuration

### Setting Up GitHub Pages

1. **Navigate to Repository Settings:**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" section

2. **Configure Source:**
   - **Source:** GitHub Actions
   - The custom workflow `.github/workflows/jekyll.yml` will handle the build and deployment

3. **Build and Deploy:**
   - Push changes to the `main` branch
   - GitHub Actions will automatically build and deploy your site
   - Monitor the deployment in the "Actions" tab

### Custom Domain (Optional)

If you want to use a custom domain:

1. Create a `CNAME` file in the `docs/` directory:
   ```bash
   echo "faa.zone" > docs/CNAME
   ```

2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `heyns1000.github.io`
   - Or add A records pointing to GitHub Pages IPs

3. Update `_config.yml`:
   ```yaml
   url: "https://faa.zone"
   baseurl: ""
   ```

## Troubleshooting

### Build Failures

**Issue:** Jekyll build fails with "No such file or directory @ dir_chdir0 - /github/workspace/docs"

**Solution:**
- Ensure the `docs/` directory exists
- Verify `docs/_config.yml` is present
- Check that `docs/assets/css/style.scss` exists

**Issue:** SCSS compilation errors

**Solution:**
- Verify SCSS syntax in `style.scss`
- Ensure the file starts with front matter (`---`)
- Check that the theme import is correct

### Common Errors

1. **404 errors on assets:**
   - Check `baseurl` in `_config.yml`
   - Ensure asset paths use `{{ "/assets/..." | relative_url }}`

2. **Theme not loading:**
   - Verify `remote_theme` or `theme` in `_config.yml`
   - Check that `jekyll-remote-theme` plugin is included

3. **Pages not updating:**
   - Clear browser cache
   - Check GitHub Actions for deployment status
   - Wait a few minutes for propagation

## Deployment Checklist

Before deploying to production:

- [ ] Test locally with `bundle exec jekyll serve`
- [ ] Verify all links work
- [ ] Check that images load correctly
- [ ] Review generated HTML
- [ ] Test on multiple browsers
- [ ] Validate HTML and CSS
- [ ] Check mobile responsiveness
- [ ] Review security headers
- [ ] Test 404 page
- [ ] Verify sitemap.xml generates

## Rollback Procedures

If a deployment fails:

1. **Revert to previous commit:**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Manual rollback:**
   - Navigate to Actions tab
   - Select a previous successful deployment
   - Re-run the workflow

3. **Force rebuild:**
   ```bash
   git commit --allow-empty -m "Trigger rebuild"
   git push origin main
   ```

## Maintenance

### Regular Tasks

- **Weekly:** Review GitHub Actions logs
- **Monthly:** Update dependencies (`bundle update`)
- **Quarterly:** Review and update documentation

### Monitoring

Monitor your site using:
- GitHub Actions dashboard
- Google Search Console
- Website uptime monitors
- Analytics platforms

## Security

### Best Practices

1. **Dependencies:**
   - Keep Jekyll and plugins updated
   - Review Dependabot alerts
   - Use `bundle audit` to check for vulnerabilities

2. **Content Security:**
   - Validate all user-generated content
   - Use HTTPS only
   - Implement CSP headers if needed

3. **Access Control:**
   - Limit repository access
   - Use branch protection rules
   - Enable 2FA for all contributors

## Support

### Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Primer Theme](https://github.com/pages-themes/primer)

### Getting Help

1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Search existing GitHub issues
4. Create a new issue with:
   - Error messages
   - Steps to reproduce
   - Environment details

## License

Copyright © 2024 FAA.Zone. All rights reserved.
