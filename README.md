# webtorrent-server-browser
test torrent.createServer using service worker

# Motivation
Using html video MSE to decode/encode a video in order to support streaming/seaking with javascript is a bit slow.
doing it that way also means we have to support more containers manually. 

Serving a file directly to a video element as if where a regular url will let the browser handle seeking, making range request, and encode it much faster.
