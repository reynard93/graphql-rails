# syntax=docker/dockerfile:1
# check=error=true

# This Dockerfile is designed for production, not development. Use with Kamal or build'n'run by hand:
# docker build -t rails_grain_graphql .
# docker run -d -p 80:80 -e RAILS_MASTER_KEY=<value from config/master.key> --name rails_grain_graphql rails_grain_graphql

# For a containerized dev environment, see Dev Containers: https://guides.rubyonrails.org/getting_started_with_devcontainer.html

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version
ARG RUBY_VERSION=3.3.6
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Install base packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips sqlite3 nodejs npm && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy application code
COPY . /rails_grain_graphql

# Work from project directory
WORKDIR /rails_grain_graphql

# Run npm commands
RUN npm install
RUN npm run build

# Switch to rails directory
WORKDIR /rails_grain_graphql/rails
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    RAILS_SERVE_STATIC_FILES="1" \
    BUNDLE_WITHOUT="development"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Copy application code
COPY . .

# Final stage for app image
FROM base

# Copy built artifacts: gems, application
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails_grain_graphql/rails .
COPY --from=build /rails_grain_graphql/public ./public

# Install foreman globally in the final stage
RUN gem install foreman

# Entrypoint prepares the database.
ENTRYPOINT ["./bin/docker-entrypoint"]

# Replace the existing CMD with foreman
CMD ["foreman", "start", "-f", "Procfile.prod"]

# Port will be set by environment variable
EXPOSE 3000