export default function VideoBackground(): React.ReactNode {
  return (
    <video
      className="object-fill w-full lg:h-[100vh] mt-[88px] lg:mt-0"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="bgVideo.mp4" type="video/mp4" />
    </video>
  );
}
