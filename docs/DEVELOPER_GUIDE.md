# Developer Guide - Network Cable Wiring Simulator

## Project Structure

```
RJ45-Master/
├── index.html          # Main HTML file
├── script.js           # Main JavaScript application
├── styles.css          # Complete CSS styling
├── rj45.png           # Favicon
├── img.png            # Project screenshot
├── docs/              # Documentation folder
│   └── API.md         # API documentation
├── README.md          # Project README
└── LICENSE            # GPL-3.0 License
```

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/pouriavelaei/Network-Cable-Wiring-Simulator.git
   cd Network-Cable-Wiring-Simulator
   ```

2. **Open in development environment**
   - Use VS Code with Live Server extension
   - Or serve with any local HTTP server
   - No build process required - pure HTML/CSS/JS

## Code Architecture

### Class-Based Design

The application uses a single main class `NetworkCableSimulator` that encapsulates:

- **Game State Management**: Score, attempts, connections
- **UI Control**: Language switching, theme management
- **Event Handling**: Drag & drop, mouse/touch interactions
- **Audio Management**: Sound effects and volume control
- **Timer System**: Difficulty-based time limits

### Key Design Patterns

#### Observer Pattern
```javascript
// Event listeners for state changes
document.getElementById('device1').addEventListener('change', () => this.updateConnectionInfo());
```

#### Strategy Pattern
```javascript
// Different scoring strategies based on difficulty
let bonusMultiplier = 1;
if (this.difficulty === 'medium') bonusMultiplier = 1.5;
if (this.difficulty === 'hard') bonusMultiplier = 2;
```

#### Factory Pattern
```javascript
// Wire creation with different properties
const wireElement = this.createWireElement(wire.name, wire.class);
```

## Adding New Features

### Adding a New Wire Color

1. **Update wire colors object:**
   ```javascript
   this.wireColors = {
       // existing colors...
       'New-Color': { 
           class: 'wire-new-color', 
           cssVar: 'linear-gradient(135deg, #color1, #color2)' 
       }
   };
   ```

2. **Add CSS styling:**
   ```css
   .wire-new-color { 
       background: linear-gradient(135deg, #color1, #color2);
   }
   ```

3. **Update translations:**
   ```javascript
   wireColors: {
       'New-Color': 'نام جدید' // for Persian
   }
   ```

### Adding a New Language

1. **Extend translations object:**
   ```javascript
   initTranslations() {
       return {
           en: { /* existing */ },
           fa: { /* existing */ },
           es: { 
               headerTitle: "Simulador de Cableado de Red",
               // ... all translations
           }
       };
   }
   ```

2. **Add language toggle:**
   ```javascript
   // Update switchLanguage method to support 3+ languages
   switchLanguage() {
       const languages = ['en', 'fa', 'es'];
       const currentIndex = languages.indexOf(this.currentLanguage);
       this.currentLanguage = languages[(currentIndex + 1) % languages.length];
   }
   ```

### Adding New Device Types

1. **Update device options in HTML:**
   ```html
   <option value="firewall">Firewall</option>
   ```

2. **Add device logic:**
   ```javascript
   updateConnectionInfo() {
       // Add new device connection rules
       if (device1 === 'firewall' && device2 === 'switch') {
           cableType = 'Straight-Through';
       }
   }
   ```

3. **Update translations:**
   ```javascript
   firewall: "Firewall", // English
   firewall: "فایروال",   // Persian
   ```

## Testing Guidelines

### Manual Testing Checklist

#### Core Functionality
- [ ] Wire drag and drop works on desktop
- [ ] Wire click/touch works on mobile
- [ ] All 8 pins accept wires correctly
- [ ] Cable validation works for all standards
- [ ] Score calculation is accurate

#### UI/UX Testing
- [ ] Language switching works completely
- [ ] Responsive design works on all screen sizes
- [ ] Sound effects toggle properly
- [ ] Timer countdown works correctly
- [ ] Animations are smooth

#### Accessibility Testing
- [ ] Screen reader navigation
- [ ] Keyboard-only navigation
- [ ] High contrast mode
- [ ] Focus indicators visible
- [ ] ARIA labels announced correctly

### Browser Testing Matrix

| Browser | Desktop | Mobile | Status |
|---------|---------|---------|---------|
| Chrome | ✅ | ✅ | Full support |
| Firefox | ✅ | ✅ | Full support |
| Safari | ✅ | ✅ | Full support |
| Edge | ✅ | ✅ | Full support |

## Performance Optimization

### Current Optimizations

1. **CSS Animations**: Hardware accelerated transforms
2. **Event Delegation**: Efficient event handling
3. **Debounced Updates**: Prevent excessive DOM updates
4. **Lazy Loading**: Sound effects loaded on demand

### Future Optimizations

1. **Service Worker**: Offline functionality
2. **Web Workers**: Background processing
3. **IndexedDB**: Client-side data storage
4. **Image Optimization**: WebP format support

## Security Considerations

1. **No External Dependencies**: Reduces attack surface
2. **Local Storage Only**: No sensitive data transmission
3. **Input Validation**: All user inputs validated
4. **CSP Ready**: Compatible with Content Security Policy

## Deployment

### GitHub Pages (Current)
- Automatic deployment from main branch
- URL: https://pouriavelaei.github.io/Network-Cable-Wiring-Simulator/

### Alternative Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Firebase Hosting**: Google Cloud platform

## Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Commit changes**: `git commit -am 'Add new feature'`
4. **Push to branch**: `git push origin feature/new-feature`
5. **Create Pull Request**

### Code Style Guidelines

- Use 4 spaces for indentation
- Use camelCase for JavaScript variables
- Use kebab-case for CSS classes
- Add JSDoc comments for all methods
- Follow semantic HTML structure

## License

GPL-3.0 License - See LICENSE file for details.
