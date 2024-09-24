const calendarTable = document.querySelector('#calendarTable');
const calendarTableTbody = calendarTable.children[1];
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const todayBtn = document.querySelector('#todayBtn');
const previousMonthBtn = document.querySelector('#previousMonthBtn');
const nextMonthBtn = document.querySelector('#nextMonthBtn');

const date = new Date();
const today = date.getDate();
let thisYear = date.getFullYear();
let thisMonth = date.getMonth() + 1;

year.innerHTML = thisYear;
month.innerHTML = thisMonth;

// 날짜 정보 업데이트 함수
function updateDateInfo() {
  const firstDayInThisMonth = new Date(thisYear, thisMonth - 1, 1).getDay();
  const daysInThisMonth = new Date(thisYear, thisMonth, 0).getDate();
  const lastMonthDate = new Date(thisYear, thisMonth - 1, 0);
  const lastMonthDay = lastMonthDate.getDate();
  const lastDayInlastMonth = new Date(thisYear, thisMonth - 1, 0).getDay();
  const nextMonthDate = new Date(thisYear, thisMonth, 1);
  let nextMonthDay = nextMonthDate.getDate();

  return {
    firstDayInThisMonth,
    daysInThisMonth,
    lastMonthDay,
    lastDayInlastMonth,
    nextMonthDay,
  };
}

// 캘린더 그리기 함수
function makeCalendar() {
  calendarTableTbody.innerHTML = ''; // 캘린더 초기화
  let now = 1;
  const { firstDayInThisMonth, daysInThisMonth, lastMonthDay, lastDayInlastMonth, nextMonthDay } = updateDateInfo();

  let lastMonthDayCounter = lastMonthDay - lastDayInlastMonth;
  let nextMonthDayCounter = nextMonthDay;

  for (let week = 0; week < 6; week++) {
    const weekRow = document.createElement('tr');

    for (let day = 0; day < 7; day++) {
      const dayCell = document.createElement('td');

      if (thisYear === date.getFullYear() && thisMonth === date.getMonth() + 1 && now === today) {
        dayCell.classList.add('today');
      }

      if (day === 0) {
        dayCell.classList.add('sunday');
      } else if (day === 6) {
        dayCell.classList.add('saturday');
      }

      if (week === 0 && day < firstDayInThisMonth) {
        dayCell.innerText = lastMonthDayCounter;
        lastMonthDayCounter++;
        dayCell.classList.add('opacity');
      } else if (now > daysInThisMonth) {
        dayCell.innerText = nextMonthDayCounter;
        nextMonthDayCounter++;
        dayCell.classList.add('opacity');
      } else {
        dayCell.innerText = now;
        now++;
      }

      weekRow.appendChild(dayCell);
    }

    calendarTableTbody.appendChild(weekRow);

    if (now > daysInThisMonth) break;
  }
}

// 오늘 버튼 클릭 이벤트
todayBtn.addEventListener('click', function () {
  thisYear = date.getFullYear();
  thisMonth = date.getMonth() + 1;

  year.innerHTML = thisYear;
  month.innerHTML = thisMonth;
  makeCalendar(); // 캘린더 다시 그리기
});

// 이전 달 버튼 클릭 이벤트
previousMonthBtn.addEventListener('click', function () {
  thisMonth--;

  if (thisMonth < 1) {
    thisMonth = 12;
    thisYear--;
  }

  year.innerHTML = thisYear;
  month.innerHTML = thisMonth;
  makeCalendar(); // 캘린더 다시 그리기
});

// 다음 달 버튼 클릭 이벤트
nextMonthBtn.addEventListener('click', function () {
  thisMonth++;

  if (thisMonth > 12) {
    thisMonth = 1;
    thisYear++;
  }

  year.innerHTML = thisYear;
  month.innerHTML = thisMonth;
  makeCalendar(); // 캘린더 다시 그리기
});

makeCalendar();

export { makeCalendar };
