import type { CharacterType } from "../shared/types";
import { CharacterCard } from "./CharacterCard";
import { AppState } from "@/state/AppState";

interface CardInstance {
    card: CharacterCard;
    character: CharacterType;
}

export class CharacterGrid {
    private container: HTMLDivElement | null = null;
    private characters: CharacterType[];
    private cardInstances: CardInstance[] = [];
    private appState: AppState;
    private unsubscribeCallbacks: Array<() => void> = [];

    constructor(container: HTMLDivElement, characters: CharacterType[]) {
        this.container = container;
        this.characters = characters;
        this.appState = AppState.getInstance();
        // Subscribe to state changes
        this.unsubscribeCallbacks.push(
            this.appState.subscribe('filterChanged', () => this.update()),
            this.appState.subscribe('showLockedChanged', () => this.update()),
            this.appState.subscribe('selectedCharacterChanged', () => this.updateCardStates())
        );
        this.renderCards(this.characters);
    }

    private renderCards(characterList: CharacterType[]): void {
        if (!this.container) return;
        const currentSelectedId = this.appState.getSelectedCharacterId();
        let isSelectedIdInList = false;

        characterList.forEach((character) => {
            const characterCard = new CharacterCard(character);
            this.cardInstances.push({
                card: characterCard,
                character: character
            });
            this.container?.appendChild(characterCard.getElement());

            if (character.id === currentSelectedId) {
                isSelectedIdInList = true;
            }
        });

        if (!isSelectedIdInList) {
            this.selectFirstCharacter();
        }

        this.updateCardStates();


    }

    private clearCards(): void {
        this.cardInstances.forEach((instance) => instance.card.destroy());
        this.cardInstances = [];
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    private update(): void {
        if (!this.container) return;
        this.clearCards();

        const activeFilter = this.appState.getActiveFilter();
        const showLocked = this.appState.getShowLocked();

        //show or hide locked characters based on state
        const updatedCharacterList = showLocked
            ? this.characters
            : this.characters.filter(c => !c.isLocked);

        //filter characters based on active filter
        const filteredCharacterList = activeFilter
            ? updatedCharacterList.filter(c => c.category === activeFilter)
            : updatedCharacterList;

        // Recreate cards for filtered characters
        this.renderCards(filteredCharacterList);

    }

    private updateCardStates(): void {
        const selectedCharacterId = this.appState.getSelectedCharacterId();
        this.cardInstances.forEach((instance) => {
            if (selectedCharacterId && instance.character.id === selectedCharacterId) {
                instance.card.setState('Active');
            } else {
                instance.card.setState('Normal');
            }
        });
    }

    // Select first character in the grid
    public selectFirstCharacter(): void {
        if (this.cardInstances.length > 0) {
            const firstCharacterId = this.cardInstances[0].character.id;
            this.appState.setSelectedCharacterId(firstCharacterId);
        } else {
            this.appState.setSelectedCharacterId(null);
        }
    }
}