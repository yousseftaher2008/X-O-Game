# X & O Game

X & O is a rendition of the classic Tic Tac Toe game, developed to enhance my programming skills after completing the CS50X course. The game includes both friend and computer game modes, featuring an unbeatable algorithm for the computer opponent.

## Features

- *Authentication Functionality:*
  - Login Screen
  - Register Screen
  - Forgot Password Screen

- *Game Modes:*
  - Friends Game Mode
  - Computer Game Mode

- *Unbeatable Game Algorithm:* Ensures a challenging experience against the computer.

- *Gameplay Screens:*
  - Competitor Selection Screen (Option to play against a friend or computer)
  - Difficulty Selection Screen for Computer Opponent (Easy, Medium, Hard, Impossible)
  - Game Board Screen

## Development History

I completed the development of this game on January 4, 2023. The project began after I finished the CS50X course towards the end of 2022. While it served as a means to hone my skills, please note that there may be some programming errors present.

## Technologies Used

- *Frontend:*
  - HTML
  - CSS
  - JavaScript
  - [Bootstrap](https://getbootstrap.com/) - For responsive design and styling

- *Backend:*
  - Python (Flask)
  - SQLite

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Python](https://www.python.org/downloads/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)
- [SQLite](https://www.sqlite.org/download.html)

### Installation

1. *Clone the repository:*
    bash
    git clone https://github.com/yousseftaher2008/X-O-Game.git
    cd x-and-o
    

2. *Create a virtual environment and activate it:*
    bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    

3. *Install the dependencies:*
    bash
    pip install -r requirements.txt
    

4. *Set up the database:*
    bash
    flask db init
    flask db migrate -m "Initial migration."
    flask db upgrade
    

5. *Run the application:*
    bash
    flask run
    

6. *Access the application:*
    Open your web browser and go to http://127.0.0.1:5000

## Note

If you are unable to run the application, you can still see the game in action by watching this [YouTube video](https://youtu.be/S9TiQZ7sxv0).
## Acknowledgments

This game was developed after completing the [CS50X course](https://cs50.harvard.edu/x/2022/). The course was instrumental in advancing my programming skills. Thank you to the entire CS50 team and thank you David!
