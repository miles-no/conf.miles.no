<script context="module">
    export async function load({params, fetch}) {
        let slug = params.slug;
        return { 
            props: { 
                slug: slug
            }
        }
    }
</script>

<script>
    export let slug;
</script>

<style>
</style>

<h1>{slug}</h1>