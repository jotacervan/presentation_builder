FROM ruby:2.6.3

RUN apt-get update -qq && apt-get install -y libpq-dev build-essential nodejs postgresql-client imagemagick
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

RUN yarn global add phantomjs-prebuilt

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN gem install bundler
RUN bundle install

RUN yarn install
