export interface Todo {
    id?: string; // optional because it's not needed on create
    title: string;
    description: string;
    day: string;
    completed: boolean;
}
