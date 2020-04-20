Git Clone repo in your src folder

```
git clone https://github.com/wardhanster/Blinkin-Call-history
```

import it into your js file

```
import CallHistory from "./container/Blinkin-Call-history/src";

```

Get Token and Add Headers

```
const { token } = JSON.parse(localStorage.getItem("@userData"));
  const myHeaders = {
    headers: new Headers({
      "x-token": token,
    }),
  };
```

Add FetchAPI method and Constants URLs

```
let fetchAPI = async (url) => {
    let response = await fetch(url, myHeaders);
    let res = await response.json();
    return res;
  };
  

  const baseUrl =
    "https://staging-framework.blinkin.io/v1/calls/get-own-call-logs";
  const fileBasePath =
    "https://blinkin-staging.s3.eu-central-1.amazonaws.com/public/images/chat_images/";
  const getFiles = "https://staging-framework.blinkin.io/v1/calls/get-files/";
```

Add Component in your render function 

```
<CallHistory
        baseUrl={baseUrl}
        fileBasePath={fileBasePath}
        getFiles={getFiles}
        fetchAPI={fetchAPI}
      />
```
