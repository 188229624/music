// const Room = require('../data_schema/room_schema.js');

// let add_room = async()=>{
//     let time = new Date().getTime();
//     await Room.create({
//         name:'job_test',
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
//     });
// }

// let add_room2 = async()=>{
//     let time = new Date().getTime();
//     await Room.create({
//         name:'job_test2',
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
//     });
// }

// let add_room3 = async()=>{
//     let time = new Date().getTime();
//     await Room.create({
//         name:'job_test3',
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
//     });
// }

// agenda.name('room_job' + process.pid);

// agenda.processEvery('10 minute');

// agenda.define('addroom_job',add_room);

// agenda.define('addroom_job2',add_room2);

// // const job = agenda.create('add_room3',{add:'creat'});


// agenda.on('ready', async()=>{
//     agenda.start();
//     // job.repeatEvery('3 minutes');
//     // await job.save();
//     agenda.every('*/1 * * * *', 'addroom_job');
//     agenda.every('*/2 * * * *', 'addroom_job2');
// });