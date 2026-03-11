'use client';

import type { Category, Difficulty } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';

import { Search, X } from 'lucide-react';

const CATEGORIES: (Category | 'Tutte')[] = ['Tutte', 'Antipasti', 'Primi', 'Secondi', 'Dolci', 'Bevande'];
const DIFFICULTIES: (Difficulty | 'Tutte')[] = ['Tutte', 'Facile', 'Medio', 'Difficile'];

const difficultyChipColor: Record<string, string> = {
    Facile: 'data-[active=true]:bg-emerald-100 data-[active=true]:text-emerald-700 data-[active=true]:border-emerald-300 dark:data-[active=true]:bg-emerald-900/30 dark:data-[active=true]:text-emerald-400',
    Medio: 'data-[active=true]:bg-amber-100 data-[active=true]:text-amber-700 data-[active=true]:border-amber-300 dark:data-[active=true]:bg-amber-900/30 dark:data-[active=true]:text-amber-400',
    Difficile:
        'data-[active=true]:bg-red-100 data-[active=true]:text-red-700 data-[active=true]:border-red-300 dark:data-[active=true]:bg-red-900/30 dark:data-[active=true]:text-red-400',
    Tutte: 'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary'
};

interface RecipeFiltersProps {
    search: string;
    category: Category | 'Tutte';
    difficulty: Difficulty | 'Tutte';
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: Category | 'Tutte') => void;
    onDifficultyChange: (value: Difficulty | 'Tutte') => void;
}

export default function RecipeFilters({
    search,
    category,
    difficulty,
    onSearchChange,
    onCategoryChange,
    onDifficultyChange
}: RecipeFiltersProps) {
    const hasActiveFilters = search || category !== 'Tutte' || difficulty !== 'Tutte';

    return (
        <div className='space-y-3'>
            <div className='relative'>
                <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                <Input
                    placeholder='Cerca una ricetta...'
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className='pr-9 pl-9'
                />
                {search && (
                    <button
                        onClick={() => onSearchChange('')}
                        className='text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors'>
                        <X className='h-4 w-4' />
                    </button>
                )}
            </div>

            <div className='flex flex-wrap items-center gap-2'>
                <span className='text-muted-foreground text-xs font-medium'>Categoria:</span>
                <div className='flex flex-wrap gap-1.5'>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            data-active={category === cat}
                            onClick={() => onCategoryChange(cat as Category | 'Tutte')}
                            className={cn(
                                'rounded-full border px-3 py-1 text-xs font-medium transition-all',
                                'border-border text-muted-foreground hover:bg-accent',
                                category === cat && 'border-primary bg-primary text-primary-foreground'
                            )}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
                <span className='text-muted-foreground text-xs font-medium'>Difficoltà:</span>
                <div className='flex flex-wrap gap-1.5'>
                    {DIFFICULTIES.map((diff) => (
                        <button
                            key={diff}
                            data-active={difficulty === diff}
                            onClick={() => onDifficultyChange(diff as Difficulty | 'Tutte')}
                            className={cn(
                                'rounded-full border px-3 py-1 text-xs font-medium transition-all',
                                'border-border text-muted-foreground hover:bg-accent',
                                difficulty === diff &&
                                    diff === 'Tutte' &&
                                    'border-primary bg-primary text-primary-foreground',
                                difficulty === diff &&
                                    diff === 'Facile' &&
                                    'border-emerald-300 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
                                difficulty === diff &&
                                    diff === 'Medio' &&
                                    'border-amber-300 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                                difficulty === diff &&
                                    diff === 'Difficile' &&
                                    'border-red-300 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            )}>
                            {diff}
                        </button>
                    ))}
                </div>
            </div>

            {hasActiveFilters && (
                <Button
                    variant='ghost'
                    size='sm'
                    className='text-muted-foreground h-auto px-2 py-1 text-xs'
                    onClick={() => {
                        onSearchChange('');
                        onCategoryChange('Tutte');
                        onDifficultyChange('Tutte');
                    }}>
                    <X className='mr-1 h-3 w-3' />
                    Rimuovi filtri
                </Button>
            )}
        </div>
    );
}
