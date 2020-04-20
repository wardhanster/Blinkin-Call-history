# librarycallhistory

## Installation

Add dependencies into package.json

```INSTALLATION
"call-hist-lib": "github:mahesh-co1/librarycallhistory.git"
```


## Usage

```js
import React, { Component } from "react";
import CallHistory from "call-hist-lib";
class Example extends Component {
  render() {
   return (
   <CallHistory
      baseUrl={baseUrl}
      fileBasePath={fileBasePath}
      fetchAPI={fetchAPI}
      getFilesAPI={getFilesAPI}
      Paginator={(data, handleNextPrevious) => (
        <Paginator
          maxClickableCells={5}
          paginatorData={data}
          pageNumberSelect={(count) => handleNextPrevious(count)}
        />
      )}
    />
  );
  }
}
```
## Handling all props

```js
const baseUrl =
  "https://staging-framework.blinkin.io/v1/calls/get-own-call-logs";  
 const fileBasePath =
  "https://blinkin-staging.s3.eu-central-1.amazonaws.com/public/images/chat_images/";  
  
let fetchAPI = async (url) => {
  let response = await fetch(url, myHeaders);
  let res = await response.json();
  return res;
};

let getFilesAPI = async (roomId) => {
  let response = await fetch(`${getFiles}${roomId}`, myHeaders);
  let jsonResponse = await response.json();
  let res = await jsonResponse.data;
  return res;
};

```

## URL Props details

**baseUrl** = For api request  
**get_files** = get image name and extension for particular room_id  
**file_base_path** = Api for getting images of particular room_id  

## License

MIT © [Maheshss1](https://github.com/Maheshss1)
