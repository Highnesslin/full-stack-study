import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

import { load } from './utils/decorator'
import {resolve} from 'path' 
const router = load(resolve(__dirname, './routes'))

const app = new Koa()
app.use(
    bodify({
        multipart: true,
        strict: false
    })
)
// app.use((ctx: Koa.Context) => {
//     ctx.body = 'hello'
// })
app.use(router.routes())
app.listen(3000, () => {
    console.log('服务器启动成功')
})

