import { type CharacterType, CharacterCategory } from "./types";

export const CHARACTERS: CharacterType[] = [
    {
        id: 'adrian',
        name: 'Adrian',
        category: CharacterCategory.Support,
        isLocked: false,
        level: 2,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Adrian.png',
    },
    {
        id: 'alfred',
        name: 'Alfred',
        category: CharacterCategory.Tank,
        isLocked: false,
        level: 2,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Alfred.png',
    },
    {
        id: 'amelia',
        name: 'Amelia',
        category: CharacterCategory.Brawler,
        isLocked: false,
        level: 8,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Amelia.png',
    },
    {
        id: 'annalise',
        name: 'Annalise',
        category: CharacterCategory.Brawler,
        isLocked: false,
        level: 1,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Annalise.png',
    },
    {
        id: 'djura',
        name: 'Djura',
        category: CharacterCategory.Assassin,
        isLocked: true,
        level: 6,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Djura.png',
    },
    {
        id: 'edwin',
        name: 'Edwin',
        category: CharacterCategory.Support,
        isLocked: false,
        level: 4,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Edwin.png',
    },
    {
        id: 'eileen',
        name: 'Eileen',
        category: CharacterCategory.Assassin,
        isLocked: false,
        level: 6,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Eileen.png',
    },
    {
        id: 'hunter',
        name: 'Hunter',
        category: CharacterCategory.Tank,
        isLocked: false,
        level: 12,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Hunter.png',
    },
    {
        id: 'maria',
        name: 'Maria',
        category: CharacterCategory.Support,
        isLocked: true,
        level: 4,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Maria.png',
    },
    {
        id: 'old_hunter',
        name: 'Old Hunter',
        category: CharacterCategory.Brawler,
        isLocked: true,
        level: 1,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/OldHiunter.png',
    },
    {
        id: 'pierce',
        name: 'Pierce',
        category: CharacterCategory.Tank,
        isLocked: false,
        level: 0,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Pierce.png',
    },
    {
        id: 'yahar',
        name: 'Yahar',
        category: CharacterCategory.Assassin,
        isLocked: true,
        level: 0,
        maxLevel: 15,
        imageUrl: '/assets/CharacterCards/CharacterPortraits/Yahar.png',
    },
];

// Function to retrieve all characters
export function getAllCharacters(): CharacterType[] {
    return CHARACTERS;
}

export function getCharacterById(id: string): CharacterType | null {
    const character = CHARACTERS.find(character => character.id === id);
    return character || null;
}

// Function to filter characters by category and lock status
export function filterCharactersByCategory(category: CharacterCategory | null, showLocked: boolean): CharacterType[] {
    let characterList = showLocked ? CHARACTERS : CHARACTERS.filter(character => !character.isLocked);

    if (category) {
        characterList = characterList.filter(character => character.category === category);
    }

    return characterList;
}
