'use client';

import { useMemo, useState } from 'react';

import RecipeCard from '@/components/recipe-card';
import RecipeFilters from '@/components/recipe-filters';
import RecipeForm from '@/components/recipe-form';
import { useRecipes } from '@/lib/recipes-store';
import type { Category, Difficulty, Recipe } from '@/lib/types';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';

import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

function RecipeGridSkeleton() {
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='overflow-hidden rounded-xl border'>
                    <Skeleton className='h-36 w-full' />
                    <div className='space-y-3 p-4'>
                        <Skeleton className='h-4 w-3/4' />
                        <Skeleton className='h-3 w-full' />
                        <Skeleton className='h-3 w-2/3' />
                        <div className='flex gap-2'>
                            <Skeleton className='h-5 w-16 rounded-full' />
                            <Skeleton className='h-5 w-14 rounded-full' />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function HomePage() {
    const { recipes, loaded, addRecipe, updateRecipe, toggleFavorite } = useRecipes();

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<Category | 'Tutte'>('Tutte');
    const [difficulty, setDifficulty] = useState<Difficulty | 'Tutte'>('Tutte');
    const [formOpen, setFormOpen] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

    const filtered = useMemo(() => {
        return recipes.filter((r) => {
            const matchSearch =
                !search ||
                r.title.toLowerCase().includes(search.toLowerCase()) ||
                r.description.toLowerCase().includes(search.toLowerCase()) ||
                r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
            const matchCategory = category === 'Tutte' || r.category === category;
            const matchDifficulty = difficulty === 'Tutte' || r.difficulty === difficulty;

            return matchSearch && matchCategory && matchDifficulty;
        });
    }, [recipes, search, category, difficulty]);

    const handleSave = (data: Omit<Recipe, 'id' | 'createdAt' | 'favorite'>) => {
        if (editingRecipe) {
            updateRecipe(editingRecipe.id, data);
            toast.success('Ricetta aggiornata!');
        } else {
            addRecipe(data);
            toast.success('Ricetta aggiunta!');
        }
        setEditingRecipe(null);
    };

    const openAdd = () => {
        setEditingRecipe(null);
        setFormOpen(true);
    };

    return (
        <main className='mx-auto max-w-6xl px-4 py-8'>
            <div className='mb-6 flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>Le mie Ricette</h1>
                    {loaded && (
                        <p className='text-muted-foreground mt-0.5 text-sm'>
                            {recipes.length} {recipes.length === 1 ? 'ricetta' : 'ricette'} nel libro
                        </p>
                    )}
                </div>
                <Button onClick={openAdd} className='gap-2'>
                    <PlusCircle className='h-4 w-4' />
                    Nuova ricetta
                </Button>
            </div>

            <div className='mb-6'>
                <RecipeFilters
                    search={search}
                    category={category}
                    difficulty={difficulty}
                    onSearchChange={setSearch}
                    onCategoryChange={setCategory}
                    onDifficultyChange={setDifficulty}
                />
            </div>

            {!loaded ? (
                <RecipeGridSkeleton />
            ) : filtered.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-24 text-center'>
                    <div className='mb-4 text-6xl'>{recipes.length === 0 ? '📖' : '🔍'}</div>
                    <h3 className='mb-2 text-lg font-semibold'>
                        {recipes.length === 0 ? 'Il libro è vuoto' : 'Nessuna ricetta trovata'}
                    </h3>
                    <p className='text-muted-foreground mb-6 text-sm'>
                        {recipes.length === 0
                            ? 'Aggiungi la tua prima ricetta per iniziare!'
                            : 'Prova a modificare i filtri o la ricerca.'}
                    </p>
                    {recipes.length === 0 && (
                        <Button onClick={openAdd} className='gap-2'>
                            <PlusCircle className='h-4 w-4' />
                            Aggiungi ricetta
                        </Button>
                    )}
                </div>
            ) : (
                <>
                    {search || category !== 'Tutte' || difficulty !== 'Tutte' ? (
                        <p className='text-muted-foreground mb-4 text-sm'>
                            {filtered.length} {filtered.length === 1 ? 'risultato' : 'risultati'}
                        </p>
                    ) : null}
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {filtered.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />
                        ))}
                    </div>
                </>
            )}

            <RecipeForm
                open={formOpen}
                onOpenChange={(open) => {
                    setFormOpen(open);
                    if (!open) setEditingRecipe(null);
                }}
                onSave={handleSave}
                editing={editingRecipe}
            />
        </main>
    );
}
