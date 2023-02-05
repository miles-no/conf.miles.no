<script>
	import { enhance } from "$app/forms";
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<h1>Legg til konferanse</h1>

<form method="post" action="?/create" use:enhance>
  <div class="mb-3">
    <label for="inputTitle" class="form-label">Navn</label>
    <input type="text" class="form-control" name="inputTitle" id="inputTitle" aria-describedby="titleHelp">
    <div id="titleHelp" class="form-text">Navn på konferanse</div>
  </div>
  <div class="mb-3">
    <label for="inputSlug" class="form-label">Slug</label>
    <input type="text" class="form-control" name="inputSlug" id="inputSlug">
  </div>
  <div class="mb-3">
    <label for="inputStartDate" class="form-label">Start</label>
    <input type="date" class="form-control" name="inputStartDate" id="inputStartDate">
  </div>
  <div class="mb-3">
    <label for="inputEndDate" class="form-label">Slutt</label>
    <input type="date" class="form-control" name="inputEndDate" id="inputEndDate">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" name="inputInternal" id="inputInternal">
    <label class="form-check-label" for="inputInternal">Internkonferanse</label>
  </div>
  <div class="mb-3">
    <label for="inputImage" class="form-label">Logo</label>
    <input type="file" class="form-control" name="inputImage" id="inputImage">
  </div>
  <div class="mb-3">
    <label for="inputAlttext" class="form-label">Alternativ tekst logo</label>
    <input type="text" class="form-control" name="inputAlttext" id="inputAlttext">
  </div>
  <div class="mb-3">
    <label for="inputHomepage" class="form-label">Nettside</label>
    <input type="url" class="form-control" name="inputUrl" id="inputUrl">
  </div>
  <button type="submit" class="btn btn-primary">Legg til</button>
</form>