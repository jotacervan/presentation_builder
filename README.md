# Presentation Builder

Presentation Builder is a software that helps you create amazing presentations.

## Installation

Make sure you have ImageMagick on your machine:

OSX
```bash
brew install imagemagick
```

Linux
```bash
apt-get install imagemagick
```

Inside of the application dir execute a bundle install, create and migrate your database.

```bash
bundle install
rails db:create db:migrate
```

Run rails server
```bash
rails s
```

## Docker ( Check the To-do list below )

If you prefer you can use docker to run the application, just follow the steps below:

1. Change the host from database url to localhost
```
development:
  <<: *default
  host: localhost
```

2. Build and run docker container
```bash
docker-compose build
docker-compose run web rails db:create db:migrate
docker-compose up
```

## Tests

To run tests execute the following command in the application directory

```
rspec spec
```

If you are using docker

```
docker-compose run web rspec spec
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## Next Steps

There are some steps in order to deploy this project to production, feel free to start a discussion.

**To-do List:**
1. Finish docker configurations, some tests are not passing because of the version of phantomJS ( Locally it works ).
2. Configure redis and sidekiq to upload and export the presentation.
3. Finish layout of user auth pages.
4. Finish conversion of PDF into Images.
5. Finish audio recorder plugin to support recording audio directly from the browser.
6. Finish the export script with Rubyzip, and create a new manifest file.
7. Track presentations view, to show the correct metrics.
8. All changes are recorded with paper-trail, but it is needed to finish the script to rollback changes, and show the history at the show pages.
9. Create an unlogged page for the visitors to watch the presentations and register for a newsletter.
10. Persist the order when drag and drop slides.

## License
[MIT](https://choosealicense.com/licenses/mit/)