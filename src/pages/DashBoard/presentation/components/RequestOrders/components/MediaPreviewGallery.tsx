import React from "react";

interface MediaPreviewGalleryProps {
  media: { url: string; file_name: string }[];
}

const MediaPreviewGallery: React.FC<MediaPreviewGalleryProps> = ({ media }) => (
  <div className="flex space-x-2">
    {media.map((file, idx) => (
      <a key={idx} href={file.url} target="_blank" rel="noopener noreferrer">
        📎 {file.file_name}
      </a>
    ))}
  </div>
);

export default MediaPreviewGallery;
