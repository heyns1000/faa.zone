# FAA.Zone Troubleshooting Guide

## Table of Contents
1. [Jekyll Build Failures](#jekyll-build-failures)
2. [GitHub Actions Issues](#github-actions-issues)
3. [Asset Loading Problems](#asset-loading-problems)
4. [Theme Issues](#theme-issues)
5. [Local Development Issues](#local-development-issues)
6. [Deployment Issues](#deployment-issues)

## Jekyll Build Failures

### Error: "No such file or directory @ dir_chdir0"

**Symptoms:**
```
Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss':
No such file or directory @ dir_chdir0 - /github/workspace/docs
```

**Cause:** The `/docs` directory doesn't exist or Jekyll is looking in the wrong place.

**Solutions:**
1. Verify the `docs/` directory exists:
   ```bash
   ls -la docs/
   ```

2. Check GitHub Actions workflow configuration:
   ```yaml
   - name: Build with Jekyll
     uses: actions/jekyll-build-pages@v1
     with:
       source: ./docs  # Must match your structure
       destination: ./docs/_site
   ```

3. Ensure required files exist:
   - `docs/_config.yml`
   - `docs/index.md` or `docs/index.html`
   - `docs/assets/css/style.scss`

### Error: "Invalid SCSS"

**Symptoms:**
```
Conversion error: Jekyll::Converters::Scss encountered an error
```

**Cause:** SCSS syntax error or missing front matter.

**Solutions:**
1. Ensure `style.scss` starts with front matter:
   ```scss
   ---
   ---
   
   @import "{{ site.theme }}";
   ```

2. Validate SCSS syntax
3. Check for missing semicolons or braces

### Error: "Theme could not be found"

**Symptoms:**
```
Theme 'jekyll-theme-primer' could not be found
```

**Solutions:**
1. Use `remote_theme` instead:
   ```yaml
   remote_theme: pages-themes/primer@v0.6.0
   plugins:
     - jekyll-remote-theme
   ```

2. Or install the theme locally in Gemfile

## GitHub Actions Issues

### Workflow Not Triggering

**Symptoms:** Changes pushed but no workflow runs appear.

**Solutions:**
1. Check workflow file location: `.github/workflows/jekyll.yml`
2. Verify branch name in workflow matches push:
   ```yaml
   on:
     push:
       branches: ["main"]  # Check your branch name
   ```
3. Check repository Actions settings are enabled

### Permission Denied Errors

**Symptoms:**
```
Error: Resource not accessible by integration
```

**Solutions:**
1. Update workflow permissions:
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

2. Check repository Settings > Actions > General > Workflow permissions

### Artifact Upload Failed

**Symptoms:**
```
Error: Unable to upload artifact
```

**Solutions:**
1. Verify the build completed successfully
2. Check the destination path exists
3. Ensure artifact size is under GitHub limits (2GB)

## Asset Loading Problems

### CSS Not Loading

**Symptoms:** Site displays without styling.

**Solutions:**
1. Check `baseurl` in `_config.yml`:
   ```yaml
   baseurl: "/faa.zone"  # For project pages
   # OR
   baseurl: ""           # For custom domain
   ```

2. Use proper asset paths:
   ```html
   <link rel="stylesheet" href="{{ "/assets/css/style.css" | relative_url }}">
   ```

3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Images Not Loading

**Symptoms:** Broken image links.

**Solutions:**
1. Verify image paths:
   ```markdown
   ![Alt text]({{ "/images/pic.png" | relative_url }})
   ```

2. Check image files are committed to repository
3. Verify image paths are relative to site root

### 404 on Assets

**Symptoms:** Browser shows 404 errors for CSS/JS/images.

**Solutions:**
1. Check GitHub Pages is serving from correct folder
2. Verify `_config.yml` settings match GitHub Pages configuration
3. Ensure files aren't in `.gitignore`

## Theme Issues

### Theme Not Applied

**Symptoms:** Site looks unstyled or shows default HTML.

**Solutions:**
1. Check `_config.yml` theme configuration:
   ```yaml
   theme: jekyll-theme-primer
   # OR
   remote_theme: pages-themes/primer@v0.6.0
   ```

2. Verify plugin is loaded:
   ```yaml
   plugins:
     - jekyll-remote-theme
   ```

3. Ensure internet connection for remote themes

### Theme Customization Not Working

**Symptoms:** Custom CSS doesn't override theme.

**Solutions:**
1. Ensure `style.scss` imports theme first:
   ```scss
   ---
   ---
   
   @import "{{ site.theme }}";
   
   /* Your custom styles here */
   ```

2. Use more specific CSS selectors
3. Check browser DevTools for CSS conflicts

## Local Development Issues

### Bundle Install Fails

**Symptoms:**
```
An error occurred while installing gem
```

**Solutions:**
1. Update bundler:
   ```bash
   gem install bundler
   ```

2. Update Ruby (minimum 2.7.0)
3. Clear bundle cache:
   ```bash
   bundle clean --force
   bundle install
   ```

### Jekyll Serve Won't Start

**Symptoms:**
```
jekyll serve fails to start
```

**Solutions:**
1. Check port 4000 isn't in use:
   ```bash
   lsof -i :4000
   # Kill process if needed
   kill -9 <PID>
   ```

2. Try different port:
   ```bash
   bundle exec jekyll serve --port 4001
   ```

3. Check for syntax errors in `_config.yml`

### Changes Not Reflecting Locally

**Symptoms:** Updated content doesn't appear when viewing locally.

**Solutions:**
1. Restart Jekyll with `--force_polling`:
   ```bash
   bundle exec jekyll serve --force_polling
   ```

2. Clear Jekyll cache:
   ```bash
   rm -rf .jekyll-cache _site
   ```

3. Hard refresh browser (Ctrl+Shift+R)

## Deployment Issues

### Site Not Updating

**Symptoms:** Changes pushed but site doesn't update.

**Solutions:**
1. Check GitHub Actions completed successfully
2. Wait 5-10 minutes for CDN propagation
3. Clear browser cache
4. Check if GitHub Pages is enabled in repository settings

### Wrong Version Deployed

**Symptoms:** Old version of site is live.

**Solutions:**
1. Verify correct branch is configured in Settings > Pages
2. Check latest workflow run succeeded
3. Force re-deploy:
   ```bash
   git commit --allow-empty -m "Force rebuild"
   git push
   ```

### Custom Domain Not Working

**Symptoms:** Custom domain shows 404 or doesn't resolve.

**Solutions:**
1. Verify DNS records are correct:
   - CNAME pointing to `<username>.github.io`
   - Or A records to GitHub Pages IPs

2. Check `CNAME` file exists in `docs/`:
   ```bash
   cat docs/CNAME
   ```

3. Update `_config.yml`:
   ```yaml
   url: "https://yourdomain.com"
   baseurl: ""
   ```

4. Wait up to 24 hours for DNS propagation

## Getting Additional Help

If you're still experiencing issues:

1. **Check Logs:**
   - GitHub Actions logs (Actions tab)
   - Jekyll build output (`bundle exec jekyll build --verbose`)
   - Browser console (F12)

2. **Verify Configuration:**
   - Run `bundle exec jekyll doctor` locally
   - Validate YAML syntax
   - Check file permissions

3. **Search Resources:**
   - [Jekyll Troubleshooting](https://jekyllrb.com/docs/troubleshooting/)
   - [GitHub Pages Documentation](https://docs.github.com/en/pages)
   - Stack Overflow with `jekyll` tag

4. **Create an Issue:**
   Include:
   - Full error messages
   - Steps to reproduce
   - Workflow/build logs
   - Environment details (Ruby version, OS, etc.)

## Prevention Tips

- Test changes locally before pushing
- Use `.gitignore` to exclude build artifacts
- Keep dependencies updated
- Review GitHub Actions logs regularly
- Use branch protection and PR reviews
- Maintain documentation
- Back up important content
- Monitor site uptime

## Emergency Procedures

### Site is Down

1. Check GitHub Status: https://www.githubstatus.com/
2. Verify GitHub Actions status
3. Check for failed deployments
4. Rollback to last known good commit:
   ```bash
   git revert HEAD
   git push
   ```

### Build Breaking Changes

1. Don't panic - Git has your back!
2. Review recent changes:
   ```bash
   git log --oneline -10
   ```
3. Identify the breaking commit
4. Revert or fix the issue
5. Test locally before pushing fix

### Accidental Data Loss

1. Check Git history:
   ```bash
   git log --all --full-history -- path/to/file
   ```
2. Restore from commit:
   ```bash
   git checkout <commit-hash> -- path/to/file
   ```
3. Or use GitHub's file history viewer

---

**Last Updated:** 2024-12-11  
**Maintained by:** FAA.Zone Team
