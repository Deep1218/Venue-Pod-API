const mongoose = require('mongoose');

const url = "mongodb+srv://venue_pod:i81mhYnjAdsAnHa0@cluster0.sh7pu.mongodb.net/venuepod?retryWrites=true&w=majority"



mongoose.connect(url).then(() => {
    console.log('connection successfull');
}).catch((error) => {
    console.log('connectoion failed', error);
})