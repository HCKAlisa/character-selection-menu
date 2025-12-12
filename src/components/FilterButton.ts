import type { FilterType, VisualState } from "@/shared/types";
import { AppState } from "@/state/AppState";

export class FilterButton {
    private element: HTMLElement | null = null;
    private appState: AppState;
    private filterOption: FilterType;
    private visualState: VisualState = "Normal";
    private unsubscribeCallback: (() => void) | null = null;
    private eventHandlers: Map<string, EventListener> = new Map();

    constructor(filterOption: FilterType) {
        this.appState = AppState.getInstance();
        this.filterOption = filterOption;
        this.element = this.createButtonElement(filterOption.label, filterOption.iconUrl);

    }

    // Get the button element
    public getElement(): HTMLElement {
        if (!this.element) {
            throw new Error('Filter button element not initialized');
        }
        return this.element;
    }

    // Create the button HTML element
    private createButtonElement(label: string, icon: string): HTMLElement {
        const button = document.createElement("div");
        button.classList.add("filter-button", "filter-button--normal");

        // Background Layer
        const background = document.createElement("div");
        background.classList.add("filter-button-background");
        button.appendChild(background);

        // Icon
        const iconImg = document.createElement("img");
        iconImg.src = icon;
        iconImg.alt = `${label} icon`;
        iconImg.classList.add("filter-button__icon");
        button.appendChild(iconImg);

        // Label
        const filterName = document.createElement("span");
        filterName.classList.add("filter-button__label");
        filterName.textContent = label;
        button.appendChild(filterName);

        // Set element first, then attach listeners
        this.element = button;
        this.attachEventListeners();

        return button;
    }

    // Update the visual of the button
    private updateVisual(): void {
        if (!this.element) return;

        // Remove all state classes
        this.element.classList.remove(
            "filter-button--normal",
            "filter-button--hovered",
            "filter-button--active"
        );

        switch (this.visualState) {
            case "Normal":
                this.element.classList.add("filter-button--normal");
                break;
            case "Hovered":
                this.element.classList.add("filter-button--hovered");
                break;
            case "Active":
                this.element.classList.add("filter-button--active");
                break;
        }
    }

    private setState(newState: VisualState): void {
        if (this.visualState === newState) return;

        this.visualState = newState;
        this.updateVisual();
    }

    private updateActiveState(): void {
        const activeFilter = this.appState.getActiveFilter();
        const isActive = activeFilter === this.filterOption.category ||
            (activeFilter === null && this.filterOption.category === undefined);

        if (isActive) {
            this.setState('Active');
        } else {
            this.setState('Normal');
        }
    }

    // Handle button click
    private handleClick(): void {
        console.log("clicked");

        this.appState.setActiveFilter(this.filterOption.category || null);
    }

    private handleMouseEnter(): void {
        console.log("mouseEnter");

        if (this.visualState !== 'Active') {
            this.setState('Hovered');
        }
    }

    private handleMouseLeave(): void {
        if (this.visualState !== 'Active') {
            this.setState('Normal');
        }
    }

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

        // Subscribe to AppState changes to update active state
        this.unsubscribeCallback = this.appState.subscribe('filterChanged', () => {
            this.updateActiveState();
        });

        // Initialize active state
        this.updateActiveState();
    }

    // Cleanup method - Remove event listeners and clear references 
    public destroy(): void {
        if (this.unsubscribeCallback) {
            this.unsubscribeCallback();
            this.unsubscribeCallback = null;
        }

        this.element = null;
    }
}   