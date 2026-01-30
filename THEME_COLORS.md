# Theme Colors Documentation

This document provides a comprehensive overview of all colors and gradients used throughout the CES Solar Shop website. Use this as a reference when making theme changes.

---

## 📋 Table of Contents

1. [SCSS Variables](#scss-variables)
2. [Gradient Colors](#gradient-colors)
3. [Solid Colors](#solid-colors)
4. [Usage Locations](#usage-locations)
5. [Theme Change Guide](#theme-change-guide)

---

## 🎨 SCSS Variables

**File:** `src/styles/variables.scss`

These are the main theme variables that should be updated for global theme changes:

```scss
$body-font: "AndersonGrotesk";
$heading-font: "Redaction";
$body-bg: #F8F8F8;              // Light gray background
$body-color: #000000;            // Black text
$muted-color: #909090;           // Gray muted text
$muted-color-1: #737373;         // Darker gray muted text

$primary-color: #3265EE;         // Primary blue color
$muted-border: #DADADA;          // Light gray border
$white-color: #FFF;              // White
$red-color: #C91010;             // Red (errors/alerts)
$gray-color: #E0E0E0;            // Light gray
$table-heading-color: #F0F0F0;   // Table header background
$tab-non-active-color: #999999;  // Inactive tab color
```

---

## 🌈 Gradient Colors

### Primary Blue/Cyan Gradients

These are the most commonly used gradients throughout the site:

#### 1. Light Blue Horizontal Gradient
```css
linear-gradient(to right, #83d4f2, #8fbcf2)
```
**Usage:**
- Survey buttons
- Form buttons
- Section backgrounds
- Modal buttons

**Files:**
- `src/styles/modulesStyles/survey.module.scss`
- `src/styles/global.scss`
- `src/styles/Pages/SixthSection.module.scss`
- `src/styles/Pages/FifthSection.module.scss`
- `src/components/modals/editRoofRestart/restartModal.module.scss`

---

#### 2. Blue Vertical Gradient (Buttons/CTAs)
```css
linear-gradient(#7ad2fa, #00b0ff)
```
**Usage:**
- Primary action buttons
- Call-to-action elements
- Modal submit buttons
- Form submit buttons

**Files:**
- `src/styles/modulesStyles/survey.module.scss`
- `src/styles/modulesStyles/contactus.module.scss`
- `src/styles/modulesStyles/thankyou.module.scss`
- `src/styles/modulesStyles/results.module.scss`
- `src/styles/modulesStyles/faq.module.scss`
- `src/styles/modulesStyles/cancellation.module.scss`
- `src/styles/modulesStyles/aboutus.module.scss`
- `src/styles/global.scss`
- `src/components/modals/directionsValidationModal/directionValidation.module.scss`
- `src/components/modals/addEditRoofModal/addEditRoof.module.scss`

---

#### 3. Cyan Background Gradient (Hero Section)
```css
linear-gradient(#7FDBFF, #60f2fe)
```
**Usage:**
- Hero section background blur effect
- Main banner decorative elements

**Files:**
- `src/styles/Pages/FirstSection.module.scss`
- `src/styles/global.scss`

---

#### 4. Light Blue Horizontal Variant
```css
linear-gradient(to right, #85cff2, #8fbcf2)
```
**Usage:**
- Alternative button styles
- Section backgrounds

**Files:**
- `src/styles/Pages/SixthSection.module.scss`
- `src/styles/Pages/FifthSection.module.scss`

---

#### 5. Radial Cyan Glow
```css
radial-gradient(circle at 50% 50%, #5dfdfe, #5dfdfe)
```
**Usage:**
- Hero section glow effects
- Decorative background elements

**Files:**
- `src/styles/Pages/FirstSection.module.scss`

---

### Hero Section Multi-Color Gradient

#### Main Hero Background
```css
linear-gradient(to top right, hsl(36, 100%, 70%), hsl(184, 45%, 90%), hsl(230, 80%, 49%))
```
**Colors:**
- Start: Yellow (`hsl(36, 100%, 70%)`)
- Middle: Light Cyan (`hsl(184, 45%, 90%)`)
- End: Blue (`hsl(230, 80%, 49%)`)

**Usage:**
- Main hero section background
- Homepage first section

**Files:**
- `src/components/homePageComponents/FirstSection.tsx`

---

### Pink/Red Gradients

#### Pink Horizontal Gradient
```css
linear-gradient(to right, #ffa8b3, #ff878b)
```
**Usage:**
- Product banner backgrounds
- Feature highlights
- Accent sections

**Files:**
- `src/styles/Pages/FourthSection.module.scss`
- `src/components/homePageComponents/FourthSection.tsx`

---

### Yellow/Gold Gradients

#### Yellow Horizontal Gradient
```css
linear-gradient(90deg, #f9b434, #ffe801)
```
**Usage:**
- Product highlights
- Special offers
- Promotional sections

**Files:**
- `src/styles/modulesStyles/products.module.scss`

---

### Dark Gradients (Headers)

#### Dark Brown to Black
```css
linear-gradient(90deg, #3d3a35 30%, #000000 70%)
```
**Usage:**
- Page headers
- Section headers
- Navigation backgrounds

**Files:**
- `src/styles/modulesStyles/contactus.module.scss`
- `src/styles/modulesStyles/thankyou.module.scss`
- `src/styles/modulesStyles/results.module.scss`
- `src/styles/modulesStyles/products.module.scss`
- `src/styles/modulesStyles/faq.module.scss`
- `src/styles/modulesStyles/cancellation.module.scss`
- `src/styles/modulesStyles/aboutus.module.scss`

---

### Section Background Gradients

#### Light Green Gradient
```css
linear-gradient(21deg, rgb(238, 248, 235) 0%, rgb(219, 241, 214) 100%)
```
**Usage:**
- Section backgrounds
- Card backgrounds

**Files:**
- `src/styles/modulesStyles/style.css`

---

#### Light Blue Gradient
```css
linear-gradient(21deg, rgb(247, 252, 255) 0%, rgb(230, 246, 255) 100%)
```
**Usage:**
- Section backgrounds
- Content areas

**Files:**
- `src/styles/modulesStyles/style.css`
- `src/styles/global.scss`

---

#### Light Purple Gradient
```css
linear-gradient(21deg, rgb(250, 247, 251) 0%, rgb(238, 228, 242) 100%)
```
**Usage:**
- Section backgrounds
- Feature sections

**Files:**
- `src/styles/modulesStyles/style.css`
- `src/styles/global.scss`

---

#### Light Yellow/Cream Gradient
```css
linear-gradient(21deg, rgb(255, 253, 248) 0%, rgb(255, 249, 232) 100%)
```
**Usage:**
- Section backgrounds
- Highlight sections

**Files:**
- `src/styles/modulesStyles/style.css`
- `src/styles/global.scss`

---

### Conic Gradients

#### Circular/Conic Gradients
```css
conic-gradient(from 240deg at 50% 50%, ...)
conic-gradient(from 300deg at 50% 50%, ...)
```
**Usage:**
- Decorative elements
- Special effects
- Loading indicators

**Files:**
- `src/styles/global.scss`

---

## 🎨 Solid Colors

### Primary Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Blue | `#3265EE` | Main brand color, links, primary buttons |
| Dark Blue | `#051b2f` | Headings, text, secondary elements |
| Dark Purple | `#180048` | Headings, accents |

### Background Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Body Background | `#F8F8F8` | Main page background |
| White | `#FFF` | Cards, containers, text on dark backgrounds |
| Light Gray | `#E0E0E0` | Borders, dividers |
| Result Background | `#e6f0f9` | Results page background |

### Accent Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Red | `#C91010` | Errors, alerts, warnings |
| Light Blue | `#7891f9` | Buttons, links, accents |
| Cyan | `#7ad2fa` | Highlights, accents |
| Light Cyan | `#83d4f2` | Backgrounds, accents |
| Light Cyan 2 | `#8fbcf2` | Backgrounds, accents |
| Sky Blue | `#00b0ff` | Buttons, CTAs |
| Light Sky | `#7FDBFF` | Backgrounds |
| Light Sky 2 | `#60f2fe` | Backgrounds |

### Text Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Black | `#000000` | Primary text |
| Dark Gray | `#191919` | Secondary text |
| Muted Gray | `#909090` | Muted text |
| Muted Gray 2 | `#737373` | Darker muted text |
| Tab Inactive | `#999999` | Inactive tabs |

### Border Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Muted Border | `#DADADA` | Default borders |
| Light Gray Border | `#dbdbdb` | Dashed borders |
| White Border | `#fff` | Borders on dark backgrounds |

### Table Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Table Heading | `#F0F0F0` | Table header background |

### Special Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Dark Brown | `#3d3a35` | Header gradients |
| Yellow | `#f9b434` | Promotional elements |
| Light Yellow | `#ffe801` | Promotional elements |
| Pink | `#ffa8b3` | Product banners |
| Light Pink | `#ff878b` | Product banners |
| Green | `#00b67a` | Success states |
| Light Green | `#73cf11` | Success states |
| Orange | `#f9b434` | Accents |

---

## 📍 Usage Locations

### Most Common Gradient Patterns

1. **Buttons & CTAs:**
   - `linear-gradient(#7ad2fa, #00b0ff)` - Primary buttons
   - `linear-gradient(to right, #83d4f2, #8fbcf2)` - Secondary buttons

2. **Hero Section:**
   - `linear-gradient(to top right, hsl(36, 100%, 70%), hsl(184, 45%, 90%), hsl(230, 80%, 49%))` - Main background
   - `linear-gradient(#7FDBFF, #60f2fe)` - Decorative elements

3. **Product Banners:**
   - `linear-gradient(to right, #ffa8b3, #ff878b)` - Pink banners
   - `linear-gradient(to right, #83d4f2, #8fbcf2)` - Blue banners

4. **Page Headers:**
   - `linear-gradient(90deg, #3d3a35 30%, #000000 70%)` - Dark header

5. **Section Backgrounds:**
   - Various light gradients for content sections

---

## 🔧 Theme Change Guide

### Quick Reference for Theme Updates

#### To Change Primary Colors:
1. Update `src/styles/variables.scss`:
   - `$primary-color`
   - `$body-bg`
   - `$body-color`

#### To Change Gradient Colors:
1. **Blue Gradients:** Search and replace:
   - `#83d4f2` → New color 1
   - `#8fbcf2` → New color 2
   - `#7ad2fa` → New color 3
   - `#00b0ff` → New color 4

2. **Hero Gradient:** Update in:
   - `src/components/homePageComponents/FirstSection.tsx`

3. **Button Gradients:** Update in:
   - `src/styles/modulesStyles/*.scss` files
   - `src/styles/global.scss`

#### To Change All Gradients at Once:
1. Create gradient variables in `variables.scss`
2. Replace hardcoded gradients with variables
3. Update variables for site-wide changes

### Recommended Approach

1. **Create SCSS Variables for Gradients:**
   ```scss
   $gradient-primary: linear-gradient(to right, #83d4f2, #8fbcf2);
   $gradient-button: linear-gradient(#7ad2fa, #00b0ff);
   $gradient-hero: linear-gradient(to top right, hsl(36, 100%, 70%), hsl(184, 45%, 90%), hsl(230, 80%, 49%));
   ```

2. **Replace Hardcoded Values:**
   - Search for gradient patterns
   - Replace with variables

3. **Update Variables:**
   - Change theme by updating variables only

---

## 📝 Notes

- Many gradients are hardcoded in component files
- Consider centralizing all gradients in `variables.scss` for easier maintenance
- Some gradients use HSL colors (hero section) while others use hex
- Radial and conic gradients are used for special effects
- Dark gradients are primarily used for headers and navigation

---

## 🎯 Next Steps

1. Review this documentation
2. Decide on new color scheme
3. Update `variables.scss` with new colors
4. Replace hardcoded gradients with variables
5. Test across all pages and components

---

**Last Updated:** January 29, 2026
**Maintained By:** Development Team
