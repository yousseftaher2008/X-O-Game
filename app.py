import os
import random

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from help import login_required

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True




# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///xo.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username") or not request.form.get("password"):
            return render_template("login.html", massege = "Must Enter All Of The Following",check = False)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1:
            return render_template("login.html", massege = "Invalid 'USERNAME'",check = False)
        if not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return render_template("login.html", massege = "Invalid 'PASSWORD'",check = False)
        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html", massege = "Enter The Following", check = "no")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

@app.route("/forget", methods=["GET", "POST"])
def forget():
    if (request.method == "POST"):
        username = request.form.get("username")
        code = request.form.get("code")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        rows = db.execute("SELECT * FROM users WHERE username = ?", username)
        if not username or not password or not confirmation or not code:
            return render_template("forget.html", massege = "Must Enter All Of The Following", check = False)
        if password != confirmation:
            return render_template("forget.html", massege = "Must The 'PASSWORD' = 'PASSWORD AGAIN'", check = False)
        if len(rows) != 1:
            return render_template("forget.html", massege = "Invalid 'USERNAME'",check = False)

        if not check_password_hash(rows[0]["code"], code):
            return render_template("forget.html", massege = "Invalid 'CODE'",check = False)


        hash = generate_password_hash(password)
        code = get_code()
        db.execute("UPDATE users SET hash = ?, code = ? where username = ?", hash, generate_password_hash(code), username)
        return render_template("login.html", massege1 = "SUCCESS!", massege2 = "Enter The Following", check = True, code = code)
    else:
        return render_template("forget.html", massege = "Enter The Following", check = True)

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if (request.method == "POST"):
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        rows = db.execute("SELECT * FROM users WHERE username = ?", username)
        if len(rows) != 0:
            return render_template("register.html", massege="The 'USERNAME' Is Already Taken")
        if not username or not password or not confirmation:
            return render_template("register.html", massege = "Must Enter All Of The Following", check = False)
        if password != confirmation:
            return render_template("register.html", massege = "Must The 'PASSWORD' = 'PASSWORD AGAIN'", check = False)
        code = get_code()
        hash = generate_password_hash(password)


        try:
            db.execute("INSERT INTO users (username, hash, code) VALUES(?, ?, ?)", username, hash, generate_password_hash(code))
            return render_template("login.html", massege1 = "SUCCESS!", massege2 = "Enter The Following", check = True, code = code)
        except:
            return redirect("/register")
    else:
        return render_template("register.html", massege = "Enter The Following", check = True)


@app.route("/game", methods=["GET", "POST"])
@login_required
def game():
    """Buy shares of stock"""
    if request.method == "POST":
        player = request.form.get("player")
        if (not player):
            return render_template("mode.html", mode = 0, check = 1, massege="You should enter a mode")
        if player == "player":
            return render_template("game.html", massege="2")
        if player == "computer":
            return render_template("mode.html", mode = 1, check = 0)
        if player == "easy":
            return render_template("game.html", massege="e")
        if player == "medium":
            return render_template("game.html", massege="m")
        if player == "hard":
            return render_template("game.html", massege="h")
        if player == "imp":
            return render_template("game.html", massege="i")

        return render_template("mode.html", mode = 0, check = 1, massege="You should enter a true mode")
    else:
        return render_template("mode.html", mode = 0, check = 0)

@app.route("/")
def goto():
    if not session:
        return redirect("/login")
    return redirect("/game")


if __name__ == '__main__':
    app.run(debug=True)


def get_code():
    code = ""
    for _ in range(6):
        code += str(random.randint(0,10))
    return code