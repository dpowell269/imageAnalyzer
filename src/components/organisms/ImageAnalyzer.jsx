import { useState } from 'react';
import ImageUpload from '../molecules/ImageUpload';
import InfoText from '../atoms/InfoText';
import SpecTabs from '../molecules/SpecTabs';

import specData from '../data/data';

// Hardcoded spec dimensions
const SPEC_SIZES = {
  Mobile: { width: 400, height: 466 },
  Tablet: { width: 1023, height: 320 },
  Desktop: { width: 1200, height: 320 },
};

const ImageAnalyzer = () => {
  const [info, setInfo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeTab, setActiveTab] = useState(Object.keys(specData)[0]); // Default to the first tab

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const img = new Image();

      reader.onload = (event) => {
        setPreviewUrl(event.target.result);
        img.onload = () => {
          const sizeInKB = file.size / 1024;

          setInfo({
            fileSize: sizeInKB,
            width: img.naturalWidth,
            height: img.naturalHeight,
            fileType: file.type,
          });
        };
        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  const checkMatch = (targetWidth, targetHeight) => {
    return info?.width === targetWidth && info?.height === targetHeight;
  };

  return (
    <div className='container'>

      <div className='preview'>
      <h1 className='header'>Image Info Analyzer</h1>
       <ImageUpload onImageSelect={handleImage} />
     
     

      {previewUrl && (
        <div>
          <h2>Preview:</h2>
          <img
            src={previewUrl}
            alt="Uploaded Preview"
            style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '1rem' }}
          />
        </div>
      )}

      {info && (
        <>
          <InfoText
            className={info.fileSize > 100 ? 'red' : 'green'}
            label={
              <>
                File Size: {info.fileSize > 100 ? 'Too Big 😢' : 'Perfect 😊'}
              </>
            }
            value={`${info.fileSize.toFixed(2)} KB`}
          />

          <InfoText label="Actual Dimensions:" value={`${info.width}x${info.height}px`} />

          {/* Show only selected tab’s spec */}
          <div style={{ marginTop: '1rem' }}>
            <h3>{activeTab}</h3>
            {Object.entries(specData[activeTab] || {}).map(([device, dimension]) => {
              const [expectedWidth, expectedHeight] = dimension.replace(/\s+/g, '').split('x').map(Number);
              if (!expectedWidth || !expectedHeight) return null;

              const match = info.width === expectedWidth && info.height === expectedHeight;

              return (
                <InfoText
                  key={device}
                  className={match ? 'green' : 'red'}
                  label={`Matches ${device}: ${match ? '✅' : '❌'}`}
                  value={`Expected: ${expectedWidth}x${expectedHeight}px`}
                />
              );
            })}
          </div>

          <InfoText label="Type:" value={info.fileType} />
        </>
      )}
      </div>
        <SpecTabs
        tabs={Object.keys(specData)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default ImageAnalyzer;