// Character categories enumeration for filtering
export enum CharacterCategory {
    Support = 'SUPPORT',
    Tank = 'TANK',
    Brawler = 'BRAWLER',
    Assassin = 'ASSASSIN',
}

// Character interface defining structure of character objects
export interface CharacterType {
    id: string;
    name: string;
    category: CharacterCategory;
    imageUrl: string;
    isLocked: boolean;
    level: number;
    maxLevel: number;
}

// Filter options for character selection
export interface FilterType {
    category?: CharacterCategory;
    iconUrl: string;
    label: string;
}

// Card & Button Visual State
export type VisualState = 'Normal' | 'Hovered' | 'Active';

// Application State Events
export type AppStateEvent = 'filterChanged' | 'showLockedChanged' | 'selectedCharacterChanged';

