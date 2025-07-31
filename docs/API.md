# Network Cable Wiring Simulator - API Documentation

## Overview

The Network Cable Wiring Simulator is an interactive educational tool for learning RJ45 cable wiring standards including T568A, T568B, and CrossOver configurations.

## Main Class: NetworkCableSimulator

### Constructor

```javascript
new NetworkCableSimulator()
```

Initializes a new instance of the simulator with default settings.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `score` | `number` | Current player score |
| `attempts` | `number` | Number of check attempts made |
| `connections` | `Object` | Wire connections for both sockets |
| `currentLanguage` | `string` | Current UI language ('en' or 'fa') |
| `difficulty` | `string` | Current difficulty level ('easy', 'medium', 'hard') |
| `timeLimit` | `number` | Time limit in seconds (0 for no limit) |
| `soundEnabled` | `boolean` | Whether sound effects are enabled |
| `selectedStandard` | `string` | Currently selected wiring standard |

### Wire Colors

The simulator supports 8 standard wire colors with their corresponding CSS gradients:

- **White-Orange**: Two-tone white and orange gradient
- **Orange**: Solid orange gradient
- **White-Green**: Two-tone white and green gradient
- **Blue**: Solid blue gradient
- **White-Blue**: Two-tone white and blue gradient
- **Green**: Solid green gradient
- **White-Brown**: Two-tone white and brown gradient
- **Brown**: Solid brown gradient

### Wiring Standards

#### T568A Standard
Pin order: White-Green, Green, White-Orange, Blue, White-Blue, Orange, White-Brown, Brown

#### T568B Standard
Pin order: White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown

#### CrossOver Standard
Pin order: White-Green, Green, White-Orange, Blue, White-Blue, Orange, White-Brown, Brown

### Key Methods

#### `placeWire(socket, pin, wireType)`
Places a wire on a specific pin.

**Parameters:**
- `socket` (string): Socket ID ('socket1' or 'socket2')
- `pin` (string|number): Pin number (1-8)
- `wireType` (string): Type of wire being placed

#### `checkCable()`
Validates current wire connections against the appropriate standard and provides feedback.

#### `setDifficulty(level)`
Changes the game difficulty level.

**Parameters:**
- `level` (string): Difficulty level ('easy', 'medium', 'hard')

#### `switchLanguage()`
Toggles between English and Persian languages.

#### `resetConnections()`
Clears all wire connections and resets the game state.

#### `newCable()`
Starts a new cable with random device selection.

## Device Types

The simulator supports connections between different network devices:

- **Router**: Network routing device
- **Switch**: Network switching device
- **PC**: Personal computer
- **Server**: Network server

## Cable Types

Based on device selection, the simulator automatically determines:

### Straight-Through Cable
Used for connecting different device types (e.g., PC to Switch, Router to Switch)

### CrossOver Cable
Used for connecting same device types (e.g., PC to PC, Switch to Switch)

## Difficulty Levels

### Easy Mode
- No time limit
- Perfect for learning and practice

### Medium Mode
- 5-minute time limit
- 1.5x score multiplier

### Hard Mode
- 3-minute time limit
- 2x score multiplier

## Scoring System

- **Perfect Cable (100%)**: Base 100 points + time bonus + difficulty multiplier
- **Good Cable (80-99%)**: 50 points + difficulty multiplier
- **Needs Improvement (50-79%)**: 20 points + difficulty multiplier
- **Incorrect (< 50%)**: 0 points

## Sound Effects

The simulator includes audio feedback for:
- Wire placement
- Success notifications
- Error notifications
- Time warnings

## Browser Compatibility

- **Modern browsers** with ES6+ support
- **Web Audio API** for sound effects
- **CSS Grid** and **Flexbox** for layout
- **Drag and Drop API** for desktop interaction

## Accessibility Features

- **ARIA labels** and roles for screen readers
- **Keyboard navigation** support
- **High contrast mode** support
- **Reduced motion** preferences
- **Focus indicators** for all interactive elements

## Multi-Language Support

The simulator provides full localization for:
- **English** (LTR layout)
- **Persian/Farsi** (RTL layout)

All UI elements, messages, and instructions are translated.
