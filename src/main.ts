import { CharacterGrid } from './components/CharacterGrid';
import { CHARACTERS } from './shared/characters';

// Application initialization
const gridContainer = document.getElementById('character-grid');

if (gridContainer) {
  // Test with all characters
  new CharacterGrid(gridContainer as HTMLDivElement, CHARACTERS);

  console.log('Character grid rendered with', CHARACTERS.length, 'characters');
} else {
  console.error('Failed to find character-grid element');
}