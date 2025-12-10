import type { CharacterType, VisualState } from "../shared/types";
import { getCategoryIconPath } from "../shared/data";

export class CharacterCard {
  private character: CharacterType;
  private element: HTMLDivElement | null = null;
  private visualState: VisualState;
  private eventHandlers: Map<string, EventListener> = new Map();
  private onClick?: (Character: CharacterType) => void;

  constructor(character: CharacterType) {
    this.character = character;
    this.visualState = "Normal";
    this.element = this.createCardElement();
  }

  // Get the card element
  public getElement(): HTMLDivElement {
    if (!this.element) {
      throw new Error('Card element not initialized');
    }
    return this.element;
  }

  // Create the card HTML element
  private createCardElement(): HTMLDivElement {
    const card = document.createElement("div");
    card.classList.add("character-card", "character-card--normal");

    // Add locked class if character is locked
    if (this.character.isLocked) {
      card.classList.add("character-card--locked");
    }

    //Background Layer
    const background = document.createElement("div");
    background.classList.add("character-card__background");
    card.appendChild(background);

    // Character Image Layer
    const characterImage = document.createElement("img");
    characterImage.classList.add("character-card__portrait");
    characterImage.src = this.character.imageUrl;
    characterImage.alt = this.character.name;
    card.appendChild(characterImage);

    //Frame Layer
    const frame = document.createElement("div");
    frame.classList.add("character-card__foreground");
    card.appendChild(frame);

    // Lock Overlay Layer
    if (this.character.isLocked) {
      const lockOverlay = document.createElement("div");
      lockOverlay.classList.add("character-card__lock-overlay");
      card.appendChild(lockOverlay);
    }

    //Category Icon
    const categoryIcon = document.createElement("img");
    categoryIcon.classList.add("character-card__category-icon");
    categoryIcon.src = getCategoryIconPath(this.character.category);
    card.appendChild(categoryIcon);

    //Character Name
    const nameLabel = document.createElement("div");
    nameLabel.classList.add("character-card__name");
    nameLabel.textContent = this.character.name;
    card.appendChild(nameLabel);

    //Character Level
    const levelLabel = document.createElement("div");
    levelLabel.classList.add("character-card__level");
    levelLabel.textContent = `${this.character.level}/ ${this.character.maxLevel}`;
    card.appendChild(levelLabel);

    this.element = card;
    this.attachEventListeners();
    return this.element;
  }

  public setState(state: VisualState): void {
    if (!this.element) return;

    // Update current state tracker
    this.visualState = state;
    // Remove hover and active modifiers
    this.element.classList.remove(
      "character-card--hovered",
      "character-card--active"
    );

    switch (state) {
      case "Normal":
        this.element.classList.remove("character-card--active", "character-card--hovered");
        this.element.classList.add("character-card--normal");
        break;
      case "Hovered":
        this.element.classList.add("character-card--hovered");
        break;
      case "Active":
        this.element.classList.remove("character-card--normal");
        this.element.classList.add("character-card--active");
        break;
      default:
        break;
    }
  }

  // Cleanup method - Remove event listeners and clear references
  public destroy(): void {
    this.removeEventListeners();
    this.element = null;
  }

  // Attach event listeners for click, hover interactions
  private attachEventListeners(): void {
    if (!this.element) return;

    // Click handler
    const clickHandler = this.handleClick.bind(this);
    this.eventHandlers.set("click", clickHandler);
    this.element.addEventListener("click", clickHandler);

    // Mouse enter handler
    const mouseenterHandler = this.handleMouseEnter.bind(this);
    this.eventHandlers.set("mouseenter", mouseenterHandler);
    this.element.addEventListener("mouseenter", mouseenterHandler);

    // Mouse leave handler
    const mouseleaveHandler = this.handleMouseLeave.bind(this);
    this.eventHandlers.set("mouseleave", mouseleaveHandler);
    this.element.addEventListener("mouseleave", mouseleaveHandler);
  }

  // Handle click event
  private handleClick(): void {
    if (this.onClick) {
      this.onClick(this.character);
    }
  }

  // Handle mouse enter event
  private handleMouseEnter(): void {
    // Only apply hover state if card is not currently active
    if (this.visualState !== "Active") {
      this.setState("Hovered");
    }
  }

  // Handle mouse leave event
  private handleMouseLeave(): void {
    // Only return to normal state if card is not currently active
    if (this.visualState !== "Active") {
      this.setState("Normal");
    }
  }

  // Remove all attached event listeners
  private removeEventListeners(): void {
    this.eventHandlers.forEach((handler, event) => {
      this.element?.removeEventListener(event, handler);
    });
    this.eventHandlers.clear();
  }
}
