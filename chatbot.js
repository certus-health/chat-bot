  
var botui = new BotUI('certus-bot'),
    studentNum,
    appointmentDate;

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
    } else if(res.value == 'view'){
        if(studentNum == null) {
            botui.message.bot({
            delay: 1200,
            content: 'Please enter in a Student Number'
          }).then(init);
        }
        else {
          botui.message.bot({
            delay: 1200,
            content: 'Your Student # is: ' + studentNum
          }).then(function () {
            botui.message.bot({
              delay: 700,
              content: 'Your appointment is on: ' + appointmentDate
            }).then(init);
          });
        }
    }
  });
}

var setAppointment = function () {
  botui.message
    .bot({
      delay: 700,
      content: 'Sure, I can help you with that!'
    })
    .then(stuNum = function () {
      return botui.message.bot({
	      delay: 700,
	      content: 'What is your student number?'
      })
    })
    .then(addStuNum = function () {
      return botui.action.text({
        delay: 1000,
        action: {
          icon: 'address-card',
          sub_type: 'number',
          placeholder: 'Enter it here'
        }
      })
    }).then(confStuNum = function (res) {

      //If number isn't a 9 digit number or left blank
      if (res.value.toString().length != 9) {
        return botui.message.bot({
          delay: 700,
          content: 'Please enter in a 9 digit number'
        }).then(stuNum).then(addStuNum).then(confStuNum)
      }

      else {
        studentNum = res.value; // save new value
        return botui.message
          .bot({
            delay: 1500,
            loading: true, // pretend like we are doing something
            content: res.value
          });
      }
    // User adds date
    }).then(function () {
      return botui.message.bot({
        delay: 700,
        content: 'Enter in the date you would like'
      })
    }).then(function () {
      return botui.action.text({
        delay: 1000,
        action: {
          icon: 'calendar',
          sub_type: 'date',
          placeholder: 'Enter in a date'
        }
      })
    }).then(appDate = function(date) {
      appointmentDate = date.value;
      return botui.message
        .bot({
          delay: 700,
          loading: true,
          content: date.value
        });
    }).then(init); // loop to initial state
}


init();