# conf.miles.no

The dev branch on this project is currently hosted at: 
https://konferanser.azurewebsites.net/

https://www.pluralsight.com/guides/create-docker-images-docker-hub
# Deploy steps

0) Login with CLI

```
$ docker login
```

1) Build image

```
$ docker build -t teilin/milesconf:v2.0 teilin/milesconf:latest .
```

2) Tag image

```
$ docker tag teilin/milesconf:v2.0 teilin/milesconf:v2.0
```

3) Push til docker registry

```
$ docker push teilin/milesconf:v2.0
```

# Links

* https://www.pluralsight.com/guides/create-docker-images-docker-hub