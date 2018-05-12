from flask import Flask, session, render_template, request, redirect, url_for, flash
import data_manager

app = Flask(__name__)

@app.route('/')
def index ():
    return render_template('index.html', session=session)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/login',methods=['post'])
def log_in():
    name = request.form.get('name')
    password = request.form.get('password')
    all_username = data_manager.get_all_username()
    for username in all_username:
        if username == name:
            return render_template('login.html', error=True)
    return render_template('index.html', session=session)

@app.route('/logout')
def logout():
    session['name'] = ''
    return redirect('/')


if __name__ == '__main__':
    app.secret_key = 'totally_randomized_strin'
    app.run(
        port=7000,
        debug=True,
    )