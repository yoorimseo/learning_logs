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

function problem7(user, friends, visitors) {
  var answer;
  return answer;
}

module.exports = problem7;
