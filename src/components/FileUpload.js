import { Formik, Form, Field } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";
import PreviewImage from "./PreviewImage";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const validationSchema = yup.object({
  file: yup
    .mixed()
    .nullable()
    .required()
    .test(
      "FILE_SIZE",
      "Uploaded file is too big.",
      (value) => !value || (value && value.size <= 102499 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded File is not supported",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});
const FileUpload = () => {
  const fileRef = useRef(null);
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          file: null,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <input
              ref={fileRef}
              hidden
              type="file"
              onChange={(event) => {
                setFieldValue("file", event.target.files[0]);
              }}
            />
            <KErrorMessage name="file" />
            {values.file && <PreviewImage file={values.file} />}
            <br /> <br />
            <button
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Upload
            </button>
            <br /> <br />
            <br /> <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FileUpload;
