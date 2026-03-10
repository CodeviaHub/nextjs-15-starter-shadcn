'use client';

import Link from 'next/link';

import type { Difficulty, Recipe } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardFooter } from '@/registry/new-york-v4/ui/card';

import { Clock, Heart, Users } from 'lucide-react';

const difficultyColor: Record<Difficulty, string> = {
    Facile: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Medio: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Difficile: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
};

const categoryGradient: Record<string, string> = {
    Antipasti: 'from-orange-100 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10',
    Primi: 'from-yellow-100 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/10',
    Secondi: 'from-red-100 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10',
    Dolci: 'from-pink-100 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/10',
    Bevande: 'from-sky-100 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/10'
};

function formatTime(minutes: number): string {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

interface RecipeCardProps {
    recipe: Recipe;
    onToggleFavorite: (id: string) => void;
}

export default function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
    return (
        <Card className='group overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'>
            <Link href={`/${recipe.id}`} className='block'>
                <div
                    className={cn(
                        'flex h-36 items-center justify-center bg-gradient-to-br text-6xl',
                        categoryGradient[recipe.category] ?? 'from-gray-100 to-gray-50'
                    )}>
                    {recipe.emoji}
                </div>
            </Link>

            <CardContent className='p-4'>
                <div className='mb-2 flex items-start justify-between gap-2'>
                    <Link href={`/${recipe.id}`} className='flex-1'>
                        <h3 className='group-hover:text-primary line-clamp-1 font-semibold transition-colors'>
                            {recipe.title}
                        </h3>
                    </Link>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='h-7 w-7 shrink-0'
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleFavorite(recipe.id);
                        }}>
                        <Heart
                            className={cn(
                                'h-4 w-4 transition-colors',
                                recipe.favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                            )}
                        />
                    </Button>
                </div>

                <p className='text-muted-foreground mb-3 line-clamp-2 text-sm'>{recipe.description}</p>

                <div className='flex flex-wrap gap-1.5'>
                    <Badge variant='secondary' className='text-xs'>
                        {recipe.category}
                    </Badge>
                    <Badge className={cn('border-0 text-xs', difficultyColor[recipe.difficulty])}>
                        {recipe.difficulty}
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className='text-muted-foreground border-t px-4 py-3'>
                <div className='flex w-full items-center justify-between text-xs'>
                    <span className='flex items-center gap-1'>
                        <Clock className='h-3.5 w-3.5' />
                        {formatTime(recipe.time)}
                    </span>
                    <span className='flex items-center gap-1'>
                        <Users className='h-3.5 w-3.5' />
                        {recipe.servings} {recipe.servings === 1 ? 'porzione' : 'porzioni'}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}
