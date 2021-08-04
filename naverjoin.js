const userId = document.getElementById ('id');
const idAlert = document.getElementById ('id-alert');
const greenAlert = document.querySelector ('green-alert');

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

function setRedText() {
    idAlert.classList.add('alert-red-text');
    idAlert.classList.remove('alert-green-text');
}
function setGreenText() {
    idAlert.classList.add('alert-green-text');
    idAlert.classList.remove('alert-red-text');s
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
        setGreenText()
    }
    else {
        setRedText()
    }
})