# Setup

Two options for serving the site:
1. Use your own web server 
2. Use a Docker image

More details:

Option 1: Using your own web server

We assume you have Nginx installed with default configuration and site root /var/www/html. If your setup is different, adjust the following commands accordingly.

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
Open /etc/nginx/sites-available/graph-theory with your favorite text editor (vim) and change `root /var/www/html` to `root /var/www/graph-theory/html`

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
The file `html/template.html` has contains the shell variables `${SERVER_IP}` and `${SERVER_PORT}`. These are meaningless in html, but the setup.sh script will replace them with your server's ip address and the (currently hard-coded to 3000) port where the node.js server will run. 

Go to your server's public ip (or localhost if you're running locally) to see the site.

4. Start the node.js server
The static site is up, but there's no communication between users yet. 
a. Install npm dependencies
( cd sock-server; npm install )
b. Start the node server
node sock-server/server.js &

Now, open the site in multiple tabs or windows and check that drawing on one updates the others. Try with your friends!

Option 2: Using Docker 

:construction: under construction... :construction:
