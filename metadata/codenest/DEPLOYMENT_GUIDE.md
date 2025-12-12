# HotStack Admin Dashboard - Deployment Guide

Complete guide for deploying the HotStack Admin Dashboard to production.

## Prerequisites

- Cloudflare account with Workers enabled
- Wrangler CLI installed: `npm install -g wrangler`
- Domain configured: `faa.zone` (or your custom domain)
- Git repository access

## Backend API Deployment

### Step 1: Install Dependencies

```bash
cd hotstack-backend
npm install
```

### Step 2: Authenticate with Cloudflare

```bash
wrangler login
```

### Step 3: Configure wrangler.toml

Verify the configuration in `wrangler.toml`:

```toml
name = "hotstack-backend-api"
main = "src/index.js"
compatibility_date = "2024-12-11"
workers_dev = true

[env.production]
name = "hotstack-backend-api"
routes = [
  { pattern = "hotstack.faa.zone/api/*", zone_name = "faa.zone" }
]
```

### Step 4: Deploy Backend

```bash
# Deploy to development
wrangler deploy

# Deploy to production
wrangler deploy --env production
```

### Step 5: Verify Backend Deployment

Test the API endpoints:

```bash
# Test health endpoint
curl https://hotstack.faa.zone/api/health

# Test status endpoint
curl https://hotstack.faa.zone/api/status

# Test ecosystem endpoint
curl https://hotstack.faa.zone/api/ecosystem
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "health": {...}
}
```

## Frontend Dashboard Deployment

### Option 1: Deploy to Cloudflare Pages

#### Step 1: Initialize Cloudflare Pages

```bash
cd hotstack-dashboard
wrangler pages project create hotstack-dashboard
```

#### Step 2: Deploy

```bash
wrangler pages deploy . --project-name=hotstack-dashboard
```

#### Step 3: Configure Custom Domain

In Cloudflare Dashboard:
1. Go to Pages → hotstack-dashboard
2. Click "Custom domains"
3. Add domain: `hotstack.faa.zone/dashboard`

### Option 2: Deploy to HotStack Worker

#### Step 1: Copy Dashboard to HotStack

```bash
# From codenest root
mkdir -p repos/hotstack/public/dashboard
cp -r hotstack-dashboard/* repos/hotstack/public/dashboard/
```

#### Step 2: Update HotStack Worker

Add route handling in `repos/hotstack/src/index.js`:

```javascript
// Serve dashboard
if (url.pathname.startsWith('/dashboard')) {
  return env.ASSETS.fetch(request);
}
```

#### Step 3: Deploy HotStack

```bash
cd repos/hotstack
wrangler deploy
```

### Option 3: Deploy as Static Site

#### Using Nginx

```nginx
server {
    listen 80;
    server_name hotstack.faa.zone;

    location /dashboard {
        root /var/www/hotstack;
        index index.html;
        try_files $uri $uri/ /dashboard/index.html;
    }

    location /api {
        proxy_pass https://hotstack-backend-api.your-subdomain.workers.dev;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## DNS Configuration

### Add DNS Records

In Cloudflare DNS:

1. **A Record** (if using static hosting):
   - Name: `hotstack.faa.zone`
   - Value: Your server IP
   - Proxy: Enabled

2. **CNAME Record** (if using Workers/Pages):
   - Name: `hotstack`
   - Value: `hotstack-backend-api.workers.dev`
   - Proxy: Enabled

## Environment Configuration

### Backend Configuration

Edit `hotstack-backend/config.json` for production:

```json
{
  "api": {
    "corsOrigins": [
      "https://hotstack.faa.zone",
      "https://fruitful.faa.zone"
    ]
  },
  "buildnestOrchestrator": {
    "url": "https://buildnest-orchestrator.heynsschoeman.workers.dev"
  }
}
```

### Frontend Configuration

Edit `hotstack-dashboard/config.js`:

```javascript
const DASHBOARD_CONFIG = {
  api: {
    baseUrl: 'https://hotstack.faa.zone',
  },
  vaultMesh: {
    pulseInterval: 9000,
    enabled: true,
  }
};
```

## Post-Deployment Verification

### 1. Test Backend API

```bash
# Health check
curl https://hotstack.faa.zone/api/health

# Get stats
curl https://hotstack.faa.zone/api/stats

# Get repositories
curl "https://hotstack.faa.zone/api/repositories?sector=finance&page=1"
```

### 2. Test Dashboard UI

1. Open in browser: `https://hotstack.faa.zone/dashboard`
2. Verify all tabs load correctly:
   - Overview tab shows statistics
   - Sectors tab displays 6 sectors
   - Repositories tab shows all 87 repositories
   - Deploy & Build tab forms are functional
   - Analytics tab displays charts
   - Monitoring tab shows system status
3. Test search and filters
4. Test deploy/incubate buttons
5. Verify VaultMesh pulse indicator is active

### 3. Test Real-Time Updates

1. Open browser console
2. Watch for VaultMesh pulse updates every 9 seconds
3. Verify stats update automatically

### 4. Test Mobile Responsiveness

1. Open on mobile device or use browser dev tools
2. Verify all elements are properly sized
3. Test navigation and buttons
4. Verify forms work correctly

## Monitoring & Maintenance

### Cloudflare Analytics

Monitor usage in Cloudflare Dashboard:
- Workers → hotstack-backend-api → Analytics
- Pages → hotstack-dashboard → Analytics

### Error Monitoring

Check Cloudflare Workers logs:
```bash
wrangler tail hotstack-backend-api
```

### Performance Monitoring

Monitor key metrics:
- API response time (target: <500ms)
- Dashboard load time (target: <2s)
- Cache hit rate
- Error rate

### Regular Maintenance

1. **Weekly**:
   - Review error logs
   - Check API response times
   - Verify VaultMesh pulse is active

2. **Monthly**:
   - Review analytics
   - Update dependencies
   - Check for security updates

3. **Quarterly**:
   - Performance optimization
   - Feature enhancements
   - User feedback review

## Rollback Procedure

If deployment fails or issues arise:

### Backend Rollback

```bash
# List deployments
wrangler deployments list

# Rollback to previous version
wrangler rollback --message "Rollback to previous version"
```

### Frontend Rollback

```bash
# For Cloudflare Pages
wrangler pages deployment list --project-name=hotstack-dashboard

# Rollback to specific deployment
wrangler pages deployment rollback <deployment-id>
```

## Troubleshooting

### Backend API not responding

1. Check Cloudflare Workers status
2. Verify DNS configuration
3. Check worker logs: `wrangler tail`
4. Test direct worker URL

### Dashboard not loading

1. Check browser console for errors
2. Verify API endpoint in config.js
3. Check CORS configuration
4. Clear browser cache

### CORS errors

1. Verify CORS_HEADERS in backend src/index.js
2. Check origin is in allowed list
3. Test with OPTIONS request

### Real-time updates not working

1. Check VaultMesh configuration
2. Verify polling interval (9 seconds)
3. Check browser console for errors
4. Test API endpoints manually

## Security Considerations

### Production Security

1. **API Rate Limiting**: Implement rate limiting in backend
2. **Authentication**: Enable API key authentication if needed
3. **HTTPS Only**: Ensure all traffic uses HTTPS
4. **Content Security Policy**: Add CSP headers
5. **Input Validation**: Validate all user inputs

### Cloudflare Security Features

Enable in Cloudflare Dashboard:
- **WAF (Web Application Firewall)**
- **DDoS Protection**
- **Rate Limiting Rules**
- **Bot Fight Mode**

## Support & Resources

- **Backend README**: `/hotstack-backend/README.md`
- **Dashboard README**: `/hotstack-dashboard/README.md`
- **HotStack Documentation**: `/repos/hotstack/README.md`
- **Wrangler Documentation**: https://developers.cloudflare.com/workers/wrangler/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/

## Deployment Checklist

- [ ] Backend API deployed to Cloudflare Workers
- [ ] Dashboard deployed to production
- [ ] DNS records configured
- [ ] CORS properly configured
- [ ] All API endpoints tested
- [ ] Dashboard UI tested
- [ ] Mobile responsiveness verified
- [ ] Real-time updates working
- [ ] VaultMesh pulse active
- [ ] Error monitoring enabled
- [ ] Analytics configured
- [ ] Security features enabled
- [ ] Documentation updated
- [ ] Team notified

---

**瓷勺旋渦已築，脈買已通！** 🦍🔥
