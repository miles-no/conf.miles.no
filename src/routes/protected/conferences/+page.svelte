<script>
    export let data = {}
    console.log(data);
</script>

<h1>Konferanser</h1>

<div class="row">
    <div class="col">
        <a class="btn btn-primary" href="/protected/conferences/add" role="button">Legg til konferanse</a>
    </div>
</div>

{#each data.conferences as conference}
<div class="row">
    <div class="col"><a href="{conference.url}" target="_blank">{conference.title}</a></div>
    <div class="col">{conference.startDate}</div>
    <div class="col">
        <a class="btn btn-outline-primary" href="#" role="button">Interesser</a>
        <a class="btn btn-outline-primary" href="#" role="button">Påmeldt</a>
        <a class="btn btn-outline-primary" href="/protected/conferences/{conference._id}" role="button">Rediger</a>
    </div>
</div>
{/each}