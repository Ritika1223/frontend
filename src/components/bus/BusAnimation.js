import React from 'react';
import './BusAnimation.css'; 
import road from './assets/road.png';
import fWheel from './assets/frontwheel.png';
import bWheel from './assets/backwheel.png';

const BusAnimation = () => {
  return (
    <div className="bottom-part">
      <div className="bg-cover section breadcrumb-banner road-car bottom-0">
        <img src={road} className="img-fluid banner_image road_image" alt="Road" />

        <div className="road">
          <div className="bus left">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus left bus_left_2">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus left bus_left_3">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus left bus_left_4">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus left bus_left_5">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus right">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus right bus_right_2">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus right bus_right_3">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus right bus_right_4">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
          <div className="bus right bus_right_5">
            <img src={fWheel} className="img-fluid frontwheel" alt="Front Wheel" />
            <img src={bWheel} className="img-fluid backwheel" alt="Back Wheel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusAnimation;
