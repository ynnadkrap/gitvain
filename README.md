# gitvain
Git your repo's vanity metrics

example (displays stats from react repo): https://gitvain.herokuapp.com/

![example](https://raw.githubusercontent.com/ynnadkrap/gitvain/master/demo.png)

# overview
This repo contains the necessary pieces to display a repo's stats on a web page. It calculates the number of PRs opened,
comments, commits, line additions and deletions for each user for a given date range.

The server is built with express and the front end built with create-react-app. Is react unnecessary for such a simple UI? yeah.
If you only want the script, you can just take `script.js`.

# usage
The following env vars are required (alternatively you can hardcode the values in `script.js`):<br/>
`GITVAIN_TOKEN` (https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)<br/>
`GITVAIN_ORG`<br/>
`GITVAIN_REPO`<br/>

install dependences in the top level and client:<br/>
`yarn`<br/>
`cd client && yarn`<br/>

run:<br/>
`node index.js`<br/>
`cd client && yarn start`<br/>

visit `localhost:3000`

# docker
There's a dockerfile included in case you're into that kinda stuff

# caveats
This is subject to github APIs rate limiting and I haven't written any code to account for it, yet.
