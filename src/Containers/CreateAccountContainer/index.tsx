import React, { useState } from "react";
import { Redirect } from "react-router";
import Alert from "../../Components/Alert";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import { Routes } from "../../Navigation/Routes";
import { tamarakService } from "../../Utils/Apis/tamarak.service";

interface CreateAccountContainerProps {}

/**
 * Choose a username and an avatar.
 * @param props
 * @returns
 */
const CreateAccountContainer = (props: CreateAccountContainerProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageSource, setImageSource] = useState<File | null>(null);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [redirect, setRedirect] = useState(false);

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
    if (imageSource && username) {
      try {
        const response = await tamarakService.registerUser(
          username,
          imageSource
        );
        setRedirect(true);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("You must choose a username and profile picture");
    }
  };

  const onUserNameChange = (value: string) => {
    setUsername(value);
  };

  if (redirect) {
    return <Redirect to={{ pathname: Routes.Gallery }} />;
  }

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        title="Profile"
        subtitle="Let's get your profile setup"
        submitButtonTitle="Next"
      >
        <Alert message={error} setMessage={setError} />
        <div className="row text-center row-cols-1 mb-0">
          <div className="file-data pb-5">
            <div style={{ width: "100%", marginBottom: "10" }}>
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file-upload"
                  accept="image/*"
                  onChange={imageSelected}
                />
                <img
                  src={
                    imageUrl ??
                    "https://timesofindia.indiatimes.com/photo/67586673.cms"
                  }
                  className="preload-img img-fluid rounded-circle"
                  alt="img"
                />
              </label>
            </div>
          </div>
        </div>
        <FormInput
          onValueChange={onUserNameChange}
          type="name"
          name="username"
          placeholder="User Name"
        />
      </Form>
    </div>
  );
};

export default CreateAccountContainer;
