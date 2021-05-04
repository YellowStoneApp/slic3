import MapsLocalLaundryService from "material-ui/svg-icons/maps/local-laundry-service";
import React, { useEffect, useState } from "react";
import { snapshot_UNSTABLE } from "recoil";
import {
  iShout,
  iUser,
  tamarakService,
} from "../../Utils/Apis/tamarak.service";
import Post from "./Post";

interface ProfileContainerProps {}

const ProfileContainer = (props: ProfileContainerProps) => {
  const [posts, setPosts] = useState<iShout[]>();
  const [user, setUser] = useState<iUser | null>(null);

  const loadPosts = async () => {
    const response = await tamarakService.getShouts();
    setPosts(response);
  };
  // how do you route the username here?
  const loadUser = async () => {
    const response = await tamarakService.getProfile("goslow");
    setUser(response);
  };

  useEffect(() => {
    loadPosts();
    loadUser();
  }, []);

  return (
    <>
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="d-flex content mb-1">
            {/* <!-- left side of profile --> */}
            <div className="flex-grow-1">
              <h1 className="font-700">
                @{user?.userName}
                <i className="fa fa-check-circle color-blue-dark float-end font-13 mt-2 me-3"></i>
              </h1>
              <p className="mb-2">Bio</p>
              <p className="font-10">
                <strong className="color-theme pe-1">1k</strong>Followers
                <strong className="color-theme ps-3 pe-1">342</strong>Following
              </p>
            </div>
            {/* <!-- right side of profile. increase image width to increase column size--> */}
            <img
              src={user?.avatar}
              width="115"
              height="115"
              className="rounded-circle mt-3 shadow-xl preload-img"
            />
          </div>
          {/* <!-- follow buttons--> Don't show this if this is customer's profile page */}
          <div className="content mb-0">
            <div className="row mb-0">
              <div className="col-6">
                <a
                  href="#"
                  className="btn btn-full btn-s rounded-s text-uppercase font-900 bg-blue-dark"
                >
                  Follow
                </a>
              </div>
              <div className="col-6">
                <a
                  href="#"
                  className="btn btn-full btn-s rounded-s text-uppercase font-900 color-theme border-blue-dark"
                >
                  Message
                </a>
              </div>
            </div>
          </div>

          <div className="divider mt-4 mb-0"></div>

          <div className="gallery-view-controls">
            <a href="#" className="gallery-view-1 color-highlight">
              <i className="fa fa-th"></i>
            </a>
            <a href="#" className="gallery-view-2">
              <i className="fa fa-th-large"></i>
            </a>
            <a href="#" className="gallery-view-3">
              <i className="fa fa-bars"></i>
            </a>
            <div className="clear"></div>
          </div>
          <div className="content mb-0 mt-n1">
            <div className="gallery-views gallery-view-1">
              {posts?.map((value) => {
                return <Post post={value} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContainer;
