# FestivalPlanner

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

# Installation

## Prerequisites

* Node.js (development build uses v16.14.2.)

## Clone the repository

    git clone https://github.com/WalMaa/FestivalPlanner.git

Change into the project directory

## Install dependencies 

    npm install
    
## Start the PocketBase server

 Navigate to the pocketbase directory on a separate CLI and enter the following command:
 
    pocketbase serve

## Start the development server

 Open your web browser and navigate to http://localhost:3000. You should see the project running!

# Project Status

This project is actively being developed. The latest version is  `v.0.2.2`

## Current Features
* Allows users to see upcoming festivals on a timeline

## Known issues
* Upcoming

# Release History
* `V.0.2.2` - Upcoming festivals bar implemented.
* `V.0.2.1` - Pocketbase integration.
* `V.0.1.1` - Initial UI and data structure. Changed Firebase to PocketBase due to the need for only a simple relational database solution. (18-05-2023)
* `V.0.1.0` - Project initialization (14-05-2023)
