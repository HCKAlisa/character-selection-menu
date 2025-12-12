import { CharacterGrid } from './components/CharacterGrid';
import { CHARACTERS } from './shared/characters';
import { FilterButton } from './components/FilterButton';
import { filterOptions } from './shared/data';
import { ToggleLock } from './components/ToggleLock';

// Initialize and render the character grid
const gridContainer = document.getElementById('character-grid');
if (gridContainer) {
  new CharacterGrid(gridContainer as HTMLDivElement, CHARACTERS);

  console.log('Character grid rendered with', CHARACTERS.length, 'characters');
} else {
  console.error('Failed to find character-grid element');
}

// Initialize and add filter buttons
const filterButtonContainer = document.getElementById('filter-buttons');
if (filterButtonContainer) {
  for (const option of filterOptions) {
    const filterButton = new FilterButton(option);
    filterButtonContainer.appendChild(filterButton.getElement());
  }

} else {
  console.error('Failed to find filter-buttons element');
}

// Initialize and add the Show locked toggle component
const toggleLockContainer = document.getElementById('toggle-container');

if (toggleLockContainer) {
  const toggleLock = new ToggleLock();
  toggleLockContainer.appendChild(toggleLock.getElement());
} else {
  console.error('Failed to find toggle-lock-container element');
}