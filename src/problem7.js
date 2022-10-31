// friends 배열에서 user의 친구 찾기
function findUserFriends(user, friends) {
  let userFriends = [];

  for (i of friends) {
    if (i.includes(user)) {
      if (i.indexOf(user) === 0) {
        userFriends.push(i[1]);
      } else {
        userFriends.push(i[0]);
      }
    }
  }

  return userFriends;
}

// friends 배열에서 userFriends의 친구 찾기
function findUserNeighbor(userFriends, friends, user) {
  let neighbor = [];

  for (i of userFriends) {
    for (j of friends) {
      if (j.includes(i) && !j.includes(user)) {
        let userFriendIndex = j.indexOf(i);
        if (userFriendIndex === 0) {
          neighbor.push(j[1]);
        } else {
          neighbor.push(j[0]);
        }
      }
    }
  }

  return neighbor;
}

// neighbor에서 추천 친구 찾기
// userFriends의 친구인 neighbor가 0명 이하일 땐 추천하지 않음
function recommendsInNeihbor(neighbor, recommends) {
  if (neighbor.length > 0) {
    neighbor.forEach((n) => {
      if (recommends[n]) {
        // recommends에 있으면 아이디에 점수 값 추가
        recommends[n] = recommends[n] + 10;
      } else {
        // recommends에 없으면 아이디와 점수 값 추가
        recommends[n] = 0 + 10;
      }
    });
  }

  return recommends;
}

// visitors에서 추천 친구 찾기
// newVisitors가 0명 이하일 땐 추천하지 않음
function recommendsInVisitors(userFriends, visitors, recommends) {
  // visitors에서 user의 친구를 제외
  let newVisitors = [];

  visitors.filter((n) => {
    if (!userFriends.includes(n)) {
      newVisitors.push(n);
    }
  });

  // visitors에서 점수
  if (newVisitors.length > 0) {
    newVisitors.forEach((n) => {
      if (recommends[n] && userFriends.includes(n)) {
        // recommends에 있으면 아이디에 점수 값 추가
        recommends[n] = recommends[n] + 10;
      } else if (recommends[n] && !userFriends.includes(n)) {
        recommends[n] = recommends[n] + 1;
      } else {
        // recommends에 없으면 아이디와 점수 값 추가
        recommends[n] = 0 + 1;
      }
    });
  }

  return recommends;
}

function problem7(user, friends, visitors) {
  var answer;
  return answer;
}

module.exports = problem7;
