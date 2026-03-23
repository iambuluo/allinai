export default function AdBanner({ slot = '', format = 'auto', style = {} }: { slot?: string; format?: string; style?: React.CSSProperties }) {
  return (
    <div className="my-6 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-2259331322940741"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
