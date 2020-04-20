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

Once all the changes are done then run 
```
npm run build
```
from root folder

Once build is completed run npm link
```
npm link
```

Then link it to the main project(where it will be used)
```
npm link {path to the main project}/node_modules/react
```

Then open the root path of the main project and link CallHistory with it
```
cd {path to the main project}
npm link Blinkin-Call-history
```

import the file inside your folder and test
```
import CallHistory from 'call-hist-lib'
```

Once everything is working fine open the Blinkin-Call-History project and push it to github using git commands
