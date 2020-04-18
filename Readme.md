# librarycallhistory

## Installation

Add dependencies into package.json

```INSTALLATION
"call-hist-lib": "github:mahesh-co1/librarycallhistory.git"
```


## Usage

```js

const baseUrl =
  "https://staging-framework.blinkin.io/v1/calls/get-own-call-logs";
const fileBasePath =
  "https://blinkin-staging.s3.eu-central-1.amazonaws.com/public/images/chat_images/";
const getFiles = "https://staging-framework.blinkin.io/v1/calls/get-files/";

import React, { Component } from "react";
import CallHistory from "call-hist-lib";
class Example extends Component {
  render() {
   return (
    <CallHistory
      baseUrl={baseUrl}
      fileBasePath={fileBasePath}
      getFiles={getFiles}
      fetchAPI={fetchAPI}
    />
  );
  }
}
```
## URL Props details

**baseUrl** = For api request  
**get_files** = get image name and extension for particular room_id  
**file_base_path** = Api for getting images of particular room_id  

## Handling FetchAPI call props
```js
let fetchAPI = async (url) => {
  let response = await fetch(url, myHeaders);
  let res = await response.json();
  return res;
};
```

## License

MIT © [Maheshss1](https://github.com/Maheshss1)
