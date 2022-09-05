<script>
    export let startdate;
    export let enddate;
</script>

<style>
    #dateposition {
        position: absolute;
        right: 0;
        top: 50%;
        width: 300px;
        margin-right: -100px;
    }
    #conferencedate {
        font-family: 'Work Sans', sans-serif;
        font-weight: bold;
        font-size: 2em;
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
    }
</style>

<div id="dateposition">
    <div id="conferencedate">
        {startdate} - {enddate}
    </div>
</div>