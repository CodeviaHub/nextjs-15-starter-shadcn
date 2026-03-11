'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useTheme } from 'next-themes';

import { Button } from '@/registry/new-york-v4/ui/button';

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className='h-9 w-9' />;

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle theme'>
            {theme === 'dark' ? (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <path d='M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7' />
                </svg>
            ) : (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <path d='M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z' />
                </svg>
            )}
        </Button>
    );
}

export default function Navbar() {
    return (
        <header className='bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm'>
            <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-4'>
                <Link href='/' className='flex items-center gap-2 text-lg font-semibold'>
                    <span>📖</span>
                    <span>Recipe Book</span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}
