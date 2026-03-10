'use client';

import { useEffect } from 'react';

import type { Recipe } from '@/lib/types';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { ScrollArea } from '@/registry/new-york-v4/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from '@/registry/new-york-v4/ui/sheet';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';

import { Minus, Plus } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const recipeSchema = z.object({
    title: z.string().min(2, 'Minimo 2 caratteri'),
    description: z.string().min(10, 'Minimo 10 caratteri'),
    emoji: z.string().min(1, 'Inserisci un emoji'),
    category: z.enum(['Antipasti', 'Primi', 'Secondi', 'Dolci', 'Bevande']),
    difficulty: z.enum(['Facile', 'Medio', 'Difficile']),
    time: z.number().min(1, 'Almeno 1 minuto'),
    servings: z.number().min(1, 'Almeno 1 porzione'),
    tags: z.string(),
    ingredients: z
        .array(
            z.object({ amount: z.string().min(1, 'Campo obbligatorio'), name: z.string().min(1, 'Campo obbligatorio') })
        )
        .min(1, 'Aggiungi almeno un ingrediente'),
    steps: z
        .array(z.object({ value: z.string().min(1, 'Il passo non può essere vuoto') }))
        .min(1, 'Aggiungi almeno un passo')
});

type FormValues = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: Omit<Recipe, 'id' | 'createdAt' | 'favorite'>) => void;
    editing?: Recipe | null;
}

function toFormValues(recipe: Recipe): FormValues {
    return {
        title: recipe.title,
        description: recipe.description,
        emoji: recipe.emoji,
        category: recipe.category,
        difficulty: recipe.difficulty,
        time: recipe.time,
        servings: recipe.servings,
        tags: recipe.tags.join(', '),
        ingredients: recipe.ingredients,
        steps: recipe.steps.map((s) => ({ value: s }))
    };
}

const defaultValues: FormValues = {
    title: '',
    description: '',
    emoji: '🍽️',
    category: 'Primi',
    difficulty: 'Facile',
    time: 30,
    servings: 4,
    tags: '',
    ingredients: [{ amount: '', name: '' }],
    steps: [{ value: '' }]
};

export default function RecipeForm({ open, onOpenChange, onSave, editing }: RecipeFormProps) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(recipeSchema),
        defaultValues
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient
    } = useFieldArray({ control, name: 'ingredients' });

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({ control, name: 'steps' });

    useEffect(() => {
        if (open) {
            reset(editing ? toFormValues(editing) : defaultValues);
        }
    }, [open, editing, reset]);

    const onSubmit = (values: FormValues) => {
        onSave({
            title: values.title,
            description: values.description,
            emoji: values.emoji,
            category: values.category,
            difficulty: values.difficulty,
            time: values.time,
            servings: values.servings,
            tags: values.tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            ingredients: values.ingredients,
            steps: values.steps.map((s) => s.value)
        });
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className='flex w-full flex-col gap-0 p-0 sm:max-w-lg'>
                <SheetHeader className='border-b px-6 py-4'>
                    <SheetTitle>{editing ? 'Modifica ricetta' : 'Nuova ricetta'}</SheetTitle>
                    <SheetDescription>
                        {editing ? 'Aggiorna i dettagli della tua ricetta.' : 'Aggiungi una nuova ricetta al libro.'}
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className='flex-1'>
                    <form id='recipe-form' onSubmit={handleSubmit(onSubmit)} className='space-y-5 px-6 py-4'>
                        <div className='flex gap-3'>
                            <div className='w-20 shrink-0'>
                                <Label htmlFor='emoji'>Emoji</Label>
                                <Input id='emoji' {...register('emoji')} className='mt-1.5 text-center text-2xl' />
                                {errors.emoji && <p className='mt-1 text-xs text-red-500'>{errors.emoji.message}</p>}
                            </div>
                            <div className='flex-1'>
                                <Label htmlFor='title'>Titolo</Label>
                                <Input
                                    id='title'
                                    placeholder='Es. Pasta al pesto'
                                    {...register('title')}
                                    className='mt-1.5'
                                />
                                {errors.title && <p className='mt-1 text-xs text-red-500'>{errors.title.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor='description'>Descrizione</Label>
                            <Textarea
                                id='description'
                                placeholder='Descrivi brevemente la ricetta...'
                                rows={2}
                                {...register('description')}
                                className='mt-1.5 resize-none'
                            />
                            {errors.description && (
                                <p className='mt-1 text-xs text-red-500'>{errors.description.message}</p>
                            )}
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <Label>Categoria</Label>
                                <Select
                                    value={watch('category')}
                                    onValueChange={(v) => setValue('category', v as FormValues['category'])}>
                                    <SelectTrigger className='mt-1.5'>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['Antipasti', 'Primi', 'Secondi', 'Dolci', 'Bevande'].map((c) => (
                                            <SelectItem key={c} value={c}>
                                                {c}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Difficoltà</Label>
                                <Select
                                    value={watch('difficulty')}
                                    onValueChange={(v) => setValue('difficulty', v as FormValues['difficulty'])}>
                                    <SelectTrigger className='mt-1.5'>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['Facile', 'Medio', 'Difficile'].map((d) => (
                                            <SelectItem key={d} value={d}>
                                                {d}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <Label htmlFor='time'>Tempo (minuti)</Label>
                                <Input
                                    id='time'
                                    type='number'
                                    min={1}
                                    {...register('time', { valueAsNumber: true })}
                                    className='mt-1.5'
                                />
                                {errors.time && <p className='mt-1 text-xs text-red-500'>{errors.time.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor='servings'>Porzioni</Label>
                                <Input
                                    id='servings'
                                    type='number'
                                    min={1}
                                    {...register('servings', { valueAsNumber: true })}
                                    className='mt-1.5'
                                />
                                {errors.servings && (
                                    <p className='mt-1 text-xs text-red-500'>{errors.servings.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor='tags'>Tag (separati da virgola)</Label>
                            <Input
                                id='tags'
                                placeholder='pasta, veloce, vegetariano...'
                                {...register('tags')}
                                className='mt-1.5'
                            />
                        </div>

                        <div>
                            <div className='mb-2 flex items-center justify-between'>
                                <Label>Ingredienti</Label>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    className='h-7 gap-1 px-2 text-xs'
                                    onClick={() => appendIngredient({ amount: '', name: '' })}>
                                    <Plus className='h-3.5 w-3.5' /> Aggiungi
                                </Button>
                            </div>
                            {errors.ingredients?.root && (
                                <p className='mb-2 text-xs text-red-500'>{errors.ingredients.root.message}</p>
                            )}
                            <div className='space-y-2'>
                                {ingredientFields.map((field, index) => (
                                    <div key={field.id} className='flex items-center gap-2'>
                                        <Input
                                            placeholder='Quantità'
                                            {...register(`ingredients.${index}.amount`)}
                                            className='w-24 shrink-0'
                                        />
                                        <Input
                                            placeholder='Ingrediente'
                                            {...register(`ingredients.${index}.name`)}
                                            className='flex-1'
                                        />
                                        {ingredientFields.length > 1 && (
                                            <Button
                                                type='button'
                                                variant='ghost'
                                                size='icon'
                                                className='text-muted-foreground h-8 w-8 shrink-0'
                                                onClick={() => removeIngredient(index)}>
                                                <Minus className='h-4 w-4' />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className='mb-2 flex items-center justify-between'>
                                <Label>Procedimento</Label>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    className='h-7 gap-1 px-2 text-xs'
                                    onClick={() => appendStep({ value: '' })}>
                                    <Plus className='h-3.5 w-3.5' /> Aggiungi passo
                                </Button>
                            </div>
                            {errors.steps?.root && (
                                <p className='mb-2 text-xs text-red-500'>{errors.steps.root.message}</p>
                            )}
                            <div className='space-y-2'>
                                {stepFields.map((field, index) => (
                                    <div key={field.id} className='flex items-start gap-2'>
                                        <span className='text-muted-foreground mt-2.5 w-5 shrink-0 text-center text-xs font-medium'>
                                            {index + 1}.
                                        </span>
                                        <Textarea
                                            placeholder={`Passo ${index + 1}...`}
                                            rows={2}
                                            {...register(`steps.${index}.value`)}
                                            className='flex-1 resize-none'
                                        />
                                        {stepFields.length > 1 && (
                                            <Button
                                                type='button'
                                                variant='ghost'
                                                size='icon'
                                                className='text-muted-foreground mt-1 h-8 w-8 shrink-0'
                                                onClick={() => removeStep(index)}>
                                                <Minus className='h-4 w-4' />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </ScrollArea>

                <SheetFooter className='border-t px-6 py-4'>
                    <Button variant='outline' onClick={() => onOpenChange(false)}>
                        Annulla
                    </Button>
                    <Button type='submit' form='recipe-form'>
                        {editing ? 'Aggiorna ricetta' : 'Salva ricetta'}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
