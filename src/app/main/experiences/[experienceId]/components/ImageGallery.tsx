function ImageGallery() {
  return (
        <div className="w-full h-100 rounded-3xl overflow-hidden grid grid-cols-2 grid-rows-2 gap-3">
            <div className="row-span-2 bg-primary-100"></div>
            <div className="bg-primary-100"></div>
            <div className="bg-primary-100"></div>
        </div>
  );
}

export default ImageGallery;