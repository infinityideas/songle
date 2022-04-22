# Songle

This project was made by Darius (infinityideas) and was inspired by [Heardle](https://heardle.app). 

## How to make a copy
This project is licensed under GNU's Lesser General Public License. This means that you are free to copy, modify, and distribute the code (with some limitations; check out the license file for more).

**Note:** This program uses animations from the GSAP library (GreenSock, Inc). Some of these animations require a valid BusinessGreen license to use (SVG animations, etc). You are free to buy your own license and paste in your token into a .npmrc file. Certain animations, including the green progress bar in the music player, uses one of these animations and the program **will not work** unless you have the appropriate license.

## Frameworks
Songle relies on React (Facebook, Inc.) for frontend, Flask (Pallets) for backend, Pusher (MessageBird, Inc.) for realtime services, Postgres (The PostgreSQL Global Development Group) for database software. Access to music and playlists is provided by Deezer. Hosting for SongleDB, SongleFlask, and SongleCors (a fork from cors-anywhere) are run on Heroku with Songle itself being hosted on Vercel under a custom domain.
