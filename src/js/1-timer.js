// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import iconError from "../img/error.png"


const input = document.querySelector("#datetime-picker")
const button = document.querySelector("button")
const dataDays = document.querySelector('span[data-days]')
const dataHours = document.querySelector('span[data-hours]')
const dataMinutes = document.querySelector('span[data-minutes]')
const dataSeconds = document.querySelector('span[data-seconds]')


let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() > Date.now()){
            userSelectedDate = selectedDates[0].getTime()
            button.disabled = false;
            button.dataset.start = 'active';
        } else {
            iziToast.error({
                iconUrl: iconError,
                message: 'Please choose a date in the future',
                position: 'topCenter',
                backgroundColor: '#ef4040',
                titleColor: '#FFFFFF',
                messageColor: '#FFFFFF',
                theme: 'dark',
              });
              button.disabled = true;
              button.dataset.start = '';
        }
    },
  };

  const ftpick = flatpickr(input, options);

  input.addEventListener('click', () => {
    ftpick.open();
  })

  function timer({days, hours, minutes, seconds}) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }
  
  button.addEventListener('click', () => {
    input.disabled = true;
    button.disabled = true;
    button.dataset.start = '';
  
    const idTimer = setInterval(() =>{
      const timerValue = userSelectedDate - Date.now();
      if (timerValue >= 0) {
        timer(convertMs(timerValue));
      } else {
        clearInterval(idTimer);
        input.disabled = false;
      }
    },1000)
  });
  

















function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value){
    return value.toString().padStart(2, '0');
  }
