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
          // user의 친구와 userFriends의 친구가 겹치는지 확인
          if (!userFriends.includes(j[1])) {
            neighbor.push(j[1]);
          }
        } else {
          // user의 친구와 userFriends의 친구가 겹치는지 확인
          if (!userFriends.includes(j[0])) {
            neighbor.push(j[0]);
          }
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

// 미스터코의 친구 추천 규칙에 따라 점수가 가장 높은 순으로 정렬
function sortScore(recommends) {
  var sortable = [];

  for (var n in recommends) {
    sortable.push([n, recommends[n]]);
  }
  sortable.sort();
  sortable.sort((a, b) => b[1] - a[1]);

  // 최대 5명을 return
  let answerObj = Object.fromEntries(sortable);
  let answer = Object.keys(answerObj);

  if (answer.length > 5) {
    return answer.slice(0, 5);
  } else {
    return answer;
  }
}

function problem7(user, friends, visitors) {
  let recommends = {};

  let userFriends = findUserFriends(user, friends);
  let neighbor = findUserNeighbor(userFriends, friends, user);

  recommendsInNeihbor(neighbor, recommends);
  recommendsInVisitors(userFriends, visitors, recommends);

  return sortScore(recommends);
}

module.exports = problem7;
