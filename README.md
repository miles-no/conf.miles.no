# conf.miles.no

## Development

### Enviroments

| Enviroment | Url |
| :--: | :--: |
| Development | (https://konferanser.azurewebsites.net/)[https://konferanser.azurewebsites.net/] |
| Production | (https://conf.miles.no/)[https://conf.miles.no/] |

### Getting started

The conference application store data in [Sanity]() using the [Sanity JS Client](https://www.sanity.io/docs/js-client). It fetches data from [CVPartner](https://cv.miles.no) to get information about office locations and people.

In the root of the project, there is a `.env.example` file that need to be cloned and named `.env`. In this file all the secrets that need to be set should go. For the API-token, ask to get one.

The development branch (dev branch) is where all development is happening. On every checking to this branch there is triggered a Github Action that build and deploy the application to the development site on Azure.

### Sanity

...

### CVPartner

...

# Release

The live producion of the site is hosted on [conf.miles.no](https://conf.miles.no) and to release a new version, create a new branch with prefix `releases/` (example `releases/v2.0.1`). Then this will be published to the production enviroment.

# Conributors

* Olav Loen
* Brynjar
* Yngve
* Øyvind
* Teis