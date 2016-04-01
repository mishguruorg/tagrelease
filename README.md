# tagrelease
Uses the version in your package.json to tag releases to various environments for ci/deployment.

## Installation

This module is installed via npm:

``` bash
$ npm install -g tagrelease
```

## Example Usage

```
>> npm version major
>> # v2.0.0
>> tagrelease internal --nopush
>> # internal-v2.0.0
>> git push origin master --tags
>> # pushed tags v2.0.0, internal-v2.0.0
>> tagrelease production
>> # production-v2.0.0
>> # pushed tags production-v2.0.0 to origin master
>> tagrelease qa -r someremote -b somebranch
>> # pushed tags qa-v2.0.0 to someremote somebranch
```
