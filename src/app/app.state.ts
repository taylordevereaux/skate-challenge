export class AppState {
    entries: Entry[]
    showBack: boolean = false
}

export class Entry {
    day: number;
    time: number;
    notes: string = '';
};
