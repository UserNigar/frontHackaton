import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Minimum 3 simvol olmalıdır')
        .max(20, 'Maksimum 20 simvol')
        .required('İstifadəçi adı tələb olunur'),
      email: Yup.string()
        .email('Düzgün email daxil edin')
        .required('Email tələb olunur'),
      password: Yup.string()
        .min(8, 'Minimum 8 simvol')
        .matches(/[a-z]/, 'Kiçik hərf daxil edilməlidir')
        .matches(/[A-Z]/, 'Böyük hərf daxil edilməlidir')
        .matches(/[0-9]/, 'Rəqəm daxil edilməlidir')
        .matches(/[!@#$%^&*]/, 'Xüsusi simvol daxil edilməlidir')
        .required('Şifrə tələb olunur'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Şifrələr uyğun deyil')
        .required('Şifrə təkrarı tələb olunur'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <div>
        <label htmlFor="username">İstifadəçi adı</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div style={{ color: 'red' }}>{formik.errors.username}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="email">Email ünvanı</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password">Şifrə</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="confirmPassword">Şifrə təkrarı</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <button type="submit">Qeydiyyat</button>
    </form>
  );
};

export default Register;
