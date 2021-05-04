import React from "react";
import { iShout } from "../../Utils/Apis/tamarak.service";

interface PostProps {
  post: iShout;
}

const Post = (props: PostProps) => {
  return (
    <>
      <a
        data-gallery="gallery-1"
        href="images/pictures/10t.jpg"
        title="Vynil and Typerwritter"
      >
        <img
          src={props.post.url}
          className="rounded-m preload-img shadow-xl img-fluid"
          alt="img"
        />
        <div className="caption">
          <h4 className="bottom-0 color-theme">Messy Desk?</h4>
          <p>Some may consider this to be a very messy desk.</p>
          <div className="divider bottom-0"></div>
        </div>
      </a>
    </>
  );
};

export default Post;
