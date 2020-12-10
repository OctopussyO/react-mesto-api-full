import React from 'react';

function ResponseError ({ className, responseError }) {
  return (
    <div className={className}>
      <p className="response-error__status">{responseError.status}</p>
      <p className="response-error__text">{responseError.statusText}</p> 
    </div>
  )
}

export default ResponseError;
