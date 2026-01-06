# 🚀 Quick Start - Get Playing in 2 Minutes!

## Test the Game RIGHT NOW

### Option 1: Python (Easiest)

```bash
# If you have Python 3:
python3 serve.py

# Opens browser automatically at http://localhost:8000
```

### Option 2: Python Simple Server

```bash
python3 -m http.server 8000
# Then open: http://localhost:8000
```

### Option 3: npx (If you have Node.js)

```bash
npx http-server -p 8000
# Then open: http://localhost:8000
```

### Option 4: VS Code

1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

---

## 🎮 Game Controls

- **WASD** or **Arrow Keys** - Move your hero
- **Abilities** - Auto-attack (no buttons needed!)
- **Mouse** - Click to select upgrades

---

## 📝 Next Steps

### 1. Play Through Once (5 minutes)

Just try it! See how it plays, understand the flow.

### 2. Personalize the Story (30-60 minutes)

**The most important step!** This is what makes it special.

Open `src/data/storyText.js` and:
- Replace `[Her Name]` with her actual name
- Write your story in the 4 chapter scrolls
- Add your birthday message at the end

**👉 Use [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for step-by-step help!**

### 3. Customize Ability Names (5 minutes)

Open `src/data/abilityData.js` and name abilities after meaningful moments:
- Starfall → "Starfall of [Important Date]"
- Enchanted Brew → "[Coffee Shop] Magic"
- Etc.

### 4. (Optional) Add Photos

Place 4 photos in `assets/story-scrolls/`:
- `photo1.jpg` - When you met
- `photo2.jpg` - Early adventures
- `photo3.jpg` - Overcoming challenges
- `photo4.jpg` - Recent/current

### 5. Test Again

Play through with your customizations. Make sure:
- All text displays correctly
- Nothing is cut off
- Difficulty feels right
- Your birthday message shows at the end

### 6. Deploy (10 minutes)

Follow [DEPLOYMENT.md](DEPLOYMENT.md) to put it online.

**Easiest option**: GitHub Pages (free, 2 clicks)

---

## 🎯 The Absolute Minimum

If you're short on time, do THIS at minimum:

1. Edit `src/data/storyText.js`:
   - Change `gameTitle` to her name
   - Write the final `victory.finalMessage` with your birthday wishes and your name

2. Deploy it (even with placeholder text)

3. Customize more later if you want!

---

## ⚡ Timeline Suggestions

### Have 8 Days?
Follow the full guide, add sound, polish everything.

### Have 2-3 Days?
- Day 1: Personalize story, test
- Day 2: Add photos, final polish
- Day 3: Deploy, test on different devices

### Have 1 Day?
- Morning: Personalize story text (1-2 hours)
- Afternoon: Test and tweak difficulty
- Evening: Deploy and share!

### Have 1 Hour?
- 20 min: Edit storyText.js (focus on victory message)
- 20 min: Quick test playthrough
- 20 min: Deploy to GitHub Pages

---

## 🆘 Need Help?

Check these files in order:

1. **README.md** - Full documentation
2. **CUSTOMIZATION_GUIDE.md** - Step-by-step personalization
3. **DEPLOYMENT.md** - How to put it online

---

## 🎁 This Is Already Complete!

The game is **fully functional** right now. Everything works:
- ✅ All 4 chapters
- ✅ Combat system
- ✅ Leveling and upgrades
- ✅ Story scrolls
- ✅ Victory celebration

**Your only job is to make it personal!**

The technical work is done. Focus on the story - that's what matters. ❤️

---

**Ready? Run the server and play!** 🎮
