'use client';

import { useCallback, useEffect, useState } from 'react';

import { MOCK_RECIPES } from '@/lib/mock-data';
import type { Recipe } from '@/lib/types';

const STORAGE_KEY = 'recipe-book-data';

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setRecipes(JSON.parse(stored));
        } else {
            setRecipes(MOCK_RECIPES);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_RECIPES));
        }
        setLoaded(true);
    }, []);

    const persist = useCallback((updated: Recipe[]) => {
        setRecipes(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }, []);

    const addRecipe = useCallback(
        (data: Omit<Recipe, 'id' | 'createdAt' | 'favorite'>) => {
            const newRecipe: Recipe = {
                ...data,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                favorite: false
            };
            persist([newRecipe, ...recipes]);

            return newRecipe;
        },
        [recipes, persist]
    );

    const updateRecipe = useCallback(
        (id: string, data: Partial<Omit<Recipe, 'id' | 'createdAt'>>) => {
            persist(recipes.map((r) => (r.id === id ? { ...r, ...data } : r)));
        },
        [recipes, persist]
    );

    const deleteRecipe = useCallback(
        (id: string) => {
            persist(recipes.filter((r) => r.id !== id));
        },
        [recipes, persist]
    );

    const toggleFavorite = useCallback(
        (id: string) => {
            persist(recipes.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r)));
        },
        [recipes, persist]
    );

    return { recipes, loaded, addRecipe, updateRecipe, deleteRecipe, toggleFavorite };
}
