export interface Todo {
    id: number; // optional because it's not needed on create
    title: string;
    description: string;
    day: string;
    completed: boolean;
}
