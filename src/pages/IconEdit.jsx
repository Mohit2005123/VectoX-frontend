import React, { useState, useRef } from 'react';
// import icons from '../data/icons.json';
import icons from '../data/newoutput.json';
import MyNavbar from '../components/MyNavbar';
import IconControls from '../components/IconControls';
import IconModal from '../components/IconModal';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import confetti from 'canvas-confetti';
import FileUploadModal from '../components/FileUploadModal';
const IconEdit = () => {
  const [selectedIcon, setSelectedIcon] = useState('a-arrow-down');
  const [size, setSize] = useState(400);
  const [rotate, setRotate] = useState(0);
  const [borderWidth, setBorderWidth] = useState(2); // Border width state
  const [opacity, setOpacity] = useState(1); // Opacity state
  const [fillColor, setFillColor] = useState('none');
  const [strokeWidth, setStrokeWidth] = useState(0.2);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [shadow, setShadow] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0); // New border-radius property
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // New background color property
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isopenFileModal, setIsOpenFileModal] = useState(false);
  const iconData = icons[selectedIcon];
  const previewRef = useRef();
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  const openFileModal = () => setIsOpenFileModal(true);
  const closeFileModal = () => setIsOpenFileModal(false);
  const exportToSvg = () => {
    if (!iconData) return;
    const svg = convertToSvg();
    // Create a Blob and trigger download
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedIcon}.svg`; // Set the file name
    link.click(); // Trigger the download
    triggerConfetti();
    return svg;
  };
  const convertToSvg = () => {
    if (!iconData) return;

    // Extract the viewBox attributes
    const [minX, minY, width, height] = iconData.viewBox.split(' ').map(Number);

    // Calculate the scale factor to fit the icon into the size, considering padding
    const padding = Math.max(borderWidth, shadow);
    const availableWidth = size - 2 * padding;
    const availableHeight = size - 2 * padding;
    const scale = Math.min(availableWidth / width, availableHeight / height);

    // Calculate the offset to center the icon
    const translateX = (size - width * scale) / 2;
    const translateY = (size - height * scale) / 2;

    // Adjust stroke width to ensure it scales properly
    const adjustedStrokeWidth = strokeWidth;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}px" height="${size}px">
        <!-- Background with border-radius -->
        <rect x="0" y="0" width="${size}" height="${size}" rx="${borderRadius}" ry="${borderRadius}" fill="${backgroundColor}" />
        <!-- Icon with applied transformations -->
        <g transform="translate(${translateX}, ${translateY}) scale(${scale}) rotate(${rotate}, ${width / 2}, ${height / 2}) skewX(${skewX}) skewY(${skewY})">
          ${iconData.path.map((path, index) => `
            <path d="${path}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${adjustedStrokeWidth}" />
          `).join('')}
          ${Array.isArray(iconData.circles) ? iconData.circles.map((circle, index) => `
            <circle cx="${circle.cx}" cy="${circle.cy}" r="${circle.r}" 
                    fill="${fillColor}" stroke="${strokeColor}" stroke-width="${adjustedStrokeWidth}" />
          `).join('') : ''}
        </g>
      </svg>
    `;
    return svg;
  }
  const exportToPng = () => {
    const svgString = convertToSvg();
    if (!svgString) return;

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Create an SVG image
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));

    img.onload = () => {
      // Set canvas size to match the SVG size
      canvas.width = size;
      canvas.height = size;

      // Draw the SVG image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert the canvas to a Blob
      canvas.toBlob(blob => {
        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${selectedIcon}.png`; // Set the file name
        link.click(); // Trigger the download
      }, 'image/png');
    };

    img.onerror = (error) => {
      console.error('Error loading SVG image', error);
    };
    triggerConfetti();
  };
  const exportDropdown = (
    <Dropdown>
      <DropdownTrigger>
        <Button
          style={{
            width: '120px',
            height: '45px',
            background: 'linear-gradient(45deg, #ff6b6b, #f06595)', // Gradient background
            color: '#fff', // Text color to contrast with the gradient
            border: 'none', // Remove border for a cleaner look
            borderRadius: '12px', // Rounded corners
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            transition: 'transform 0.3s ease, background 0.3s ease', // Smooth transitions
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(45deg, #ff9a9e, #f8cdda)'; // Change gradient on hover
            e.target.style.transform = 'scale(1.05)'; // Slight scale up on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(45deg, #ff6b6b, #f06595)'; // Reset to original gradient
            e.target.style.transform = 'scale(1)'; // Reset scale
          }}
        >
          Export
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Export Options" onAction={(key) => key === 'svg' ? exportToSvg() : exportToPng()}>
        <DropdownItem key="svg">Export as SVG</DropdownItem>
        <DropdownItem key="png">Export as PNG</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );


  return (
    <div>
      <MyNavbar />
      <div className="flex flex-col lg:flex-row items-start p-6 space-y-4 lg:space-y-0 relative mt-16 min-h-screen">
        {/* Left column - Icon controls */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-1">
          <div className="flex space-x-2 items-center pl-4">
            {/* Current icon display */}
            <span>Icon</span>
            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer hover:opacity-80 transition border border-gray-300 rounded p-1"
              style={{ width: '50px', height: '50px' }}
            >
              {iconData && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={iconData.viewBox}
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                >
                  {iconData.path.map((path, index) => (
                    <path key={index} d={path} />
                  ))}
                  {Array.isArray(iconData.circles) && iconData.circles.map((circle, index) => (
                    <circle
                      key={`circle-${index}`}
                      cx={circle.cx}
                      cy={circle.cy}
                      r={circle.r}
                    />
                  ))}
                </svg>
              )}
            </div>
            <div className="flex-grow flex justify-center">
              <Button onClick={openFileModal}>
                Upload Your Own SVG
              </Button>
            </div>

            {/* Export Dropdown */}
            <div className="flex justify-end">
              {exportDropdown}
            </div>
          </div>

          <div className='pl-4'>
            <IconControls
              size={size}
              setSize={setSize}
              borderRadius={borderRadius}
              setBorderRadius={setBorderRadius}
              rotate={rotate}
              setRotate={setRotate}
              opacity={opacity}
              setOpacity={setOpacity}
              strokeWidth={strokeWidth}
              setStrokeWidth={setStrokeWidth}
              strokeColor={strokeColor}
              setStrokeColor={setStrokeColor}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              fillColor={fillColor}
              setFillColor={setFillColor}
              shadow={shadow}
              setShadow={setShadow}
              skewX={skewX}
              setSkewX={setSkewX}
              skewY={skewY}
              setSkewY={setSkewY}
            />
          </div>
        </div>

        {/* Right column - Preview */}
        <div className="w-full lg:w-2/3 flex justify-start items-center pl-10">
          <div
            className="w-[800px] h-[800px] flex items-center justify-center rounded-lg shadow-md overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e0e0e0 1px, transparent 1px),
                linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              backgroundColor: '#f5f5f5'
            }}
          >
            <div
              ref={previewRef}
              className="relative flex items-center justify-center"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: backgroundColor,
                borderRadius: `${borderRadius}px`,
                opacity: opacity,
                boxShadow: shadow ? `0px 0px ${shadow}px rgba(0, 0, 0, 0.5)` : 'none',
              }}
            >
              {iconData && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={iconData.viewBox}
                  width="100%"
                  height="100%"
                  fill={fillColor}
                  style={{
                    transform: `rotate(${rotate}deg) skewX(${skewX}deg) skewY(${skewY}deg)`,
                  }}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                >
                  <circle cx="0" cy="0" r="0" />
                  {iconData.path.map((path, index) => (
                    <path
                      key={index}
                      d={path}
                    />
                  ))}
                  {Array.isArray(iconData.circles) && iconData.circles.map((circle, index) => (
                    <circle
                      key={`circle-${index}`}
                      cx={circle.cx}
                      cy={circle.cy}
                      r={circle.r}
                    />
                  ))}
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      <IconModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSelectedIcon={setSelectedIcon}
      />
      <FileUploadModal isOpen={isopenFileModal} onClose={closeFileModal} />

    </div>
  );
};
export default IconEdit;