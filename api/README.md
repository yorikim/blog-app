# Cobalt Credits
[![CircleCI](https://circleci.com/gh/cobalthq/cobalt-credits/tree/master.svg?style=svg)](https://circleci.com/gh/cobalthq/cobalt-credits/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/8eef12c4862bac96e118/maintainability)](https://codeclimate.com/repos/5d5c868aea1e1901b3004cc2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8eef12c4862bac96e118/test_coverage)](https://codeclimate.com/repos/5d5c868aea1e1901b3004cc2/test_coverage)

## Setup
1. `bundle install`
2. rake db:create
3. rake db:migrate
4. Start the web server `puma -p ${PORT}`

## Import contracts
```
rake contracts:import[<path to file>]
```
