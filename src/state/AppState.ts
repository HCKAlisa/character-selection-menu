import type { AppStateEvent, CharacterCategory } from "@/shared/types";

type EventCallback = () => void;

// Singleton class to manage application state
export class AppState {
    private static instance: AppState;
    private eventListeners: Map<AppStateEvent, Set<() => void>> = new Map();
    private activeFilter: CharacterCategory | null = null;
    private showLocked: boolean = true
    private selectedCharacterId: string | null = null;

    private constructor() {
        this.eventListeners.set('filterChanged', new Set());
        this.eventListeners.set('showLockedChanged', new Set());
        this.eventListeners.set('selectedCharacterChanged', new Set());
    }

    // Get the singleton instance
    public static getInstance(): AppState {
        if (!AppState.instance) {
            AppState.instance = new AppState();
        }
        return AppState.instance;
    }

    // Getters and Setters for filter state
    public getActiveFilter(): CharacterCategory | null {
        return this.activeFilter;
    }

    public setActiveFilter(category: CharacterCategory | null): void {
        this.activeFilter = category;
        this.emit('filterChanged');
    }

    // Getters and Setters for show locked state
    public getShowLocked(): boolean {
        return this.showLocked;
    }

    public setShowLocked(showLocked: boolean): void {
        this.showLocked = showLocked;
        this.emit('showLockedChanged');
    }

    // Getters and Setters for selected character ID
    public getSelectedCharacterId(): string | null {
        return this.selectedCharacterId;
    }

    public setSelectedCharacterId(characterId: string | null): void {
        if (this.selectedCharacterId === characterId) {
            return;
        }
        this.selectedCharacterId = characterId;
        this.emit('selectedCharacterChanged');
    }

    // Subscribe to state change events
    public subscribe(event: AppStateEvent, callback: EventCallback): () => void {
        const eventListeners = this.eventListeners.get(event);
        if (eventListeners) {
            eventListeners.add(callback);
        }

        // Return unsubscribe function
        return () => {
            const listeners = this.eventListeners.get(event);
            if (listeners) {
                listeners.delete(callback);
            }
        };
    }

    // Emit event to notify all subscribers
    private emit(event: AppStateEvent): void {
        const eventListeners = this.eventListeners.get(event);
        if (eventListeners) {
            eventListeners.forEach(callback => callback());
        }
    }
}