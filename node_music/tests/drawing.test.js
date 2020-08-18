require( 'dotenv' ).config({ path: 'tests/process.env' });
const request = require( 'superagent' );
const assert = require( 'assert' );

// test('GET,drawing',async(done) =>{
//     let res = await request.get(`${process.env.HOME_URL}/drawing?name=first`);
//     console.log(res);
//     done();
// })


// test('GET,drawing',async() =>{
//     request.get(`${process.env.HOME_URL}/drawing/${process.env.Drawing_Id}`)
//     .end((err,res)=>{
//         console.log(res.body);
//     })
// })

// test('Post,drawing',async()=>{
//     let time = new Date().getTime();
//     let res = await request.post(`${process.env.HOME_URL}/drawing`).
//     send({
//         name:'bbb',
//         title:'test',
//         author:'gu',
//         body:'test',
//         comments: [{ body:'test', date: time}],
//         date: time,
//         hidden: true,
//         meta: {
//             votes: 1,
//             favs: 2
//         }
//     })
// })

// test('put,drawing',async(done)=>{
//     let time = new Date().getTime();
//     request.put(`${process.env.HOME_URL}/drawing/${process.env.Drawing_Id}`).
//     send({
//         name:'777',
//         title:'aaa',
//         $push:{
//             comments:{
//                 $each:[{ body:'test', date: time},{ body:'test', date: time}]
//             }
//         }
//     })
//     .then(res =>{
//         console.log(res.body);
//         done();
//     })
//     .catch(err =>{
//         console.log(err);
//         done();
//     })
// })

// test('del,drawing',async ()=>{
//     let res = await request.delete(`${process.env.HOME_URL}/drawing/${process.env.Drawing_Id}`)
//     console.log(res.body);
// })