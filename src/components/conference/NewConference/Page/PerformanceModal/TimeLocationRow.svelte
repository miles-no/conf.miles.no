<script>
import JustifiedRow from "../../../../form/JustifiedRow.svelte";
import SveltyPicker from 'svelty-picker';

let value=undefined;

$: {
    console.log(value)
}
</script>

<div class="timelocation-row">
    <JustifiedRow>
        <SveltyPicker bind:value={value} mode="time" startView=3 clearBtn={false} manualInput={true} format="hh:ii" displayFormat="hh:ii"></SveltyPicker>
    </JustifiedRow>
</div>
