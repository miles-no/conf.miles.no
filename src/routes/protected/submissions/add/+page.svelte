<script>
    import { PortableText } from '@portabletext/svelte';
    import { enhance } from "$app/forms";
    export let form;
</script>

<h1>Legg til innlegg</h1>

<form method="post" action="?/create" type="multipart/form-data" use:enhance>
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="title">Tittel</span>
                <input type="text" name="title" class="form-control" placeholder="Tittel" aria-label="Tittel" aria-describedby="title">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="mb-3">
                <select class="form-select" aria-label="Submission type" name="type">
                    <option selected>Velg innleggstype</option>
                    <option value="lightningTalk">Lightning talk</option>
                    <option value="presentation">Presentation</option>
                    <option value="workshop">Workshop</option>
                </select>
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text">Varighet</span>
                <input type="number" name="duration" class="form-control" aria-label="Varighet (i minutter)">
                <span class="input-group-text">minutter</span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text">Beskrivelse</span>
                <textarea class="form-control" aria-label="Beskrivelse" name="description"></textarea>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <h2>Forfattere</h2>
        </div>
        <div class="col">
            <button>Legg til forfatter</button>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <input type="text" class="form-control" name="email" placeholder="Miles e-mail" aria-label="Forfatter email" aria-describedby="email">
                <span class="input-group-text" id="email">@miles.no</span>
            </div>
        </div>
    </div>
    <div class="row">
        <button type="submit">Legg til</button>
    </div>
</form>