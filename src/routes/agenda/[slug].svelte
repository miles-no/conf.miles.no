<script context="module">
    import ws from '../_workshops';
    export async function load({params, fetch}) {
        let slug = params.slug;
        let posts = ws.filter((x) => {
            return x.slug == slug;
        });
        let post = {};
        if(posts.length == 1) post = posts[0];
        return { 
            props: { 
                post: post
            }
        }
    }
</script>

<script>
    import Logo from '../../components/Logo.svelte';
    export let post;
</script>

<style>
    .centertext {
        text-align: center;
    }
    a {
        color: #000;
    }
    a.btn {
        font-size: 0.75em;
        border: 1px solid #000;
        background-color: #fff;
        border-radius:40px;
        -moz-border-radius:40px;
        -webkit-border-radius:40px;
    }
</style>

<div class="container">
	<Logo />
    <div class="row">
        <div class="col col-md-9">
            <hr />
            <a class="btn" href="{post.workshoplink}">Gå direkte til kodeverkstedet &gt;&gt;</a>
            <h1>{post.title}</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Dato</th>
                        <th scope="col">Sted</th>
                        <th scope="col">Tid</th>
                        <th scope="col">Format</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{post.date}</td>
                        <td>{post.room}</td>
                        <td>{post.time}</td>
                        <td>Workshop</td>
                    </tr>
                </tbody>
            </table>
            <div>
                {@html post.html}
            </div>
        </div>
        <div class="col col-md-3">
            {#each post.authors as author}
                <img src="{author.image}" alt="{author.author}" />
                <h2 class="centertext">{author.author}</h2>
            {/each}
        </div>
    </div>
</div>