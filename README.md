# Podcast App

The Podcast App is a web application that allows users to explore and listen to podcasts. Users can view a list of podcasts, sort them, select individual shows, and play episodes. The app also provides a favorites feature, allowing users to mark their favorite episodes.

## Features

- View a list of podcasts with their titles, images, number of seasons, genres, and last updated date.
- Sort podcasts by title (A-Z or Z-A) or last updated date (newest or oldest).
- Search for specific podcasts using a search bar.
- View detailed information about a selected podcast, including its seasons and episodes.
- Play episodes with an audio player that displays the current playback time and duration.
- Mark episodes as favorites and view a list of all favorite episodes.
- Responsive design to ensure a seamless experience on different devices.

## Tech Stack

The Podcast App is built using the following technologies:

- React.js: Front-end JavaScript library for building user interfaces.
- Fuse.js: A lightweight fuzzy-search library for the search functionality.
- CSS: Styling the components and layout of the application.

## Setup

1. Clone the repository to your local machine.

```bash
git clone https://github.com/your-username/podcast-app.git
```

2. Install dependencies using npm or yarn.

```bash
cd podcast-app
npm install
```

3. Start the development server.

```bash
npm start
```

The application will run at `http://localhost:3000/`.

## Components

The Podcast App is structured using various functional components:

- `App`: The main component that renders the entire application. It fetches the podcast data from an external API, sorts and filters the podcasts, and handles the selected show details.
- `AudioPlayer`: A component responsible for the audio player functionality, allowing users to play, pause, seek, and display the current playback time and duration.
- `Card`: Represents a card containing information about a podcast show.
- `Episodes`: Displays information about an episode, including its title, description, and options to play and mark as a favorite.
- `Navbar`: The navigation bar component displaying the logo and navigation links (Home Page, Genres, and Favorites).
- `SearchBar`: The input field component for searching within the application.
- `SeasonCard`: Represents a card displaying information about a season of a TV show.
- `ShowDetails`: The component responsible for displaying detailed information about a TV show, including seasons and episodes.

## Usage

1. When the application is loaded, it will fetch the podcast data from an external API and display a list of podcasts.

2. The user can sort the podcasts either alphabetically (A-Z or Z-A) or by the last updated date (newest or oldest) using the provided sorting buttons.

3. The user can use the search bar to find specific podcasts. The search functionality is implemented using fuzzy-search, so the user can input partial titles to get relevant results.

4. Clicking on a podcast card will display detailed information about the show, including its seasons and episodes.

5. In the detailed view, the user can click on a season to view its episodes. The user can also click on an episode to play it using the audio player component.

6. While playing an episode, the audio player will display the current playback time and the total duration of the episode. The user can also seek to a specific time in the episode using the slider.

7. The user can mark episodes as favorites by clicking the heart icon on each episode card. The favorite episodes will be added to the "All Favorites" section in the detailed view.

8. The user can click on the "Favorites" link in the navigation bar to view all favorite episodes separately.

## Contributions

Contributions to the Podcast App are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

The Podcast App is open-source software licensed under the MIT License. Feel free to use, modify, and distribute the code as per the terms of the MIT License. See the `LICENSE` file for more details.

## Author 

Keabetswe Maurice Montsho

## Wireframe

https://www.figma.com/file/CbgFr91TLCWHjcp1WEvPK6/Podcastwire-Frame?type=design&node-id=23%3A180&mode=design&t=LZ1LGIigetKKjqlL-1

## LINK

    https://64c7d26f2d663311b5576d9a--gleeful-cocada-47c036.netlify.app/