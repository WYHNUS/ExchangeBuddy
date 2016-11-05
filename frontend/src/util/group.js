//for groupType 0 & 1

export function getYear(groupName){
	var array = groupName.split(" ");
	array.pop();
	return array.pop();
}

export function getTerm(groupName){
	return groupName.split(" ").pop();
}

//for groupType 1

//for groupType 2

export function isUserPartOfGroup (userId, homeFriends) {
  
  for(var i=0;i<homeFriends.length;i++){

    if(parseInt(homeFriends[i].id)===parseInt(userId)){
      return true;
    }
  }
  return false;
}