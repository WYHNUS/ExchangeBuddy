import React from 'react/react';
import * as IconsHelper from './icons';

const getCloudinary = (options) => {
  const { publicId } = options
  return $.cloudinary.url(publicId, _.extend(options, { fetch_format: "auto", dpr: 2.0 }));
};

export const getUrl = (publicId, width=64, height=64, options={}) => getCloudinary(_.extend({ publicId, width, height, crop: 'fill' }, options));
export const make = (publicId, width=64, height=64, className="", style={}) => <img src={ getUrl(publicId, width, height) } className={ className } style={ style } />;

export const getUrlScale = (publicId, width=64, options={}) => getCloudinary(_.extend({ publicId, width, crop: 'scale' }));
export const makeScale = (publicId,  width=64, className="", style={}) => <img src={ getUrlScale(publicId, width) } className={ className } width={ width } style={ style } />;
