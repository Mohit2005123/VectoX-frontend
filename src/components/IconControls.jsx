import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import {Slider} from "@nextui-org/react";
const IconControls = ({
  size, setSize,
  borderRadius, setBorderRadius,
  rotate, setRotate,
  opacity, setOpacity,
  strokeWidth, setStrokeWidth,
  strokeColor, setStrokeColor,
  backgroundColor, setBackgroundColor,
  fillColor, setFillColor,
  shadow, setShadow,
  skewX, setSkewX,
  skewY, setSkewY
}) => {
  const [activeTab, setActiveTab] = useState('shape');
  const [activeColorPicker, setActiveColorPicker] = useState(null);
  const colorPickerRef = useRef(null);

  const handleInputChange = useCallback((setter) => (e) => {
    setter(e.target.value);
  }, []);

  const handleColorChange = useCallback((setter) => (color) => {
    setter(color.hex);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setActiveColorPicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const renderSlider = useCallback((label, value, onChange, min, max, step = 1, unit = '') => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      </div>
      <Slider 
      radius='none'
      step={step}
      maxValue={max}
      minValue={min}
      className='max-w-md'
      value={value}
      onChange={(val) => onChange({ target: { value: val } })} 
      />
    </div>
  ), []);

  const renderColorPicker = useCallback((label, color, onChange) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-3">
        <div 
          className="w-10 h-10 rounded-lg shadow-md cursor-pointer border-2 border-white"
          style={{ backgroundColor: color }}
          onClick={() => setActiveColorPicker(activeColorPicker === label ? null : label)}
        />
        <div 
          className="flex-1 bg-white border border-gray-200 rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setActiveColorPicker(activeColorPicker === label ? null : label)}
        >
          <input
            type="text"
            value={color}
            onChange={(e) => onChange({ hex: e.target.value })}
            className="w-full text-sm text-gray-600 font-medium focus:outline-none"
          />
        </div>
      </div>
      {activeColorPicker === label && (
        <div className="absolute z-10 mt-2" ref={colorPickerRef}>
          <div className="bg-white rounded-lg shadow-xl p-4">
            <ChromePicker 
              color={color} 
              onChange={onChange} 
              disableAlpha={true}
            />
          </div>
        </div>
      )}
    </div>
  ), [activeColorPicker]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'shape':
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            {renderSlider('Size', size, handleInputChange(setSize), 50, 700, 1, 'px')}
            {renderSlider('Border Radius', borderRadius, handleInputChange(setBorderRadius), 0, 500, 1, 'px')}
            {renderSlider('Rotation', rotate, handleInputChange(setRotate), 0, 360, 1, '°')}
            {renderSlider('Skew X', skewX, handleInputChange(setSkewX), -50, 50, 1, '°')}
            {renderSlider('Skew Y', skewY, handleInputChange(setSkewY), -50, 50, 1, '°')}
          </div>
        );
      case 'appearance':
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            {renderSlider('Opacity', opacity, handleInputChange(setOpacity), 0, 1, 0.01)}
            {renderSlider('Stroke Width', strokeWidth, handleInputChange(setStrokeWidth), 0, 10, 0.1, 'px')}
            {renderSlider('Shadow', shadow, handleInputChange(setShadow), 0, 50, 1, 'px')}
          </div>
        );
      case 'colors':
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            {renderColorPicker('Stroke Color', strokeColor, handleColorChange(setStrokeColor))}
            {renderColorPicker('Fill Color', fillColor, handleColorChange(setFillColor))}
            {renderColorPicker('Background Color', backgroundColor, handleColorChange(setBackgroundColor))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Icon Controls</h2>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {['shape', 'appearance', 'colors'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default IconControls;