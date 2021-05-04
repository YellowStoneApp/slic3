import React from "react";

interface ProfileContainerProps {}

const ProfileContainer = (props: ProfileContainerProps) => {
  return (
    <>
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="d-flex content mb-1">
            {/* <!-- left side of profile --> */}
            <div className="flex-grow-1">
              <h1 className="font-700">
                Karla Black
                <i className="fa fa-check-circle color-blue-dark float-end font-13 mt-2 me-3"></i>
              </h1>
              <p className="mb-2">
                Karla Black is a name used when you generate a text with an
                annonymous name.
              </p>
              <p className="font-10">
                <strong className="color-theme pe-1">1k</strong>Followers
                <strong className="color-theme ps-3 pe-1">342</strong>Following
              </p>
            </div>
            {/* <!-- right side of profile. increase image width to increase column size--> */}
            <img
              src="images/empty.png"
              data-src="images/pictures/0t.jpg"
              width="115"
              height="115"
              className="rounded-circle mt-3 shadow-xl preload-img"
            />
          </div>
          {/* <!-- follow buttons--> */}
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
              <a
                data-gallery="gallery-1"
                href="images/pictures/10t.jpg"
                title="Vynil and Typerwritter"
              >
                <img
                  src="images/empty.png"
                  data-src="images/pictures/10t.jpg"
                  className="rounded-m preload-img shadow-xl img-fluid"
                  alt="img"
                />
                <div className="caption">
                  <h4 className="bottom-0 color-theme">Messy Desk?</h4>
                  <p>Some may consider this to be a very messy desk.</p>
                  <div className="divider bottom-0"></div>
                </div>
              </a>
              <a
                data-gallery="gallery-1"
                href="images/pictures/11t.jpg"
                title="Fruit Cookie Pie"
              >
                <img
                  src="images/empty.png"
                  data-src="images/pictures/11t.jpg"
                  className="rounded-m preload-img shadow-xl img-fluid"
                  alt="img"
                />
                <div className="caption">
                  <h4 className="bottom-0 color-theme">Designers Desk</h4>
                  <p>With all the gadgets you'd ever wish for.</p>
                  <div className="divider bottom-0"></div>
                </div>
              </a>
              <a
                data-gallery="gallery-1"
                href="images/pictures/28t.jpg"
                title="Plain Cookies and Flour"
              >
                <img
                  src="images/empty.png"
                  data-src="images/pictures/28t.jpg"
                  className="rounded-m preload-img shadow-xl img-fluid"
                  alt="img"
                />
                <div className="caption">
                  <h4 className="bottom-0 color-theme">Apple Watch</h4>
                  <p>The perfect and small notification device.</p>
                  <div className="divider bottom-0"></div>
                </div>
              </a>
              <a
                data-gallery="gallery-1"
                href="images/pictures/18t.jpg"
                title="Pots and Stuff"
              >
                <img
                  src="images/empty.png"
                  data-src="images/pictures/18t.jpg"
                  className="rounded-m preload-img shadow-xl img-fluid"
                  alt="img"
                />
                <div className="caption">
                  <h4 className="bottom-0 color-theme">City Landscape</h4>
                  <p>It's absolutely gorgeous, we'd love to see it live.</p>
                  <div className="divider bottom-0"></div>
                </div>
              </a>
              <a
                data-gallery="gallery-1"
                href="images/pictures/14t.jpg"
                title="Delicious Strawberries"
              >
                <img
                  src="images/empty.png"
                  data-src="images/pictures/14t.jpg"
                  className="rounded-m preload-img shadow-xl img-fluid"
                  alt="img"
                />
                <div className="caption">
                  <h4 className="bottom-0 color-theme">
                    Typography and iPhone 5
                  </h4>
                  <p>A beautifully captured snap with great contrast.</p>
                  <div className="divider bottom-0"></div>
                </div>
              </a>
              <a
                data-gallery="gallery-1"
                href="images/pictures/15t.jpg"
                title="A Beautiful Camera"
              >
                <img
                  src="images/empty.png"
                  data-src="images/pictures/15t.jpg"
                  className="rounded-m preload-img shadow-xl img-fluid"
                  alt="img"
                />
                <div className="caption">
                  <h4 className="bottom-0 color-theme">Feather and Paper?</h4>
                  <p>Going back to days when things were simplere.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContainer;
