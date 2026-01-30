const GlassMagnifier = require("react-image-magnifiers").GlassMagnifier;

function MagnifierComponent() {
  return (
    <div
      className="magnifierContainer"
      style={{ width: '50%', display: 'flex', justifyContent: 'center' }}
    >
      <h1>React Image Magnifier</h1>
      <GlassMagnifier
        className="glassMangifier"
        imageSrc="/survey/Completed-Tick-part2.png"
        imageAlt="Image Alt Text"
        largeImageSrc="/survey/Completed-Tick-part2.png"
        allowOverflow={false}
        magnifierSize="18%"
        magnifierBorderSize={5}
        magnifierBorderColor="blue" // Replace 'blue' with your desired CSS color
        // mask="radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 55%, rgba(0, 0, 0, 1) 60%)"
      />
    </div>
  );
}

export default MagnifierComponent;
