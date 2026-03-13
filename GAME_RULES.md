# 🎨 Skribbl Game Rules & How to Play

## 🎮 Game Overview

Skribbl is a fun, real-time multiplayer drawing and guessing game. One player draws a secret word while others try to guess it. Players earn points for correct guesses and fast thinking!

---

## 👥 Players & Roles

- **Minimum**: 2 players
- **Maximum**: Unlimited (tested with 50+ in single room)
- **Recommended**: 3-10 players for best experience

### Player Roles

**Drawer**: The artist
- Receives a secret word to draw
- Has 80 seconds to draw the word
- Cannot chat or give hints
- Earns points when others guess correctly

**Guesser**: The detective
- Watches the drawing
- Types guesses in the chat
- Tries to be the first to guess correctly
- Earns points for correct guesses

---

## 🔄 Game Flow

### Phase 1: Lobby
```
All Players
    │
    ├─ Enter name and room code
    ├─ Join the same room
    ├─ Wait for enough players (2+)
    └─ Host clicks "Start Game"
```

### Phase 2: Word Selection
```
Drawer Only
    │
    ├─ Receives 3 word options
    ├─ Must choose 1 word to draw
    └─ Word is hidden from other players
```

### Phase 3: Drawing Round
```
All Players (80 seconds)
    │
    ├─ Drawer: Draws the word on canvas
    │   - Use drawing tools (color, brush size)
    │   - Try to make the word recognizable
    │   - Cannot write the word!
    │
    └─ Guessers: Watch and chat
        - Type guesses in chat box
        - First correct guess wins!
```

### Phase 4: Round Results
```
All Players (after round ends or all guess)
    │
    ├─ Show the word that was drawn
    ├─ Display who guessed correctly
    ├─ Show points earned
    ├─ Update leaderboard
    └─ Prepare next round
```

### Phase 5: Final Results
```
After 3 rounds:
    │
    ├─ Final leaderboard shown
    ├─ Winner announced
    ├─ Statistics displayed
    └─ Option to play again or exit
```

---

## 📊 Scoring System

### Correct Guess Points
```
Points = 50 - (Seconds Elapsed ÷ 2)
Minimum = 10 points
Maximum = 50 points
```

**Examples:**
- Guess in 10 seconds → 45 points (50 - 5)
- Guess in 30 seconds → 35 points (50 - 15)
- Guess in 80 seconds → 10 points (minimum)

**Formula Breakdown:**
- Faster guesses = More points
- Encourages quick problem-solving
- Minimum 10 points prevents zero scores

### Drawer Points
```
Drawer Points = (Guesser Points ÷ 2)
```

**Examples:**
- If someone guesses for 45 points → Drawer gets 22 points
- If someone guesses for 35 points → Drawer gets 17 points

**Why?** Drawers get points for being helpful, but less than guessers. This balances the game.

### Final Scores

Players are ranked by total points across all rounds:

```
Round 1:  Player A: 150 points
          Player B: 120 points

Round 2:  Player A: 80 points  (Total: 230)
          Player B: 100 points (Total: 220)

Round 3:  Player A: 95 points  (Total: 325)
          Player B: 110 points (Total: 330) ← WINNER!
```

---

## 🕐 Timing

| Element | Duration |
|---------|----------|
| Drawing time per round | 80 seconds |
| Word selection | ~5 seconds |
| Round end transition | 3 seconds |
| Default full game | ~7 minutes (3 rounds) |

---

## ✏️ Drawing Rules

### What You CAN Do
✅ Draw shapes and objects
✅ Use sticks, blocks, arrows
✅ Draw simple sketches
✅ Add colors to distinguish parts
✅ Draw multiple attempts
✅ Use clear, bold strokes

### What You CANNOT Do
❌ Write the word or letters
❌ Write numbers that spell the word
❌ Draw stick figures with labels
❌ Write hints or clues
❌ Use the chat to communicate

### Drawing Tips
- **Start simple**: Basic shapes are recognizable
- **Use colors**: Different colors show different parts
- **Keep it clear**: Large strokes over tiny details
- **Repeat**: Draw the object multiple times
- **Common objects**: Everyone knows them better

**Good Examples:**
- For "Basketball": Draw a circle with curved lines
- For "Tree": Draw trunk and round leafy top
- For "Pizza": Circle with triangular slices

**Bad Examples:**
- For "Basketball": Write "B-A-L-L"
- For "Tree": Write letters with the shape
- For "Pizza": Write "P-I-Z-Z-A"

---

## 💬 Guessing Rules

### Chat Behavior
✅ Type your guesses
✅ Type anything you want (hints OK)
✅ Multiple guesses allowed
✅ Typos don't matter (cleaned up)

### How Guesses Work
- You type a guess and press Enter
- Server checks if it matches the word
- **IGNORES**: Spaces, uppercase/lowercase
- **Example**: "BASKETBALL" = "basketball" = "basket ball" ✓

### Guessing Tips
- **Listen to drawer**: Hints or clues in chat
- **Watch the drawing**: Look for details
- **Common words**: Guess categories first
- **Ask questions**: "Is it a person?" is allowed
- **Multiple tries**: You can guess many times

### Winning a Round
- First to guess correctly wins
- Your score displays on screen
- Everyone sees "✓ Player agreed correctly!"
- Round may continue for others or end

---

## 🎯 Strategy Tips

### For Drawers
1. **Pick familiar word**: Easy to recognize
2. **Draw big**: Large canvas, big shapes
3. **Add color**: Shows what parts are what
4. **Repeat**: Draw it multiple times
5. **Don't rush**: Think about easy representation
6. **Add context**: Draw related objects
   - For "skateboard": Draw person standing on board
   - For "fishing": Draw person with rod and fish

### For Guessers
1. **Think categories**: Animal? Object? Action?
2. **Watch closely**: Every detail matters
3. **Communicate**: Share observations with team
4. **Narrow it down**: Eliminate possibilities
5. **First guess wins**: Be quick!
6. **Learn patterns**: Same drawer draws similarly

### Team Strategy (if applicable)
1. Different players guess different categories
2. Share what you see in chat
3. Discuss together
4. Multiple simultaneous guesses (person with most points wins)

---

## ⚙️ Game Customization

### Default Settings
- **Rounds**: 3
- **Time per round**: 80 seconds
- **Word count**: 3 options to choose from
- **Players per room**: 2-50 recommended

### Customizable Options
See `server/README.md` for:
- Changing number of rounds
- Changing timer duration
- Adding more words
- Modifying scoring formula
- Adding difficulty levels

---

## 🏆 Winning & Leaderboard

### How to Win
1. Play all 3 rounds
2. Accumulate the most total points
3. Player with highest final score wins

### Leaderboard Display
- **During game**: Live scoreboard on right side
- **After round**: Results screen with rankings
- **At end**: Final leaderboard with medals
  - 🥇 1st place (highest score)
  - 🥈 2nd place
  - 🥉 3rd place

### Play Again
After game ends:
- Click "Back to Lobby" to join new room
- Generate new room code or join existing
- Same or different players
- Start new game

---

## 🔧 Technical Rules

### Connection Requirements
✅ Stable internet connection
✅ Modern web browser
✅ Both frontend and server running
✅ Same local network (for LAN) or online

### Disconnect Handling
- If player disconnects: They remain in "guessed" state
- If drawer disconnects: Round ends immediately
- Rejoin: Must start new room

### Chat Limitations
- Maximum 500 characters per message
- No special characters (for safety)
- Messages visible to all players in room

---

## 🎓 Learning Guide

### Beginner

**First Time Playing:**
1. Watch the drawing carefully
2. Make your best guess in chat
3. Don't worry about being first
4. Have fun!

**First Time Drawing:**
1. Pick a simple word
2. Draw the main shape first
3. Add details/color
4. Keep trying different angles

### Intermediate

**Improve Guessing:**
- Think of word categories
- Look for shapes and patterns
- Use context clues from others
- Type common words quickly

**Improve Drawing:**
- Practice recognizable symbols
- Use colors strategically
- Think about perspective
- Try different drawing styles

### Advanced

**Master Guessing:**
- Identify drawers' patterns
- Predict difficulty levels
- Anticipate word categories
- Use psychology and deduction

**Master Drawing:**
- Simplified iconic representations
- Color as information
- Composition and space
- Time management (when to move on)

---

## 📋 Frequently Asked Questions

**Q: Can I type the word?**
A: No, you'll be warned that it's not a valid guess. The system checks for actual typing.

**Q: What if my guess is misspelled?**
A: Typos are fine! The system is flexible with spacing and punctuation.

**Q: Can I use the chat to give hints?**
A: Yes! You can chat about anything. Saying "it's an animal" is allowed.

**Q: What if drawer disconnects?**
A: The round ends and goes to the next round.

**Q: Can I play solo?**
A: No, you need at least 2 players.

**Q: Is there a way to draw better?**
A: Practice! Use the clear button and try again.

**Q: Can I change the word after selecting?**
A: No, once selected, you must draw that word.

**Q: Why can't I type the word?**
A: It's against the rules. The game system blocks it automatically.

---

## 🎉 Have Fun!

The goal is to **have fun, draw creatively, and guess quickly**. Enjoy playing with friends and see who can earn the most points! 🎨✨
