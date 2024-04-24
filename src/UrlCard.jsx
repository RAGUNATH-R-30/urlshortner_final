import React from "react";

function UrlCard() {
  return (
    <div className="card">
      <div className="card-header">URL Shortner</div>
      <div className="card-body">
        <div className="input-group input-group-lg">
          <span className="input-group-text" id="inputGroup-sizing-lg" style={{opacity:0.7}}>
           Enter long link here
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
          />
        </div>
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
          Shorten URL
        </button>
      </div>
    </div>
  );
}

export default UrlCard;
