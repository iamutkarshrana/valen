<<<<<<< HEAD
# Valentine's Day Website - Setup Instructions

## 🎮 Your Valentine's Website is Ready!

### What's Included:
1. **Two Minigames:**
   - **Wordle Game**: Guess the 5-letter word "HEART"
   - **Image Matcher**: Match 12 photo pairs in a heart shape!

2. **The Grand Finale**: "Will You Marry Me?" screen with:
   - "YESS" button trigger massive celebration
   - "Neverrr" button that runs away when you try to click it! 🏃‍♂️
3. **Celebrations**: Fireworks animation when you win!
4. **Fading Messages**: After completing both games, romantic messages fade in and out
3. **Proposal Image**: Final reveal with your proposal image
4. **Animated Background**: 100 floating couple images in the background

### 🖼️ Image Setup Required:

#### 1. Proposal Image (proposal.jpg)
- Create or use an AI-generated image of you proposing
- Name it `proposal.jpg` and place it in the Valentine folder
- Recommended size: 1200x800px or similar aspect ratio
- You can use AI image generators like:
  - DALL-E
  - Midjourney
  - Leonardo.ai
  - Bing Image Creator
  
**Prompt suggestion**: "A romantic illustration of a young man proposing to a woman, kneeling on one knee with a ring box, beautiful sunset background with warm pink and purple hues, dreamy atmosphere, artistic style"

#### 2. Background Couple Images (Optional - Currently Using Placeholders)
The website currently uses placeholder couple images from Unsplash. To use your own photos:

1. Create a folder called `images` in the Valentine directory
2. Add your couple photos (name them: `couple1.jpg`, `couple2.jpg`, etc.)
3. Update the `placeholderImages` array in `script.js` (around line 28) with your image paths:
   ```javascript
   const placeholderImages = [
       'images/couple1.jpg',
       'images/couple2.jpg',
       'images/couple3.jpg',
       // ... add more
   ];
   ```

### 🚀 How to Run:

1. Simply open `index.html` in your web browser
2. Or use a local server for better performance

### 🎨 Customization Options:

#### Change the Wordle Word:
In `script.js`, line 13:
```javascript
const WORDLE_WORD = 'HEART'; // Change to any 5-letter word
```

#### Customize Final Messages:
In `script.js`, around line 257:
```javascript
const messages = [
    "You did it! ✨",
    "Every moment with you...",
    // Edit these messages
];
```

#### Change Colors:
In `style.css`, edit the CSS variables at the top:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    // ... customize colors
}
```

### 📱 Features:
- ✅ Fully responsive design
- ✅ Smooth animations and transitions
- ✅ Glassmorphism effects
- ✅ Keyboard support for Wordle
- ✅ Beautiful gradient backgrounds
- ✅ Premium modern UI

### 🎯 Game Flow:
1. Welcome screen with "Begin" button
2. Game selection screen (choose Wordle or Image Matcher)
3. Complete both games in any order
4. Unlock the final romantic message sequence
5. Reveal the proposal image

Enjoy your Valentine's Day surprise! 💕
=======
# Valentine's Day Website - Setup Instructions

## 🎮 Your Valentine's Website is Ready!

### What's Included:
1. **Two Minigames:**
   - **Wordle Game**: Guess the 5-letter word "HEART"
   - **Image Matcher**: Match 12 photo pairs in a heart shape!

2. **The Grand Finale**: "Will You Marry Me?" screen with:
   - "YESS" button trigger massive celebration
   - "Neverrr" button that runs away when you try to click it! 🏃‍♂️
3. **Celebrations**: Fireworks animation when you win!
4. **Fading Messages**: After completing both games, romantic messages fade in and out
3. **Proposal Image**: Final reveal with your proposal image
4. **Animated Background**: 100 floating couple images in the background

### 🖼️ Image Setup Required:

#### 1. Proposal Image (proposal.jpg)
- Create or use an AI-generated image of you proposing
- Name it `proposal.jpg` and place it in the Valentine folder
- Recommended size: 1200x800px or similar aspect ratio
- You can use AI image generators like:
  - DALL-E
  - Midjourney
  - Leonardo.ai
  - Bing Image Creator
  
**Prompt suggestion**: "A romantic illustration of a young man proposing to a woman, kneeling on one knee with a ring box, beautiful sunset background with warm pink and purple hues, dreamy atmosphere, artistic style"

#### 2. Background Couple Images (Optional - Currently Using Placeholders)
The website currently uses placeholder couple images from Unsplash. To use your own photos:

1. Create a folder called `images` in the Valentine directory
2. Add your couple photos (name them: `couple1.jpg`, `couple2.jpg`, etc.)
3. Update the `placeholderImages` array in `script.js` (around line 28) with your image paths:
   ```javascript
   const placeholderImages = [
       'images/couple1.jpg',
       'images/couple2.jpg',
       'images/couple3.jpg',
       // ... add more
   ];
   ```

### 🚀 How to Run:

1. Simply open `index.html` in your web browser
2. Or use a local server for better performance

### 🎨 Customization Options:

#### Change the Wordle Word:
In `script.js`, line 13:
```javascript
const WORDLE_WORD = 'HEART'; // Change to any 5-letter word
```

#### Customize Final Messages:
In `script.js`, around line 257:
```javascript
const messages = [
    "You did it! ✨",
    "Every moment with you...",
    // Edit these messages
];
```

#### Change Colors:
In `style.css`, edit the CSS variables at the top:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    // ... customize colors
}
```

### 📱 Features:
- ✅ Fully responsive design
- ✅ Smooth animations and transitions
- ✅ Glassmorphism effects
- ✅ Keyboard support for Wordle
- ✅ Beautiful gradient backgrounds
- ✅ Premium modern UI

### 🎯 Game Flow:
1. Welcome screen with "Begin" button
2. Game selection screen (choose Wordle or Image Matcher)
3. Complete both games in any order
4. Unlock the final romantic message sequence
5. Reveal the proposal image

Enjoy your Valentine's Day surprise! 💕
>>>>>>> 7f311131065a8153900cf916efa381977984d57a
