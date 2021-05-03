import NotificationNetworkCheck from "material-ui/svg-icons/notification/network-check";
import React, { useState } from "react";
import { tamarakService } from "../../Utils/Apis/tamarak.service";

interface CreateContainerProps {}

const CreateContainer = () => {
  const [imageSource, setImageSource] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const imageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageSource(files[0]);
      const url = URL.createObjectURL(files[0]);
      console.log(url);
      setImageUrl(url);
    }
    console.log(e.target.files);
  };

  const onSubmit = async () => {
    if (imageSource) {
      try {
        const response = tamarakService.createShout(imageSource);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("No image selected");
    }
  };

  return (
    <>
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <div className="file-data pb-5">
              <div style={{ width: "100%", marginBottom: "10" }}>
                <input
                  type="file"
                  style={{
                    border: "none",
                    width: "100%",
                    padding: "10",
                    alignContent: "center",
                  }}
                  id="file-upload"
                  accept="image/*"
                  onChange={imageSelected}
                />
                <img
                  id="image-data"
                  src={
                    imageUrl ??
                    "https://timesofindia.indiatimes.com/photo/67586673.cms"
                  }
                  className="img-fluid"
                />
              </div>
            </div>
            <a
              onClick={onSubmit}
              className="btn btn-m mt-2 mb-4 btn-full bg-green-dark text-uppercase font-900"
            >
              Post
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateContainer;