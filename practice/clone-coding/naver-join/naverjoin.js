// 1. dom 가져오기
// 2. 이벤트 연결하기
// 3. dom 변경하기

// 아이디
const userId = document.getElementById ('id');
const idAlert = document.getElementById ('id-alert');

// 사용자는 만들고자 하는 아이디를 입력할 수 있고
// 5~20자를 벗어나거나
// 영문 대문자가 들어가거나
// _, - 이외의 특수기호를 사용하거나
// 이미 있거나 탈퇴한 아이디이거나
// 빈 칸이라면 빨간 글씨 띄워주고

// 입력창에 값이 바뀌었을 때 경고 문구 실행

// A일때 -> 경고알람 / B일때 -> 경고알람 / C일때 -> 경고알람
// A아니고 B아니고 C아닐때 -> 멋진 아이디
// 이거 보다는 A B C 다 통과했으면 멋진 아이디 인게 더 쉬움

function setRedId() {
    idAlert.classList.add('alert-red-text');
    idAlert.classList.remove('alert-green-text');
}
function setGreenId() {
    idAlert.classList.add('alert-green-text');
    idAlert.classList.remove('alert-red-text');
}

let isValidId = false
// isValidId, validId, idValid
// 변수 이름에는 충분한 이유가 있어야 한다

userId.addEventListener('change', function() {
    console.log(userId.value);

    // 입력값이 없으면 -> 밑에 "필수 정보입니다." 라고 쓰기
    if(userId.value == "") {
        idAlert.innerHTML = "필수 정보입니다."
    }

    // 입력값이 5~20자가 아니면"5~20자만 사용 가능합니다." 라고 쓰기
    else if (!/^[a-z0-9\-_]{5,20}$/.test(userId.value)) {
        idAlert.innerHTML = "5~20자만 사용 가능합니다."
    }

    // 입력값이 5~20자면 "멋진 아이디네요!" 라고 쓰기
    // 앞의 조건들이 아닐 경우에 "멋진 아이디"이기 때문
    else {
        idAlert.innerHTML = "멋진 아이디네요!"
        isValidId = true;
    }

    if(isValidId) {
        setGreenId()
    }
    else {
        setRedId()
    }
})

// 비밀번호
const userPw = document.getElementById ('password');
const pwAlert = document.getElementById ('password-alert');
const pwType = document.getElementById ('password-type');
const pwText = document.getElementById ('password-text');

function setRedPw() {
    pwAlert.classList.add('alert-red-text');
    pwAlert.classList.remove('alert-green-text');

    pwText.classList.add('alert-red-text');
    pwText.classList.remove('alert-green-text');

    pwType.classList.add('alert-red-text');
    pwType.classList.remove('alert-green-text');
}
function setGreenPw() {
    pwAlert.classList.add('alert-green-text');
    pwAlert.classList.remove('alert-red-text');

    pwText.classList.add('alert-green-text');
    pwText.classList.remove('alert-red-text');

    pwType.classList.add('alert-green-text');
    pwType.classList.remove('alert-red-text');
}

userPw.addEventListener('change', function() {
    // 사용불가, 위험, 보통, 안전
    console.log(userPw.value);

    // 입력값이 없으면 -> 밑에 "필수 정보입니다." 라고 쓰기
    // 입력값이 없을 때 빨간색 잠금 아이콘과 함께 "사용불가" 메세지
    if(userPw.value == "") {
        pwAlert.innerHTML = "필수 정보입니다."
        // 사용불가 메세지
        pwText.innerHTML = "사용불가"
        pwText.classList.add('lock-text');
        pwText.classList.add('lock-text');
        // 빨간 잠금 아이콘
        pwType.classList.remove('lock-icon');

        setRedPw()
    }
    else if(/^[a-zA-Z0-9-_)(*&^%$#@!~`,.\/+=|?]{8,16}$/.test(userPw.value)) {
        // 안전 메세지
        pwText.innerHTML = "안전"
        pwText.classList.add('lock-text');
        pwText.classList.add('lock-text');
        // 초록 잠금 아이콘
        pwType.classList.remove('lock-icon');

        setGreenPw()
    }
})

// 비밀번호 재확인
const userRePw = document.getElementById ('password-recheck');
const rePwAlert = document.getElementById ('password-recheck-alert');
const rePwType = document.getElementById ('password-recheck-type');

function setRedRePw() {
    rePwAlert.classList.add('alert-red-text');
    rePwAlert.classList.remove('alert-green-text');
}
function setGreenRePw() {
    rePwType.classList.add('alert-green-text');
    rePwType.classList.remove('alert-red-text');
}

userRePw.addEventListener('change', function() {
    console.log(userRePw.value);

    // 입력값이 없으면 -> 밑에 "필수 정보입니다." 라고 쓰기
    if(userRePw.value == "") {
        rePwAlert.innerHTML = "필수 정보입니다."
        setRedRePw()
    }

    // 비밀번호와 같은지 확인
    if (userPw.value == userRePw.value) {
        console.log('비밀번호가 같습니다.');
        setGreenRePw()
    }
    // 비밀번호가 같지 않으면 "비밀번호 정보가 일치하지 않습니다."
    else {
        rePwAlert.innerHTML = "비밀번호 정보가 일치하지 않습니다."
        setRedRePw()
    }

})


// 이름
const userName = document.getElementById ('name');
const nameAlert = document.getElementById ('name-alert');

function setRedName() {
    nameAlert.classList.add('alert-red-text');
    nameAlert.classList.remove('alert-green-text');
}

userName.addEventListener('change', function() {
    console.log(userName.value);

    // 입력값이 없으면 -> 밑에 "필수 정보입니다." 라고 쓰기
    if(userName.value == "") {
        nameAlert.innerHTML = "필수 정보입니다."
        setRedName()
    }
    // 한글과 영문 대소문자만 가능, 공백 혹은 특수문자 사용 불가
})

// 생년
const birthYear = document.getElementById ('year');
const byAlert = document.getElementById ('year-alert');

function setRedBy() {
    byAlert.classList.add('alert-red-text');
    byAlert.classList.remove('alert-green-text');
}

birthYear.addEventListener('change', function() {
    console.log(birthYear.value);

    // 입력값이 없으면 -> 밑에 "필수 정보입니다." 라고 쓰기
    if(birthYear.value == "") {
        byAlert.innerHTML = "태어난 년도 4자리를 정확하게 입력하세요."
        setRedBy()
    }
    // 입력값이 4자리 이하일 때 위와 같은 오류 메세지(위에꺼와 하나로 할 수 있을듯)
    // if(!/^[0-9]{3}$/.test(userPw.value)) {
    //     byAlert.innerHTML = "태어난 년도 4자리를 정확하게 입력하세요."
    //     setRedBy()
    // }
})

// 월
const birthMonth = document.getElementById ('month');

birthMonth.addEventListener('change', function() {
    console.log(birthMonth.value);

    // 입력값이 없으면 -> 밑에 "필수 정보입니다." 라고 쓰기
    if(birthMonth.value == "") {
        byAlert.innerHTML = "태어난 월을 입력하세요."
        setRedBy()
    }
    // select에서 월 선택하지 않을 때 위와 같은 오류 메세지
})

// 일
const birthDay = document.getElementById ('day');

birthDay.addEventListener('change', function() {
    console.log(birthDay.value);

    // 입력값이 없으면 -> 밑에 "필수 정보입니다." 라고 쓰기
    if(birthDay.value == "") {
        byAlert.innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요."
        setRedBy()
    }
    // 입력값에서 요일 2자리 이하 입력 시 오류 메세지(위에꺼와 하나로 할 수 있을듯)

})

// 성별

// 이메일
// 이메일은 입력값 안에 @가 있는지만 확인

// 전화번호
// 전화번호는 생각해서 정규식 사용하지 않고 구현

// 인증번호
