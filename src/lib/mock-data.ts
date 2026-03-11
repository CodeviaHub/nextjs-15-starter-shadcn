import type { Recipe } from '@/lib/types';

export const MOCK_RECIPES: Recipe[] = [
    {
        id: '1',
        title: 'Spaghetti alla Carbonara',
        description: 'La ricetta tradizionale romana con guanciale, uova e pecorino. Cremosa e saporita.',
        category: 'Primi',
        difficulty: 'Medio',
        time: 30,
        servings: 4,
        emoji: '🍝',
        favorite: true,
        createdAt: new Date('2024-01-10').toISOString(),
        tags: ['romano', 'pasta', 'tradizionale'],
        ingredients: [
            { amount: '400g', name: 'Spaghetti' },
            { amount: '200g', name: 'Guanciale' },
            { amount: '4', name: "Tuorli d'uovo" },
            { amount: '100g', name: 'Pecorino Romano grattugiato' },
            { amount: 'q.b.', name: 'Pepe nero macinato' },
            { amount: 'q.b.', name: 'Sale grosso' }
        ],
        steps: [
            'Tagliate il guanciale a listarelle e fatelo rosolare in padella a fuoco medio fino a quando non diventa croccante.',
            'In una ciotola, mescolate i tuorli con il pecorino grattugiato e abbondante pepe nero.',
            'Cuocete gli spaghetti in abbondante acqua salata fino a cottura al dente.',
            'Trasferite gli spaghetti direttamente nella padella con il guanciale (fuoco spento), aggiungendo un mestolo di acqua di cottura.',
            'Versate il composto di uova e mescolate velocemente, aggiungendo altra acqua di cottura per ottenere la cremosità desiderata.',
            'Servite immediatamente con altro pecorino e pepe.'
        ]
    },
    {
        id: '2',
        title: 'Pizza Margherita',
        description: 'La regina delle pizze: pomodoro, mozzarella e basilico fresco su un impasto soffice e croccante.',
        category: 'Secondi',
        difficulty: 'Difficile',
        time: 120,
        servings: 4,
        emoji: '🍕',
        favorite: false,
        createdAt: new Date('2024-01-15').toISOString(),
        tags: ['napoletana', 'forno', 'pizza'],
        ingredients: [
            { amount: '500g', name: 'Farina 00' },
            { amount: '300ml', name: 'Acqua tiepida' },
            { amount: '7g', name: 'Lievito di birra secco' },
            { amount: '10g', name: 'Sale' },
            { amount: '2 cucchiai', name: "Olio extravergine d'oliva" },
            { amount: '400g', name: 'Pomodori pelati' },
            { amount: '250g', name: 'Mozzarella fiordilatte' },
            { amount: 'q.b.', name: 'Basilico fresco' }
        ],
        steps: [
            "Sciogliete il lievito nell'acqua tiepida e lasciate riposare 5 minuti.",
            "Mescolate la farina con il sale, aggiungete l'acqua con il lievito e l'olio. Impastate per 10 minuti.",
            "Lasciate lievitare l'impasto coperto per almeno 2 ore in luogo tiepido.",
            'Schiacciate i pomodori pelati con le mani e condite con sale e olio.',
            "Stendete l'impasto su una teglia oleata, distribuite il pomodoro e infornate a 250°C per 10 minuti.",
            'Aggiungete la mozzarella a pezzi e infornate altri 5 minuti. Terminate con basilico fresco.'
        ]
    },
    {
        id: '3',
        title: 'Tiramisù Classico',
        description: 'Il dolce italiano per eccellenza. Strati di savoiardi inzuppati nel caffè e crema al mascarpone.',
        category: 'Dolci',
        difficulty: 'Facile',
        time: 30,
        servings: 6,
        emoji: '🍰',
        favorite: true,
        createdAt: new Date('2024-01-20').toISOString(),
        tags: ['dolce', 'caffè', 'mascarpone', 'classico'],
        ingredients: [
            { amount: '500g', name: 'Mascarpone' },
            { amount: '4', name: 'Uova' },
            { amount: '100g', name: 'Zucchero' },
            { amount: '200g', name: 'Savoiardi' },
            { amount: '300ml', name: 'Caffè espresso freddo' },
            { amount: 'q.b.', name: 'Cacao amaro in polvere' },
            { amount: '2 cucchiai', name: 'Marsala (facoltativo)' }
        ],
        steps: [
            'Separate i tuorli dagli albumi. Montate i tuorli con lo zucchero fino a ottenere un composto chiaro e spumoso.',
            'Aggiungete il mascarpone ai tuorli montati e mescolate delicatamente.',
            "Montate gli albumi a neve ferma e incorporateli alla crema con movimenti dal basso verso l'alto.",
            'Inzuppate velocemente i savoiardi nel caffè (con marsala se gradito) e disponete uno strato in una teglia.',
            'Coprite con metà crema al mascarpone, poi un altro strato di savoiardi inzuppati.',
            'Terminate con la crema restante, livellate e spolverizzate abbondantemente con cacao amaro.',
            'Refrigerate per almeno 4 ore (meglio tutta la notte) prima di servire.'
        ]
    },
    {
        id: '4',
        title: 'Bruschetta al Pomodoro',
        description: 'Antipasto semplice e fresco con pane tostato, pomodori maturi e basilico profumato.',
        category: 'Antipasti',
        difficulty: 'Facile',
        time: 15,
        servings: 4,
        emoji: '🍅',
        favorite: false,
        createdAt: new Date('2024-02-01').toISOString(),
        tags: ['veloce', 'estivo', 'fresco', 'vegetariano'],
        ingredients: [
            { amount: '8 fette', name: 'Pane casereccio' },
            { amount: '4', name: 'Pomodori maturi' },
            { amount: '2 spicchi', name: 'Aglio' },
            { amount: 'q.b.', name: 'Basilico fresco' },
            { amount: '4 cucchiai', name: "Olio extravergine d'oliva" },
            { amount: 'q.b.', name: 'Sale e pepe' }
        ],
        steps: [
            'Tostate le fette di pane sulla griglia o in un tostapane fino a doratura.',
            'Tagliate i pomodori a cubetti piccoli, eliminate i semi e conditeli con olio, sale e basilico spezzettato.',
            "Strofinate le fette di pane ancora calde con gli spicchi d'aglio tagliati a metà.",
            "Distribuite il condimento di pomodoro sulle fette e aggiungete un filo d'olio a crudo.",
            'Servite subito per mantenere la croccantezza del pane.'
        ]
    },
    {
        id: '5',
        title: 'Risotto ai Funghi Porcini',
        description: 'Risotto cremoso con funghi porcini secchi e freschi, dal profumo intenso e inconfondibile.',
        category: 'Primi',
        difficulty: 'Medio',
        time: 45,
        servings: 4,
        emoji: '🍄',
        favorite: false,
        createdAt: new Date('2024-02-10').toISOString(),
        tags: ['risotto', 'funghi', 'autunnale'],
        ingredients: [
            { amount: '320g', name: 'Riso Carnaroli' },
            { amount: '30g', name: 'Funghi porcini secchi' },
            { amount: '200g', name: 'Funghi porcini freschi (o champignon)' },
            { amount: '1', name: 'Cipolla piccola' },
            { amount: '1 bicchiere', name: 'Vino bianco secco' },
            { amount: '1.2L', name: 'Brodo vegetale caldo' },
            { amount: '50g', name: 'Parmigiano Reggiano grattugiato' },
            { amount: '30g', name: 'Burro' },
            { amount: 'q.b.', name: 'Olio extravergine, sale e prezzemolo' }
        ],
        steps: [
            'Mettete i funghi secchi in ammollo in acqua tiepida per 20 minuti, poi strizzateli e tritate grossolanamente.',
            "Filtrate l'acqua di ammollo e aggiungetela al brodo caldo.",
            'Soffriggete la cipolla tritata con olio, aggiungete i funghi freschi e secchi e cuocete 5 minuti.',
            'Tostate il riso nel soffritto, sfumate con il vino bianco e lasciate evaporare.',
            'Aggiungete il brodo caldo un mestolo alla volta, mescolando frequentemente, per circa 18 minuti.',
            'A fuoco spento, mantecate con burro e parmigiano. Aggiustate di sale e aggiungete prezzemolo tritato.'
        ]
    },
    {
        id: '6',
        title: 'Limonata Fresca Menta',
        description: "Bevanda rinfrescante con limoni freschi, menta e un tocco di zucchero. Perfetta d'estate.",
        category: 'Bevande',
        difficulty: 'Facile',
        time: 10,
        servings: 4,
        emoji: '🍋',
        favorite: false,
        createdAt: new Date('2024-02-15').toISOString(),
        tags: ['estivo', 'fresco', 'analcolico', 'veloce'],
        ingredients: [
            { amount: '4', name: 'Limoni (succo e buccia)' },
            { amount: '1L', name: 'Acqua frizzante' },
            { amount: '4 cucchiai', name: 'Zucchero (o miele)' },
            { amount: '1 mazzo', name: 'Menta fresca' },
            { amount: 'q.b.', name: 'Ghiaccio' }
        ],
        steps: [
            'Spremi il succo di tutti i limoni e grattugia la buccia di uno.',
            'Sciogli lo zucchero in poca acqua calda per creare uno sciroppo semplice.',
            'In una brocca, combina il succo di limone, la scorza grattugiata e lo sciroppo.',
            "Aggiungi le foglie di menta e schiaccia leggermente con un cucchiaio per rilasciare l'aroma.",
            "Versa l'acqua frizzante, aggiungi ghiaccio abbondante e mescola delicatamente.",
            'Servi in bicchieri alti decorati con una fetta di limone e foglie di menta fresca.'
        ]
    }
];
