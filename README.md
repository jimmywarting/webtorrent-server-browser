# webtorrent-server-browser
test torrent.createServer using service worker

demo: https://jimmywarting.github.io/webtorrent-server-browser/

# Motivation
Using html video MSE to decode/encode a video in order to support streaming/seaking with javascript is a bit slow.
doing it that way also means we have to support more containers manually. 

Serving a file directly to a video element as if where a regular url will let the browser handle seeking, making range request, and encode it much faster. that probably also means more support for other media containers

Doing it this would make you wonder if you even need this packages at all:

- mp4-box-encoding
- mp4-stream
- mediasource
- render-media
- videostream
- range-slice-stream
- stream-to-blob-url
