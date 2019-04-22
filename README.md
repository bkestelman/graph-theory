# graph-theory

graph-theory is an easy way to draw graphs (the ones with vertices and edges, not functions). Users can connect to a graph-theory server through their browser and see the graph made by all other users connected to the same server. 

A demo graph-theory server is running (hopefully!) at http://192.81.214.140

Left-click to add a vertex, right-click to delete. Edges are added automatically

Feel free to open issues for bug reports or feature requests!

## Setup

There are two ways you can run your own graph-theory server:
1. Use Docker (recommended)
2. Use your own web server 

Read on for more details:

## Option 1: Use Docker

We assume you have Docker installed.
```
git clone https://github.com/bkestelman/graph-theory
cd graph-theory
docker build . -f Dockerfile -t graph-theory
bash docker_run.sh [TAG] [HTTP_PORT] [NODEJS_PORT] # defaults are latest, 80, 3000
```
Or
```
docker pull bkestelman/graph-theory
# Set ports and HOST_IP as desired (localhost to test locally)
docker run -it -p 80:80 -p 3000:3000 --env HOST_IP=localhost --env HTTP_PORT=80 --env NODEJS_PORT=3000 bkestelman/graph-theory
```
Go to your server's public ip in your browser (or localhost if running locally) and start drawing. If using a public ip, your friends can join in too!

## Option 2: Use your own web server 

:warning: These instructions are outdated

We assume you have Nginx installed on Ubuntu with default configuration and site root /var/www/html. If your setup is different, adjust the commands accordingly.

1. Clone the graph-theory repo
```
cd /var/www/
git clone https://github.com/bkestelman/graph-theory
```

2. Configure a new site

a. Make a copy of /etc/nginx/sites-available/default for the graph-theory site 
```
cp /etc/nginx/sites-available/{default,graph-theory}
```
b. Modify the site root to point to the graph-theory html root 
Open /etc/nginx/sites-available/graph-theory with your favorite text editor and change `root /var/www/html` to `root /var/www/graph-theory/html`

c. Change the enabled site to point to graph-theory
```
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-{available,enabled}/graph-theory 
```

3. Run the setup.sh script
```
cd /var/www/graph-theory
bash setup.sh
```
The file `html/template.html` references `${SERVER_IP}` and `${SERVER_PORT}`. These are meaningless in html, but the setup.sh script replaces them with your server's ip address and the port where the node.js server will run (currently hard coded to 3000). 

Go to your server's public ip (or localhost if you're running locally) to see the site.

The static site is up, but there's no communication between users yet. 

4. Start the node.js server

a. Install npm dependencies
```
( cd sock-server; npm install )
```
b. Start the node server
```
node sock-server/server.js &
```

Now, open the site in multiple tabs or windows and check that drawing on one updates the others. Try with your friends!
