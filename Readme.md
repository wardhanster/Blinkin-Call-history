## Installation

Add dependencies into package.json

```INSTALLATION
"call-hist-lib": "github:mahesh-co1/librarycallhistory.git"
```


## Usage

```js
import React, { Component } from "react";
import Paginator from "./Paginator";
import CallHistory from "call-hist-lib";

class Example extends Component {
  render() {
   return (
   <CallHistory
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
 const fileBasePath =
  "https://blinkin-staging.s3.eu-central-1.amazonaws.com/public/images/chat_images/";  
  
let fetchAPI = async (pageNumber) => {
  let newUrl = `${baseUrl}?page=${pageNumber}`;
  let response = await fetch(newUrl, myHeaders);
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
### Note - Since get-own-call-logs maintains page_num count replaced all baseURL to just pageNumber. Because of that out fetchAPI will handel now only for mail url with pageNumber (get-own-call-logs)

**Maintained new api for get all files location - getFilesAPI**

#### URL Props details

**baseUrl** = For api request  
**get_files** = get image name and extension for particular room_id  
**file_base_path** = Api for getting images of particular room_id  

### window key handled

```js
window.String.CH_roomId || 'Room Id'
window.String.CH_startDate || 'Start Date'
window.String.CH_duration || 'Duration'
window.String.CH_to || 'To'
window.String.CH_files || 'Files'
window.String.CH_images || 'Images'
window.String.CH_videos || 'Videos'
window.String.CH_close || 'Close'
window.String.CH_noImagesExist || 'No Images Exist'
window.String.CH_noVideosExist || 'No Videos Exist'
window.String.CH_gotoFileLocation || 'Goto File location'
window.String.CH_noFilesExist || 'No Files Exist'
```


## License
NOT AVAILABLE FOR ANY UNAUTHORISED USE
