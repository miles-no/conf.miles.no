# conf.miles.no

## Development

### Enviroments

| Enviroment | Url |
| :--: | :--: |
| Development | [https://konferanser.azurewebsites.net/](https://konferanser.azurewebsites.net/) |
| Production | [https://conf.miles.no/](https://conf.miles.no/) |

### Getting started

The conference application store data in [Sanity]() using the [Sanity JS Client](https://www.sanity.io/docs/js-client). It fetches data from [CVPartner](https://cv.miles.no) to get information about office locations and people.

In the root of the project, there is a `.env.example` file that need to be cloned and named `.env`. In this file all the secrets that need to be set should go. For the API-token, ask to get one.

The development branch (dev branch) is where all development is happening. On every checking to this branch there is triggered a Github Action that build and deploy the application to the development site on Azure.

### Secrets

All secrets needed for the application is located in the `.env` while developing this appliation. In the repository, there is a `.env.example` file that have all the entries needed, but no values. The complete `.env` file with the secret values is available in a [Google Drive](https://drive.google.com/drive/folders/1IFwHncCpfLgUwE10GgP3MLh95MUTXpuF?usp=share_link) folder that I have shared with the `Miles` group.

Go and download the file and place that in the root of the project. Never check that file into Github. It is located in the `.gitignore` file.

### Sanity

If missing access to Sanity, post a message in the Slack channel with your `@miles.no` email and one with access will give you access.

In the `/lib/` folder, there is one `sanityClient.js` file that have functions to fetch documents from Sanity. Since fetching for data do not need a token, that is directly in the `/lib` folder and the functions can run on the client-side and server-side. There is another `sanityClient.js` located in `/lib/server` folder. All lib files in `/lib/server` is SvelteKit's ay to ensure that the functions run on the server-side only. Since this client is setup with the Sanity token, this is where the functions that create, path and delete documents is happening.

### CVPartner

The API-key for CVPartner is located in the `.env` file. There is created api endpoints in `/api/cvpartner` to fetch data from the CVPartner API and transform the response to just what is needed for the application. The application itself can then fetch the API endpoint in this project and not needed to fetch the CVPartner API directly.

# Release

The live producion of the site is hosted on [conf.miles.no](https://conf.miles.no) and to release a new version, create a new branch with prefix `releases/` (example `releases/v2.0.1`). Then this will be published to the production enviroment.