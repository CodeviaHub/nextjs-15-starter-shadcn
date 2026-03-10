export type Category = 'Antipasti' | 'Primi' | 'Secondi' | 'Dolci' | 'Bevande';

export type Difficulty = 'Facile' | 'Medio' | 'Difficile';

export interface Ingredient {
    amount: string;
    name: string;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    category: Category;
    difficulty: Difficulty;
    time: number;
    servings: number;
    ingredients: Ingredient[];
    steps: string[];
    tags: string[];
    favorite: boolean;
    createdAt: string;
    emoji: string;
}
