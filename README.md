# morf

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/arduinoev3/morf)

## Deploying to Heroku

1. Ensure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and are logged in.
2. Create an application:
   ```bash
   heroku create <app-name>
   ```
3. Push the repository:
   ```bash
   git push heroku main
   ```
   Heroku will build the Angular project using the provided `heroku-postbuild` script and run the Django server with `gunicorn`.
