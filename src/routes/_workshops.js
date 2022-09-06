const agenda = [
    {
        title: 'Analyser forbruket ditt med bankens API',
        slug: 'analyser-forbruket-ditt-med-bankens-api',
        conference: "[JavaZone, Booster]",
        images: ['/olav.jpeg'],
        authorConcat: 'Olav',
        authors: [
            { author: 'Olav', image: '/olav.jpeg' }
        ],
        date: '6. September',
        room: 'Workshop C',
        time: '13:30, 120 Min',
        cssclass: 'odd',
        format: 'Workshop',
        workshoplink: 'https://javazone.miles.no/',
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
        title: '100% dekningsgrad med automatisert testing sa du?',
        slug: 'hundre-prosent-dekningsgrad-med-automatisert-testing-sa-du',
        conference: "[JavaZone]",
        images: ['/gerd.png'],
        authorConcat: 'Gerd',
        authors: [
            { author: 'Gerd', image: '/gerd.png' }
        ],
        date: '7. September',
        room: 'Room 2',
        time: '10:40, 10 Min',
        format: 'Lightning talk',
        cssclass: 'odd',
        workshoplink: 'https://2022.javazone.no/#/program/2a77d106-347c-4249-b264-9d0b3b17083a',
        links: [
            'https://2022.javazone.no/#/program/2a77d106-347c-4249-b264-9d0b3b17083a',
            'https://www.miles.no/',
            'https://2022.boosterconf.no/speaker/olav-loen/'
        ],
        html: `
            <p>Med et tankesett og metodikk som dreier seg mot å levere raskere og oftere, må alle flaskehalser fjernes. Teamene har ikke tid til å vente på en tester skal bruke dager på å teste det som er utviklet etter at det er ferdig utviklet. Løsningen er da å skrive automatiserte tester. Kan man da velge å erstatte en tester med automatiserte tester?.</p>
            <p>Jeg tar utgangspunkt i testpyramiden til Martin Fowler for å se på hva som må vurderes når automatisering innføres. Så ønsker jeg å se på om automatisering virkelig kan erstatte en fysisk tester. Handler testing bare om å få et stort sett med grønne tester før produksjonssetting? Eller handler det om å ha kontroll på kvaliteten av produktet?.</p>
        `,
        keywords: [
            'PSD2'
        ]
    },
    {
        title: 'Why you should consider Web Assembly in your next frontend project',
        slug: 'Why-you-should-consider-Web-Assembly-in-your-next-frontend-project',
        conference: "[JavaZone]",
        images: ['/haakan.png'],
        authorConcat: 'Håkan',
        authors: [
            { author: 'Håkan', image: '/haakan.png' }
        ],
        date: '8. September',
        room: 'Room 6',
        time: '09:00, 45 Min',
        format: "Presentation",
        cssclass: 'odd',
        workshoplink: 'https://2022.javazone.no/#/program/4bc91229-53ff-44b1-ad7d-48fe2b555b52',
        links: [
            'https://2022.javazone.no/#/program/4bc91229-53ff-44b1-ad7d-48fe2b555b52',
            'https://www.miles.no/',
            'https://2022.boosterconf.no/speaker/olav-loen/'
        ],
        html: `
            <p>During the last decades a growing trend has been to put more and more functionality into the client by using the latest and greatest JavaScript framework. But what if we could be using native code in the browser in order to run computations faster and potentially reuse code from the backend in the frontend.</p>
            <p>Enter Web Assembly. Web assembly is a new web standard which enables you to run native code as part of your current JavaScript framework. This talk will give you a thorough understanding of what web assembly is and how you can use it in your project.</p>
            <p>We will cover a practical example writing our web assembly using Rust. We will go through everything from writing your web assembly code to publish it as a npm package and finally use it in an existing web application.</p>
            <p>This presentation is suitable for all developers interested in how they can expand their toolbox with web assembly and be able to make a sound assessment of when and how it should be used.</p>
            `,
        keywords: [
            'PSD2'
        ]
    },
    {
        title: 'Gather your party with svelte',
        slug: 'gather-your-party-with-svelte',
        conference: "[Booster]",
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
        format: "Workshop",
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