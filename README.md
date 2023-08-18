# FestivalPlanner

==This project is currently deployed [here!](https://www.example.com)==

This is a hobby project which allows users to see upcoming festivals in Finland. It uses data from various festival sources to provide a comprehensive list of upcoming festivals, along with detailed information such as location, dates, lineup, and ticket prices.

## Features

* Users can see festivals based on their location
* Users can filter festivals based on various parameters
* Users can see festival information and can proceed to their websites.
* Users can listen to snippets from the featuring artists.

# Technologies used

* Next.js 13
* Typescript
* Tailwind CSS
* PocketBase
* Spotify API

# Installation

## Prerequisites

* Node.js (development build uses v18.17.1.)

## Clone the repository

    git clone https://github.com/WalMaa/FestivalPlanner.git

Change into the project directory

## Install dependencies 

    npm install

## Get Spotify API key

If you want to see the artist previews, you need to get spotify API keys and supply them to the api class through an env. file

## Start the development server

 Open your web browser and navigate to http://localhost:3000. You should see the project running!

# Project Status

This project is actively being developed. The latest version is  `v.0.5.0`

## Current Features
* Allows users to see upcoming festivals on a timeline
* Allows users to see listed festivals based on city
* Allows users to see featuring artists and listen to their audio snippets
* Allows users to search for festivals

## Known issues
* Location buttons do not scale properly on mobile

# Release History
* `V.0.5.0` - User can search festivals and open the locations through search. (14-08-2023)
* `V.0.4.0` - Streamlined UI. (13-08-2023)
* `V.0.3.1` - Enhanced responsitivity for mobile. (23-06-2023)
* `V.0.3.0` - Users can select a location and see the festivals and artists.
* `V.0.2.2` - Upcoming festivals bar implemented.
* `V.0.2.1` - Pocketbase integration.
* `V.0.1.1` - Initial UI and data structure. Changed Firebase to PocketBase due to the need for only a simple relational database solution. (18-05-2023)
* `V.0.1.0` - Project initialization (14-05-2023)
