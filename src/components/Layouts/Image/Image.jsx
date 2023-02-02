function Image({ src, loading = "eager", className, alt, onClick = () => {} }) {
  return (
    <figure
      className={`${className || ""}`}
      onClick={() => onClick(src)}
      data-img
    >
      <img src={src} alt={alt || src} loading={loading} />
    </figure>
  );
}

export default Image;
