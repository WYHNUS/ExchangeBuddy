import React from 'react';
import Avatar from 'material-ui/Avatar';

import * as ImagesHelper from './images';
import * as IconsHelper from './icons';

const getMediumImage = (url) => {
  if (!url || url.indexOf('topuniversities.com') < 0)
    return url;

  return url.replace("_small", "_medium");
};

export const getImageUrl = (uni, size=90) => {
  if (!uni)
    return "";

  if (uni.logoImageId)
    return ImagesHelper.getUrlScale(uni.logoImageId, 90);
  else
    return "";
};

export const getImage = (uni, size=90, style={}) => {
  const imageUrl = getImageUrl(uni, size);
  if(imageUrl===""){
    <Avatar backgroundColor={ "#616161" } icon={ IconsHelper.materialIcon("account_balance") } />
  }else{
    <Avatar src={ imageUrl } size={ size } style={{ objectFit: 'contain', backgroundColor: '#fff', ...style }} />
  }
  
};


export function insertUniversitiesIntoList(goingArray, universities){
  var finalArray = [];
  for(var j=0;j<goingArray.length;j++){
    var uniName = "";
    for(var i=0;i<universities.length;i++){
      if(universities[i].id===goingArray[j].UniversityId){
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
};

export function insertUniversitiesIntoUniversityList(universityArray, universities){
  var finalArray = [];
  for(var j=0;j<universityArray.length;j++){
    var uniName = "";
    for(var i=0;i<universities.length;i++){
      if(universities[i].id===universityArray[j].UniversityId){
        uniName = universities[i].name;
        break;
      }
    }
    universityArray[j].name = uniName;
    finalArray.push(universityArray[j]);
  }
  return finalArray;  
}