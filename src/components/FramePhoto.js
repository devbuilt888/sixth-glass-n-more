import './FramePhoto.css';

export default function FramePhoto({ src, alt, tone = 'ivory', ratio = 'portrait' }) {
  return (
    <figure className={`frame-photo frame-photo--${tone} frame-photo--${ratio}`}>
      <img src={src} alt={alt} />
    </figure>
  );
}
