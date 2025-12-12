import { AppState } from '../state/AppState';
export class ToggleLock {
    private element: HTMLElement | null = null;
    private appState: AppState;
    private isShowingLocked: boolean;
    private eventHandlers: Map<string, EventListener> = new Map();
    private unsubscribeCallback: (() => void) | null = null;

    constructor() {
        this.appState = AppState.getInstance();
        this.isShowingLocked = this.appState.getShowLocked();
        this.createToggleElement();

        // Subscribe to state changes
        this.appState.subscribe('showLockedChanged', () => {
            this.isShowingLocked = this.appState.getShowLocked();
        });
    }



    private createToggleElement(): HTMLElement {
        const showLockedToggle = document.createElement("div");
        showLockedToggle.classList.add("toggle-lock");

        const checkbox = document.createElement("div");
        checkbox.classList.add("toggle-lock__checked", "toggle-lock__button");
        showLockedToggle.appendChild(checkbox);

        const textLabel = document.createElement("div");
        textLabel.classList.add("toggle-lock__label");
        textLabel.textContent = "Show locked";
        showLockedToggle.appendChild(textLabel);

        this.element = showLockedToggle;
        this.attachEventListeners();
        return this.element;

    }

    public getElement(): HTMLElement {
        if (!this.element) {
            throw new Error('Filter button element not initialized');
        }
        return this.element;
    }

    private toggleShowLocked(): void {
        this.appState.setShowLocked(!this.isShowingLocked);
        this.updateVisual();
    }

    private attachEventListeners(): void {
        if (!this.element) return;

        // Click handler
        const clickHandler = this.toggleShowLocked.bind(this);
        this.eventHandlers.set("click", clickHandler);
        this.element.addEventListener("click", clickHandler);

        this.unsubscribeCallback = this.appState.subscribe('showLockedChanged', () => {
            this.isShowingLocked = this.appState.getShowLocked();
        });
    }

    private updateVisual(): void {
        if (!this.element) return;

        const checkbox = this.element.querySelector(".toggle-lock__button");
        if (!checkbox) return;

        // Update checkbox visual based on state
        if (this.isShowingLocked) {
            checkbox.classList.remove("toggle-lock__empty");
            checkbox.classList.add("toggle-lock__checked");
        } else {
            checkbox.classList.remove("toggle-lock__checked");
            checkbox.classList.add("toggle-lock__empty");
        }
    }

    // Cleanup method - Remove event listeners and clear references
    public destroy(): void {
        // Remove event listeners
        this.eventHandlers.forEach((handler, event) => {
            this.element?.removeEventListener(event, handler);
        });
        this.eventHandlers.clear();

        // Unsubscribe from AppState
        if (this.unsubscribeCallback) {
            this.unsubscribeCallback();
            this.unsubscribeCallback = null;
        }

        this.element = null;
    }


}