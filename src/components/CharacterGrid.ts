import type { CharacterType } from "../shared/types";
import { CharacterCard } from "./CharacterCard";

export class CharacterGrid {
    private container: HTMLDivElement;
    private characters: CharacterType[];
    private characterCards: CharacterCard[] = [];

    constructor(container: HTMLDivElement, characters: CharacterType[]) {
        this.container = container;
        this.characters = characters;
        this.initializeGrid();
    }

    private initializeGrid(): void {
        this.container.classList.add("container", "character-grid");
        this.characters.forEach((character) => {
            const characterCard = new CharacterCard(character);
            this.characterCards.push(characterCard);
            this.container.appendChild(characterCard.getElement());
        });
    }
}