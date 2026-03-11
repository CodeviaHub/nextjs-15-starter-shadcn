'use client';

import { use, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import RecipeForm from '@/components/recipe-form';
import { useRecipes } from '@/lib/recipes-store';
import type { Difficulty, Recipe } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/registry/new-york-v4/ui/alert-dialog';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Separator } from '@/registry/new-york-v4/ui/separator';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs';

import { ArrowLeft, Clock, Heart, Pencil, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';

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

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { recipes, loaded, updateRecipe, deleteRecipe, toggleFavorite } = useRecipes();
    const [formOpen, setFormOpen] = useState(false);

    const recipe = recipes.find((r) => r.id === id);

    const handleSave = (data: Omit<Recipe, 'id' | 'createdAt' | 'favorite'>) => {
        updateRecipe(id, data);
        toast.success('Ricetta aggiornata!');
    };

    const handleDelete = () => {
        deleteRecipe(id);
        toast.success('Ricetta eliminata');
        router.push('/');
    };

    if (!loaded) {
        return (
            <main className='mx-auto max-w-3xl px-4 py-8'>
                <Skeleton className='mb-6 h-8 w-24' />
                <Skeleton className='mb-4 h-48 w-full rounded-2xl' />
                <Skeleton className='mb-2 h-8 w-1/2' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='mt-2 h-4 w-3/4' />
            </main>
        );
    }

    if (!recipe) {
        return (
            <main className='mx-auto max-w-3xl px-4 py-8 text-center'>
                <div className='py-24'>
                    <div className='mb-4 text-6xl'>🍽️</div>
                    <h2 className='mb-2 text-xl font-semibold'>Ricetta non trovata</h2>
                    <p className='text-muted-foreground mb-6 text-sm'>
                        Questa ricetta potrebbe essere stata eliminata.
                    </p>
                    <Button asChild>
                        <Link href='/'>Torna al libro</Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className='mx-auto max-w-3xl px-4 py-8'>
            <div className='mb-6 flex items-center justify-between'>
                <Button variant='ghost' size='sm' className='gap-1.5' asChild>
                    <Link href='/'>
                        <ArrowLeft className='h-4 w-4' />
                        Indietro
                    </Link>
                </Button>
                <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => toggleFavorite(recipe.id)}>
                        <Heart
                            className={cn(
                                'h-5 w-5 transition-colors',
                                recipe.favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                            )}
                        />
                    </Button>
                    <Button variant='outline' size='sm' className='gap-1.5' onClick={() => setFormOpen(true)}>
                        <Pencil className='h-4 w-4' />
                        Modifica
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant='outline'
                                size='sm'
                                className='text-destructive hover:text-destructive gap-1.5'>
                                <Trash2 className='h-4 w-4' />
                                Elimina
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Elimina ricetta</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Sei sicuro di voler eliminare &quot;{recipe.title}&quot;? Questa azione non può
                                    essere annullata.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annulla</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className='bg-destructive hover:bg-destructive/90 text-white'>
                                    Elimina
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div
                className={cn(
                    'mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br py-12 text-8xl',
                    categoryGradient[recipe.category] ?? 'from-gray-100 to-gray-50'
                )}>
                {recipe.emoji}
            </div>

            <div className='mb-6'>
                <div className='mb-2 flex flex-wrap items-center gap-2'>
                    <Badge variant='secondary'>{recipe.category}</Badge>
                    <Badge className={cn('border-0', difficultyColor[recipe.difficulty])}>{recipe.difficulty}</Badge>
                    {recipe.tags.map((tag) => (
                        <Badge key={tag} variant='outline' className='text-xs'>
                            {tag}
                        </Badge>
                    ))}
                </div>

                <h1 className='mb-2 text-3xl font-bold'>{recipe.title}</h1>
                <p className='text-muted-foreground'>{recipe.description}</p>
            </div>

            <div className='mb-6 flex items-center gap-6'>
                <div className='flex items-center gap-2 rounded-xl border px-4 py-3'>
                    <Clock className='text-muted-foreground h-5 w-5' />
                    <div>
                        <p className='text-muted-foreground text-xs'>Tempo</p>
                        <p className='font-semibold'>{formatTime(recipe.time)}</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 rounded-xl border px-4 py-3'>
                    <Users className='text-muted-foreground h-5 w-5' />
                    <div>
                        <p className='text-muted-foreground text-xs'>Porzioni</p>
                        <p className='font-semibold'>{recipe.servings}</p>
                    </div>
                </div>
            </div>

            <Separator className='mb-6' />

            <Tabs defaultValue='ingredients'>
                <TabsList className='mb-6 w-full'>
                    <TabsTrigger value='ingredients' className='flex-1'>
                        Ingredienti ({recipe.ingredients.length})
                    </TabsTrigger>
                    <TabsTrigger value='steps' className='flex-1'>
                        Procedimento ({recipe.steps.length} passi)
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='ingredients'>
                    <ul className='space-y-2'>
                        {recipe.ingredients.map((ing, i) => (
                            <li key={i} className='flex items-center gap-3 rounded-lg border px-4 py-3'>
                                <span className='text-muted-foreground min-w-16 text-sm font-medium'>{ing.amount}</span>
                                <Separator orientation='vertical' className='h-4' />
                                <span className='text-sm'>{ing.name}</span>
                            </li>
                        ))}
                    </ul>
                </TabsContent>

                <TabsContent value='steps'>
                    <ol className='space-y-4'>
                        {recipe.steps.map((step, i) => (
                            <li key={i} className='flex gap-4'>
                                <div className='bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold'>
                                    {i + 1}
                                </div>
                                <div className='flex-1 rounded-lg border px-4 py-3'>
                                    <p className='text-sm leading-relaxed'>{step}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </TabsContent>
            </Tabs>

            <RecipeForm open={formOpen} onOpenChange={setFormOpen} onSave={handleSave} editing={recipe} />
        </main>
    );
}
