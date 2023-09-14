<script lang="ts">
    import Form from "./Form.svelte";
    import Preview from "./Preview.svelte";

    import darkTheme from "../../../../stores/theme-store";
</script>


<div class="edit-and-preview-row" class:dark-mode={$darkTheme}>
    <Form />
    <div class="preview-col">
        <Preview/>
    </div>
</div>




<style lang="scss">
  .edit-and-preview-row {
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  @media only screen and (min-width: 1325px) {
    .preview-col {
      flex-basis: calc(400px + 4rem);
    }
  }

  @media only screen and (max-width: 1324px) {
    .preview-col {
      width: 100%;
    }
    .edit-and-preview-row {
      flex-direction: column;

      :global(.new-conf-edit) {
        border-right: none;
        padding-right: 0;
      }
      :global(.new-conf-preview) {
        margin-top: 40px;
        margin-bottom: 40px;
        margin-left: auto;
      }
    }
  }

  @media only screen and (max-width: 760px) {
    .edit-and-preview-row {
      :global(.new-conf-preview) {
        margin-right: auto;
      }
    }
  }

  .dark-mode {
    :global(.previewPlaceholder) {
      background-color: rgba(255, 255, 255, 0.38);
    }

    :global(.new-conf-edit),
    :global(.new-conf-preview) {
      border-color: rgba(255, 255, 255, 0.38);
    }
  }
</style>
