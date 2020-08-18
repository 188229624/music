const mongoose = global.mongoose = require('mongoose');
//const Agenda = require( 'agenda' );

let opt = {
    user:'guying',
    pass:null,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}
let base_url = "mongodb://120.77.203.104:27017/yins";


exports.start = async ()=>{
    let flag = false;
    await mongoose.connect(base_url,opt)
    .then(()=>{        
       flag = true;
    },
    err=>{console.log(err)}
    );    
    return flag;
    // const agenda = global.agenda = new Agenda({db: {
    //     address: 'mongodb://test:188229624@120.77.203.104:27017/test',
    //     collection: 'agendaJobs',
    //     options: { useNewUrlParser: true }
    // }});
}

