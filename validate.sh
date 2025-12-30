#!/bin/bash

# FAA.Zone Pre-Deployment Validation Script
# Run this script before pushing changes to verify basic setup
# Make executable with: chmod +x validate.sh

set -e

echo "🚀 FAA.Zone Pre-Deployment Validation"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0
CHECKS=0

# Function to check if a file exists
check_file() {
    CHECKS=$((CHECKS + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is missing"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Function to check if a directory exists
check_dir() {
    CHECKS=$((CHECKS + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 directory exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 directory is missing"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Function to check YAML syntax
check_yaml() {
    CHECKS=$((CHECKS + 1))
    if command -v ruby &> /dev/null; then
        if ruby -ryaml -e "YAML.load_file('$1')" 2>/dev/null; then
            echo -e "${GREEN}✓${NC} $1 is valid YAML"
            return 0
        else
            echo -e "${RED}✗${NC} $1 has YAML syntax errors"
            ERRORS=$((ERRORS + 1))
            return 1
        fi
    else
        echo -e "${YELLOW}⚠${NC} Ruby not available, skipping YAML validation for $1"
        WARNINGS=$((WARNINGS + 1))
        return 0
    fi
}

# Change to script directory
cd "$(dirname "$0")"

echo "📁 Checking directory structure..."
echo ""

# Check critical directories
check_dir "docs"
check_dir "docs/_layouts"
check_dir "docs/_includes"
check_dir "docs/assets"
check_dir "docs/assets/css"
check_dir ".github"
check_dir ".github/workflows"

echo ""
echo "📄 Checking critical files..."
echo ""

# Check essential files
check_file "docs/_config.yml"
check_file "docs/index.md"
check_file "docs/assets/css/style.scss"
check_file "docs/_layouts/default.html"
check_file "docs/404.html"
check_file ".github/workflows/jekyll.yml"
check_file ".gitignore"

echo ""
echo "✅ Checking file content..."
echo ""

# Check YAML files
if [ -f "docs/_config.yml" ]; then
    check_yaml "docs/_config.yml"
fi

if [ -f ".github/workflows/jekyll.yml" ]; then
    check_yaml ".github/workflows/jekyll.yml"
fi

# Check that style.scss has front matter
CHECKS=$((CHECKS + 1))
if [ -f "docs/assets/css/style.scss" ]; then
    if head -n 1 "docs/assets/css/style.scss" | grep -q "^---$"; then
        echo -e "${GREEN}✓${NC} style.scss has front matter"
    else
        echo -e "${RED}✗${NC} style.scss is missing front matter (---)"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Check that index.md has front matter
CHECKS=$((CHECKS + 1))
if [ -f "docs/index.md" ]; then
    if head -n 1 "docs/index.md" | grep -q "^---$"; then
        echo -e "${GREEN}✓${NC} index.md has front matter"
    else
        echo -e "${RED}✗${NC} index.md is missing front matter (---)"
        ERRORS=$((ERRORS + 1))
    fi
fi

echo ""
echo "🔍 Optional checks..."
echo ""

# Check for recommended files
CHECKS=$((CHECKS + 1))
if [ -f "docs/Gemfile" ]; then
    echo -e "${GREEN}✓${NC} Gemfile exists for local testing"
else
    echo -e "${YELLOW}⚠${NC} Gemfile not found (optional but recommended)"
    WARNINGS=$((WARNINGS + 1))
fi

CHECKS=$((CHECKS + 1))
if [ -f "docs/README.md" ]; then
    echo -e "${GREEN}✓${NC} README.md exists in docs"
else
    echo -e "${YELLOW}⚠${NC} README.md not found in docs"
    WARNINGS=$((WARNINGS + 1))
fi

CHECKS=$((CHECKS + 1))
if [ -f "docs/robots.txt" ]; then
    echo -e "${GREEN}✓${NC} robots.txt exists"
else
    echo -e "${YELLOW}⚠${NC} robots.txt not found (optional)"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "======================================"
echo "📊 Validation Summary"
echo "======================================"
echo "Total checks: $CHECKS"
echo -e "${GREEN}Passed: $((CHECKS - ERRORS - WARNINGS))${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo -e "${RED}Errors: $ERRORS${NC}"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    echo ""
    echo "You can now:"
    echo "  1. Test locally: cd docs && bundle exec jekyll serve"
    echo "  2. Push to GitHub: git push origin main"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Validation failed with $ERRORS error(s)${NC}"
    echo ""
    echo "Please fix the errors above before deploying."
    echo ""
    exit 1
fi
