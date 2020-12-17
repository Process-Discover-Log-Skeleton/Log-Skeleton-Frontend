<h1 align="center">Log-Skeleton-Frontend</h1>

<h3 align="center"> Status </h3>

<p align="center">
  <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Process-Discover-Log-Skeleton/Log-Skeleton-Frontend">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/Process-Discover-Log-Skeleton/Log-Skeleton-Frontend">
</p>

#### 📄 Documentation

The project provides a documentation in the [GitHub Wiki](https://github.com/Process-Discovery-Log-Skeleton/Log-Skeleton-Frontend/wiki) page of this project. 

#### 👷‍♀️ Installation & Setup

This project requires `node.js`, `npm` and `python 3.8` to run as  intended. The Web-App is build using `React`.

###### Setup of the development environment

- Download and install `node.js`

- Install the dependencies via

    ```
    >>> cd log-skeleton
    >>> npm install
    ```

###### Setup of the production environment

The project provides a `flask` webserver that is able to serve the `javascript` bundle build with `react-scripts`.

- Download and install `python 3.8`
- To install `flask` run:
    ```
    >>> pip install flask
    ```

#### 🚀 Deploy the webserver

The project provides two different ways to serve the application:
1. 🐳 Deploy as a Docker container
2. 🐍 Deploy as a plain python application

##### 🐳 Deployment using a Docker container

In order to run the webserver in a `docker` container, follow the given steps:

###### Prerequisite
Docker is required on your system to follow the deployment steps. In case you have not installed it yet, please head over to [Docker's website](http://docker.com/) and install it.

###### 1. Build the web-bundle

To build the `javascript` bundle that the server will serve run the following commads:
```
>>> cd log-skeleton
>>> npm run build
```
These commands generate a directory called `build` the 
`/server/` directory of the project.

###### 2. Build the docker container

To build the docker container run:

```
>>> docker build .
```

###### 3. Run the docker container

Run the container with the following command:
```
// Replace `<PORT>` with the port the application should listen on.
>>> docker run -p <PORT>:<PORT> -e PORT=<PORT> <id-of-the-container>
```

##### 🐍 Deploy as a plain python application

In order to run the application as a python app without a container.

###### 1. Build the web-bundle

To build the `javascript` bundle that the server will serve run the following commads:
```
>>> cd log-skeleton
>>> npm run build
```
These commands generate a directory called `build` the 
`/server/` directory of the project.

###### 2. Run the webserver

Run the webserver with the following command:
```
>>> python -m server.server
```


