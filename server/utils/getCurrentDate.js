const getCurrentDate = () => {
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Місяці починаються з 0
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

// Додаємо нуль спереду, якщо число менше 10
  day = (day < 10) ? '0' + day : day;
  month = (month < 10) ? '0' + month : month;
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

module.exports = getCurrentDate;