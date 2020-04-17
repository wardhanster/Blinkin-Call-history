# librarycallhistory

## Install

```INSTALLATION
"call-hist-lib": "github:mahesh-co1/librarycallhistory.git"
```


## Usage

```js

const urls = {
  baseUrl: "https://staging-framework.blinkin.io/v1/calls/get-own-call-logs",
  file_base_path:
    "https://blinkin-staging.s3.eu-central-1.amazonaws.com/public/images/chat_images/",
  get_files: "https://staging-framework.blinkin.io/v1/calls/get-files/",
};

import React, { Component } from "react";
import CallHistory from "call-hist-lib";
class Example extends Component {
  render() {
    return <CallHistory urls={urls}/>;
  }
}
```

## License

MIT © [Maheshss1](https://github.com/Maheshss1)
