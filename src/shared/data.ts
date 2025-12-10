import { CharacterCategory } from "./types";

// Centralized asset path mappings for all game assets
export const ASSET_PATHS = {
    buttons: {
    normal: '/assets/Buttons/FilterButton_Normal.png',
    hovered: '/assets/Buttons/FilterButton_Hovered.png',
    active: '/assets/Buttons/FilterButton_Active.png',
    checkboxEmpty: '/assets/Buttons/Checkbox_Empty.png',
    checkboxFill: '/assets/Buttons/Checkbox_Fill.png',
    },
    cards: {
    backgroundNormal: '/assets/CharacterCards/CardStates/CharacterCard_Background_Normal.png',
    backgroundActive: '/assets/CharacterCards/CardStates/CharacterCard_Background_Active.png',
    foregroundNormal: '/assets/CharacterCards/CardStates/CharacterCard_Foreground_Normal.png',
    foregroundLocked: '/assets/CharacterCards/CardStates/CharacterCard_Foreground_Locked.png',
    active: '/assets/CharacterCards/CardStates/CharacterCard_Active.png',
    lockedActive: '/assets/CharacterCards/CardStates/CharacterCard_Locked_Active.png',
    },
    icons: {
    all: '/assets/Icons/Icon_All.png',
    support: '/assets/Icons/Icon_Support.png',
    tank: '/assets/Icons/Icon_Tank.png',
    brawler: '/assets/Icons/Icon_Brawler.png',
    assassin: '/assets/Icons/Icon_Assassin.png',
    },
    static: {
    background: '/assets/Static/Background.png',
    divider: '/assets/Static/ScreenDivider.png',
    bottomBar: '/assets/Static/Bottom_Bar.png',
    },
} as const;

export function getCategoryIconPath(category: CharacterCategory): string {
    switch (category) {
        case CharacterCategory.Support:
            return ASSET_PATHS.icons.support;
        case CharacterCategory.Tank:
            return ASSET_PATHS.icons.tank;
        case CharacterCategory.Brawler:
            return ASSET_PATHS.icons.brawler;
        case CharacterCategory.Assassin:
            return ASSET_PATHS.icons.assassin;
        default:
            return ASSET_PATHS.icons.all;
    }
}

