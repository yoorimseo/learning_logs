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

function problem7(user, friends, visitors) {
  var answer;
  return answer;
}

module.exports = problem7;
