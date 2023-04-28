import { MultiCarousel } from "components/Layouts";
import { MultiMediaIcon, CloseXIcon } from "components/Layouts/Icons";
import styles from "./styles/createBlogPostMedia.module.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 4,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1280, min: 960 },
    items: 4,
    slidesToSlide: 2,
  },
  tablet_portrate: {
    breakpoint: { max: 960, min: 480 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

function CreateBlogPostMedia({
  handleMediaFiles,
  files,
  handleRemoveMediaFile,
}) {
  return (
    <div className={styles.blogPostMediaBox}>
      <label htmlFor="blogPostMedia" className={styles.mediaLabel}>
        <MultiMediaIcon />
        Media
      </label>
      <input
        type="file"
        id="blogPostMedia"
        hidden
        multiple
        onChange={handleMediaFiles}
      />
      <MultiCarousel responsiveness={responsive} arrows={true}>
        {files.map((media, i) => (
          <figure
            className={styles.blogPostFigure}
            key={`blog-post-media-${i}`}
          >
            <img
              src={
                typeof media === "object" ? URL.createObjectURL(media) : media
              }
              alt="blog post media"
            />
            <button onClick={() => handleRemoveMediaFile(media)}>
              <CloseXIcon />
            </button>
          </figure>
        ))}
      </MultiCarousel>
    </div>
  );
}

export default CreateBlogPostMedia;
