# 🚀 Deployment Guide

Quick guide to get your game live on the internet!

## 🌐 GitHub Pages (Recommended - Free & Easy)

### Step 1: Ensure Code is Pushed to GitHub

Your game is already on a branch. Let's merge it to main:

```bash
# Switch to main branch
git checkout main

# Merge your game branch
git merge claude/add-fantasy-elements-pRj2s

# Push to GitHub
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Branch: Select `main`
   - Folder: Select `/ (root)`
5. Click **Save**

### Step 3: Wait & Access

- GitHub will build your site (takes 1-2 minutes)
- Your game will be available at:
  ```
  https://YOUR-USERNAME.github.io/REPOSITORY-NAME
  ```
- Example: `https://maxscharkopf.github.io/Vampire-Survivors-Style-Birthday-Game`

### Step 4: Share the Link!

✅ Your game is now live and accessible from any device with a web browser!

---

## 🎨 Alternative: Netlify (Also Free)

### Quick Deploy:

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up / Log in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
6. Click "Deploy"

Your site will be at: `https://RANDOM-NAME.netlify.app`

You can customize the domain in site settings.

---

## ⚡ Alternative: Vercel (Also Free)

1. Go to [vercel.com](https://vercel.com/)
2. Sign up / Log in with GitHub
3. Click "New Project"
4. Import your repository
5. Framework Preset: Select "Other"
6. Root Directory: `./`
7. Click "Deploy"

Your site will be at: `https://PROJECT-NAME.vercel.app`

---

## 🎮 Alternative: itch.io (Game Platform)

Perfect if you want it on a game distribution platform!

1. Go to [itch.io](https://itch.io/)
2. Create account / Log in
3. Dashboard → "Create new project"
4. Fill in details:
   - Title: Your game title
   - Project URL: your-game-name
   - Kind of project: HTML
   - Uploads: Upload your entire project as a ZIP file
5. Check "This file will be played in the browser"
6. Set viewport dimensions: 1280 x 720
7. Save & Publish

---

## 📱 Mobile Considerations

The game works on mobile browsers but needs touch controls. To add:

### Quick Mobile Support

Add to `src/entities/Player.js` in the `handleMovement()` method:

```javascript
// Add touch/virtual joystick support
// You can use a library like phaser3-rex-plugins for virtual joystick
// Or add on-screen buttons for mobile users
```

For now, the game works best on desktop with keyboard controls.

---

## 🔧 Troubleshooting Deployment

### Game won't load after deployment:

1. **Check paths**: Make sure all paths are relative (they are in this project)
2. **Check console**: Open browser dev tools (F12) and check for errors
3. **CDN issue**: The Phaser CDN might be blocked. Try downloading Phaser.js locally:
   ```bash
   # Download Phaser
   curl -o phaser.min.js https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js

   # Update index.html to use local file instead of CDN
   <script src="phaser.min.js"></script>
   ```

### Images/Photos not showing:

1. Make sure files are in `assets/story-scrolls/`
2. Check file names match exactly (case-sensitive!)
3. Update `BootScene.js` to load images

### Performance issues:

1. Reduce particle effects in scenes
2. Lower `maxEnemiesOnScreen` in config.js
3. Set physics debug to false

---

## ✅ Pre-Deployment Checklist

Before going live:

- [ ] Personalized all story text
- [ ] Added your name to victory message
- [ ] Tested game from start to finish locally
- [ ] Verified all photos load (if using photos)
- [ ] Checked that text fits on screen
- [ ] Balanced difficulty appropriately
- [ ] Removed any debug console.logs
- [ ] Set physics debug to false in main.js

---

## 🎁 Sharing the Game

Once deployed, you can share via:

1. **Direct link** - Just send her the URL
2. **QR code** - Generate at [qr-code-generator.com](https://www.qr-code-generator.com/)
3. **Embedded** - Add to a birthday website or digital card

---

## 🎊 Making It Special

Ideas to present the game:

1. **Birthday morning surprise**: Text her the link with a mysterious message
2. **Digital card**: Create a simple landing page that links to the game
3. **QR code gift**: Print a QR code in a card that leads to the game
4. **Treasure hunt**: Make the game link the final clue in a birthday scavenger hunt

---

Need help? Check the main [README.md](README.md) for troubleshooting!
