export function insertUniversitiesIntoUser(user, universities) {
  var uniName = '';

  for (var i=0;i<universities.length;i++) {
    if (universities[i].id===user.UniversityId) {
      uniName = universities[i].name;
      break;

    }
  }

  user.University=
  {
    name: uniName,
    id: user.UniversityId
  };
  
  return user;
}

export function insertUniversitiesIntoList(goingArray, universities) {
  var finalArray = [];
  for (var j=0;j<goingArray.length;j++) {
    var uniName = '';
    for (var i=0;i<universities.length;i++) {
      if (universities[i].id===goingArray[j].UniversityId) {
        uniName = universities[i].name;
        break;
      }
    }
    goingArray[j].University = 
    {
      name: uniName,
      id: goingArray[j].UniversityId
    };
    finalArray.push(goingArray[j]);
  }
  return finalArray;
}

export function insertUniversitiesIntoUniversityList(universityArray, universities) {
  var finalArray = [];
  for (var j=0;j<universityArray.length;j++) {
    var uniName = '';
    for (var i=0;i<universities.length;i++) {
      if (universities[i].id===universityArray[j].UniversityId) {
        uniName = universities[i].name;
        break;
      }
    }
    universityArray[j].name = uniName;
    finalArray.push(universityArray[j]);
  }
  return finalArray;  
}