<script>
    import Modal from "../../Modal.svelte";
    import {initPerformanceStore} from "../../stores/performancesStore";
    import Form from "./Form.svelte";

    initPerformanceStore();
</script>


<Modal heading="Legg til bidrag">
    <Form />
</Modal>
