const agenda = [
    {
        title: 'Analyser forbruket ditt med bankens API',
        slug: 'analyser-forbruket-ditt-med-bankens-api',
        images: ['/olav.jpeg'],
        authorConcat: 'Olav',
        authors: [
            { author: 'Olav', image: '/olav.jpeg' }
        ],
        date: '25. mars',
        room: 'Dræggen 3',
        time: '10:45',
        cssclass: 'odd',
        workshoplink: 'https://booster.miles.no/',
        links: [
            'https://2022.boosterconf.no/talk/101-analyser-forbruket-ditt-med-bankens-api/',
            'https://www.miles.no/',
            'https://2022.boosterconf.no/speaker/olav-loen/'
        ],
        html: `
            <p>Bli din egen økonomirådviger med din egen kode og få praktisk erfaring med PSD2. I løpet av de siste årene har bankene vært nødt til å tilby deg data om dine bankkonti for å oppfylle kravene til PSD2. Hvordan denne informasjonen kan brukes er opp til deg, men første steg er å hente ut dine data. Noen banker tilbyr allerede mulighet til å se saldo på konti i andre banker, men for å bli din egen økonomirådgiver trenger du litt mer.</p>
            <p>I dette 90 minutters kodeverkstedet får du mulighet til å hente ut informasjon om ditt forbruk fra dine banker ved hjelp av eksempelkode og veiledning, slik at du kan sammenligne forbruket ditt med alminnelige forbruksutgifter (SIFOs referansebudsjett).</p>
        `,
        keywords: [
            'PSD2'
        ]
    },
    {
        title: 'Gather your party with svelte',
        slug: 'gather-your-party-with-svelte',
        images: [
            '/dagerik.jpeg',
            '/alexander.jpeg'
        ],
        authorConcat: 'Dag Erik og Alexander',
        authors: [
            { author: 'Dag Erik Løvgren', image: '/dagerik.jpeg' },
            { author: 'Alexander Castillo', image: '/alexander.jpeg' }
        ],
        date: '24. mars',
        room: 'Dræggen 8',
        time: '09:00',
        cssclass: 'even',
        workshoplink: 'https://github.com/miles-no/booster2022-gather-your-party-with-svelte',
        links: [
            'https://www.miles.no/',
            'https://2022.boosterconf.no/speaker/dag-erik-l%C3%B8vgren/',
            'https://2022.boosterconf.no/talk/62-gather-your-party-with-svelte/'
        ],
        html: `
            <p>In this workshop we will take you through the basic concepts of Svelte. We'll do this by making our own Character Creator! If you're not familiar with the concept, a character creator is a tool for making a fictional character using a variety of features. Examples of features: Inputting name, rolling stats, selecting abilities, uploading portrait, selecting appearance, writing bio, etc. Here's a <a href='http://basicfantasy.andrewcooperonline.com/'>simple example</a>, and here's a more <a href='https://www.dungeonmastersvault.com/pages/dnd/5e/character-builder'>advanced example</a>.</p>
            <p>The workshop will start off with an introduction to Svelte and the app we will be building. The workshop will then proceed with building the app through several step. And here's where the learning comes in: each step is designed to showcase a certain feature of Svelte. And don't worry if you fall behind on a step, we'll have code ready for you to skip to the next step.</p>
            <p>We'll finish the workshop by taking a look at our work and comparing Svelte and its features against other popular web technologies, such as React.</p>
            <p>Throughout the workshop Alexander and Dag Erik will be available for questions, help, or just a chat.</p>
            <p>We hope you find this interesting, and can't wait to see you!</p>
            <p>- Alexander Castillo and Dag Erik Løvgren.</p>
        `,
        keywords: [
            'Svelte'
        ]
    }
];

agenda.forEach(workshop => {
    workshop.html = workshop.html.replace(/^\t{3}/gm, '');
});

export default agenda;