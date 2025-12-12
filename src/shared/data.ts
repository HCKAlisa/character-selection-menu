import { CharacterCategory } from "./types";
import type { FilterType } from "./types";

// Helper function to get asset path with base URL
const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

// Centralized asset path mappings for all game assets
export const ASSET_PATHS = {
    buttons: {
        normal: getAssetPath('/assets/Buttons/FilterButton_Normal.png'),
        hovered: getAssetPath('/assets/Buttons/FilterButton_Hovered.png'),
        active: getAssetPath('/assets/Buttons/FilterButton_Active.png'),
        checkboxEmpty: getAssetPath('/assets/Buttons/Checkbox_Empty.png'),
        checkboxFill: getAssetPath('/assets/Buttons/Checkbox_Fill.png'),
    },
    cards: {
        backgroundNormal: getAssetPath('/assets/CharacterCards/CardStates/CharacterCard_Background_Normal.png'),
        backgroundActive: getAssetPath('/assets/CharacterCards/CardStates/CharacterCard_Background_Active.png'),
        foregroundNormal: getAssetPath('/assets/CharacterCards/CardStates/CharacterCard_Foreground_Normal.png'),
        foregroundLocked: getAssetPath('/assets/CharacterCards/CardStates/CharacterCard_Foreground_Locked.png'),
        active: getAssetPath('/assets/CharacterCards/CardStates/CharacterCard_Active.png'),
        lockedActive: getAssetPath('/assets/CharacterCards/CardStates/CharacterCard_Locked_Active.png'),
    },
    icons: {
        all: getAssetPath('/assets/Icons/Icon_All.png'),
        support: getAssetPath('/assets/Icons/Icon_Support.png'),
        tank: getAssetPath('/assets/Icons/Icon_Tank.png'),
        brawler: getAssetPath('/assets/Icons/Icon_Brawler.png'),
        assassin: getAssetPath('/assets/Icons/Icon_Assassin.png'),
    },
    static: {
        background: getAssetPath('/assets/Static/Background.png'),
        divider: getAssetPath('/assets/Static/ScreenDivider.png'),
        bottomBar: getAssetPath('/assets/Static/Bottom_Bar.png'),
    },
} as const;

export const filterOptions: FilterType[] = [
    {
        iconUrl: ASSET_PATHS.icons.all,
        label: 'ALL',
    },
    {
        category: CharacterCategory.Support,
        iconUrl: ASSET_PATHS.icons.support,
        label: 'SUPPORT',
    },
    {
        category: CharacterCategory.Tank,
        iconUrl: ASSET_PATHS.icons.tank,
        label: 'TANK',
    },
    {
        category: CharacterCategory.Brawler,
        iconUrl: ASSET_PATHS.icons.brawler,
        label: 'BRAWLER',
    },
    {
        category: CharacterCategory.Assassin,
        iconUrl: ASSET_PATHS.icons.assassin,
        label: 'ASSASSIN',
    },
];

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
