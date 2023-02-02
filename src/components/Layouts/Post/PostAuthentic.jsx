import { useEffect, useState } from "react";
import { useWindowDimention } from "../../../hooks";

import styles from "./components/styles/postAuthentic.module.scss";
import { PostDescription, PostMedia } from "./components";
import { UserIdentifier, BlogPost, Tags, DeletedPost } from "..";

/**
 * @Intro this element has three division, all of them are described below but in general and common to all, this element has one root element and shows user avatar, post description and post media files if post is shared or not. But if post is shared root element will get different className("shareAuthentic") and sets elements in different order. If this root element has not this className, elements row will be rendered in standard order. After All this element checks post type "post"||"blogPost" and shows up appropriate element Post||BlogPost. Both of the information, TYPE and SHARED, must be passed as a prop in all the cases.
 * @USE_CASES this component is used in three different Component -: Post, UpdatePostPortal and SharePostPortal
 * @Post into the Post component this element behaves as described in intro, you must pass TYPE and SHARED props based on your information and PostAuthentic will return appropriate element RegullarPost||BlogPost. when you are using this component in Post component you have to pass activatePostMediaHandler prop as well.
 * @UPDATE_POST_PORTAL into this component we need different order of containing blocks, we don't need UserIdentifier and PostDescription but we still need PostMedia and even the BlogPost to be rendered. So we have to pass proccessUpdate prop as True and base on that prop PostAuthentic component will separate only the components we need. this props even restricts activatePostMediaHandler event !!!
 * @SHARE_POST_PORTAL into this component this element almost behaves as described in intro, you must pass TYPE and SHARED props as well, and SHARED prop must be the True to get correct order of element rows and you have to pass proccessShare prop as True to restrict activatePostMediaHandler event !!!
 * @param {Boolean} shared is a Boolean value, base on that value elements will be rendered in different order
 * @param {String} type defines post type post||blogPost and base on that returns appropriate elment Post||BlogPost
 * @param {function} activatePostMediaHandler passed on mediaFiles as onClick event and activates postMedia Modal
 * @param {Object} data this props is common for all the usecases but may be contained with different information. data prop passed from Post component have to contain next fields-: {userId, userName, userImg, description, media, createdAt, title(for BlogPost), commentsCount(for BlogPost), article(for BlogPost)} ! from SharePostPortal -: {userName, createdAt, userImg, description, type, media} ! from UpdatePostPortal -: {type, media, description}
 * @param {Boolean} proccessShare have to pass be passed proccessShare prop as True to restrict activatePostMediaHandler event
 * @param {Boolean} proccessUpdate have to be passed as True and base on that prop PostAuthentic component will separate and returns only the components we need. this props even restricts activatePostMediaHandler event !!!
 * @returns
 */
function PostAuthentic({
  shared,
  type,
  authenticType,
  activatePostMediaHandler,
  data,
  proccessShare,
  proccessUpdate,
  referencedPost,
}) {
  const tgs = shared ? data.authenticTags : data.tags;

  const [limit, setLimit] = useState(550);
  const { width } = useWindowDimention();

  useEffect(() => {
    if (width <= 480) setLimit(250);
    else if (width <= 680) setLimit(300);
    else if (width <= 960) setLimit(400);
    else setLimit(550);
  }, [width]);

  return (
    <div
      className={shared ? styles.shareAuthentic : styles.postBody}
      data-post-authentic
    >
      {data.deleted || data.authentic?.restricted ? (
        <DeletedPost />
      ) : type === "post" && authenticType !== "blogPost" ? (
        <>
          <UserIdentifier
            userId={data?.author._id || "DELETED_LINK"}
            userName={data.author.userName}
            img={data.author.profileImg}
            timeAgo={data.createdAt}
            audience={shared ? data.authenticAudience : data.audience}
            className={styles.postAuthenticIdentifier}
          >
            {tgs?.[0] && <Tags tags={tgs} />}
          </UserIdentifier>
          <PostDescription
            description={data.description}
            className={styles.description}
          />
          {data.media && (
            <PostMedia
              activateMedia={
                !proccessShare || !proccessUpdate
                  ? activatePostMediaHandler
                  : () => {}
              }
              media={data.media}
              className={styles.media}
            />
          )}
        </>
      ) : (
        <BlogPost
          post={
            shared
              ? {
                  ...data,
                  tags: data.authenticTags,
                  audience: data.authenticAudience,
                }
              : data
          }
          limitation={limit}
          options={false}
          referenced={referencedPost}
          className={styles.referencedBlogPost}
        />
      )}
    </div>
  );
}

export default PostAuthentic;
