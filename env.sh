#!/bin/bash

# Define and set NGINX resolvers dynamically
echo resolver $(awk 'BEGIN{ORS=" "} $1=="nameserver" {print $2}' /etc/resolv.conf) ";" > /etc/nginx/resolvers.conf

# Recreate config file
rm -rf ./public/env-config.js
touch ./public/env-config.js

# Add assignment
echo "window._env_ = {" >> ./public/env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./public/env-config.js
done < /usr/src/app/.env

echo "}" >> ./public/env-config.js