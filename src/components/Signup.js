import { Formik, Form, Field, FieldArray } from "formik";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  phone: yup
    .number()
    .min(1000000000, "Not valid Phone Number!")
    .max(9999999999, "Not a valid no")
    .required("Phone no is required!"),
  password: yup
    .string()
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Minimum eight characters, at least one letter, one number and one special character"
    )
    .required("Password is required!"),
  gender: yup.string().required("Gender is Required"),
  date: yup.date().required("Date of Birth is required"),
  income: yup.string().required("Income is Required"),
  about: yup
    .string()
    .min(5, "minimum 10 words")
    .max(500, "Max 500 words")
    .required("About is Required"),
  // social: {
  //   facebook: "",
  //   twitter: "",
  // },
  gaming: yup
    .array()
    .of(
      yup
        .string("String is required!")
        .min(4, "Too Short")
        .max(20, "Too Long")
        .required("required")
    )
    .min(1, "Atleast One Social Media is Required!")
    .required("Required!"),
  hobby: yup
    .array()
    .of(
      yup
        .string("String is required!")
        .min(4, "Too Short")
        .max(20, "Too Long")
        .required("required")
    )
    .min(1, "Atleast One Hobby is Required!")
    .required("Required!"),
});

export const Signup = () => {
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          phone: "",
          password: "",
          gender: "",
          date: "",
          income: "",
          about: "",
          social: {
            facebook: "",
            twitter: "",
          },
          gaming: [],
          hobby: [],
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <label>Name:</label>
            <Field name="name" type="text" />
            <KErrorMessage name="name" />
            <br /> <br />
            <label>Phone:</label>
            <Field name="phone" type="number" />
            <KErrorMessage name="phone" />
            <br /> <br />
            <label>Password:</label>
            <Field name="password" type="password" />
            <KErrorMessage name="password" />
            <br /> <br />
            <label>Gender:</label>
            <br /> <br />
            <label>Male:</label>
            <Field name="gender" type="radio" value="male" />
            <label>Female:</label>
            <Field name="gender" type="radio" value="female" />
            <KErrorMessage name="gender" />
            <br /> <br />
            <label>Date:</label>
            <KErrorMessage name="date" />
            <Field name="date" type="date" />
            <br /> <br />
            <label>Income</label>
            <Field name="income" as="select">
              <option value="0">Rs 0</option>
              <option value="10">Rs 10</option>
              <option value="100">Rs 100</option>
            </Field>
            <KErrorMessage name="income" />
            <br /> <br />
            <label>About:</label>
            <KErrorMessage name="about" />
            <Field name="about" as="textarea" />
            <br /> <br />
            <label>Social:</label>
            <br /> <br />
            <label>Facebook:</label>
            <Field name="social.facebook" type="text" />
            <br /> <br />
            <label>Twitter:</label>
            <Field name="social.twitter" type="text" />
            <KErrorMessage name="social" />
            <br /> <br />
            <label>Gaming:</label> <br /> <br />
            <KErrorMessage name="gaming" />
            <label>VC:</label>
            <Field name="gaming[0]" type="text" />{" "}
            <KErrorMessage name="gaming[0]" />
            <br /> <br />
            <label>COD:</label>
            <Field name="gaming[1]" type="text" />
            <KErrorMessage name="gaming[1]" />
            <br /> <br />
            <FieldArray
              name="hobby"
              render={(arrayHelpers) => (
                <div>
                  {values.hobby && values.hobby.length > 0 ? (
                    values.hobby.map((hobby, index) => (
                      <div key={index}>
                        <Field name={`hobby.${index}`} />
                        <KErrorMessage name={`hobby.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      {/* show this when user has removed all friends from the list */}
                      Add Hobbies
                    </button>
                  )}
                </div>
              )}
            />
            <KErrorMessage name={`hobby`} />
            <br /> <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
