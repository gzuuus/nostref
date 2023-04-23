import React, { useState, useEffect } from 'react';

const FileTypePreview = ({ rValue }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const getFileType = async () => {
      const extension = rValue.split('.').pop().toLowerCase();
      switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'tiff':
        case 'png':
        case 'webp':
        case 'bmp':
          setPreview(<img className="isImage" src={rValue} alt={rValue} />);
          break;
        case 'mp4':
          setPreview(
            <video controls className="isVideo">
              <source src={rValue} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
          break;
        default:
          try {
            const response = await fetch(`https://api.snort.social/api/v1/preview?url=${rValue}`);
            const data = await response.json();
            if (data.description || data.title) {
                setPreview(<p className='rvalueDescription'><a href={rValue} target='_blank' rel='noreferrer'><b>{data.title}</b></a><br />{data.description}</p>);
            } else {
                setPreview(null);
            }
            
          } catch (error) {
            //console.error(error);
            setPreview(null);
          }
          break;
      }
    };

    getFileType();
  }, [rValue]);

  return <div>{preview}</div>;
};

export default FileTypePreview;
