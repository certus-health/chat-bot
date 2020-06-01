  
var botui = new BotUI('thermostat-bot'),
    temperature = 30;

function init() {
  botui.message
    .bot({
      delay: 700,
      content: 'Hi, welcome to Ryerson Health Clinic!'
    })
    .then(function () {
      return botui.message.bot({
	      delay: 700,
	      content: 'How may I help you?'
      })
  }).then(function () {
      return botui.action.button({
        delay: 1000,
        action: [{
          text: 'Make appointment',
          value: 'make'
        }, {
          text: 'View appointment',
          value: 'view'
        }, {
          text: 'Delete appointment',
          value: 'delete'
        }]
      })
  }).then(function (res) {
    if(res.value == 'make') {
      setAppointment();
    } else {
      botui.message.bot({
        delay: 1200,
        content: 'Current temperature is: ' + temperature + ' degree'
      }).then(init);
    }
  });
}

var setAppointment = function () {
  botui.message
    .bot({
      delay: 700,
      content: 'Sure, I can help you with that!'
    })
    .then(function () {
      return botui.message.bot({
	      delay: 700,
	      content: 'What is your student number?'
      })
    })
    .then(function () {
      return botui.action.text({
        delay: 1000,
        action: {
          icon: 'address-card',
          sub_type: 'number',
          placeholder: 'Enter it here'
        }
      })
    }).then(function (res) {
      temperature = res.value; // save new value
      return botui.message
        .bot({
          delay: 1500,
          loading: true, // pretend like we are doing something
          content: res.value
        });
    }).then(init); // loop to initial state
}


init();