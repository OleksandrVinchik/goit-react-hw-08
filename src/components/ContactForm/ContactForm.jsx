import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Обов'язкове поле"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Формат: 123-45-67")
    .required("Обов'язкове поле"),
});

export default function ContactForm({ onAddContact }) {
  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onAddContact(values);
        actions.resetForm();
      }}
    >
      <Form className={styles.form}>
        <label>
          Name:
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </label>
        <label>
          Number:
          <Field type="text" name="number" />
          <ErrorMessage
            name="number"
            component="div"
            className={styles.error}
          />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
