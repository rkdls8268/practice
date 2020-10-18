// var express = require('express');
import * as express from 'express'; // 1

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

// 이거 컴파일하면 dist/index.js 경로에 파일이 생성된다. 
// 이때 ts 파일에서 명시한 값의 타입이 컴파일이 되는 과정에서는 모두 사라지게 된다. 