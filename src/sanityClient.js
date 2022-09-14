import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: 'mhv8s2ia',
  dataset: 'production',
  apiVersion: "2022-03-24",
  // useCdn: true,
});

export default client;