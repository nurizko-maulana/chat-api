var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('text', 'new chat');
data.append('user', '1');

var config = {
  method: 'post',
  url: 'http://localhost:3002/message',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
