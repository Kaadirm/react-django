import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";

const RegisterPage = () => {

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Kullanıcı adı zorunludur"),
    email: Yup.string().required("E-Posta adresi zorunludur").email("Geçersiz e-posta adresi"),
    password: Yup.string().required("Şifre zorunludur"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios
    .post("http://localhost:8000/api/v1/users/", values)
    .then((response) => {
      console.log("Kayıt Başarılı: ", response.data);
      toast.success("Kayıt başarılı!");
        navigate('/');
      if (response.data && response.data.usernameTaken) {
        toast.error("Kullanıcı adı zaten kayıtlı");
      } else {
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.username && error.response.data.username.length > 0) {
          const errorMessage = error.response.data.username[0];
          toast.error(errorMessage);
        }
        console.error("Kayıt Hatası: ", error.response.data);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  
  useEffect(() => {
    AOS.init({
      offset: 180,
      duration: 600,
      anchorPlacement: "top-bottom",
    });
  }, []);


  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-row">
      <div className="w-[50%] hidden lg:block">

        <Slider {...sliderSettings}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1583787035686-91b82ad5d811?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="h-screen"
            />
            <Link to="/" style={{ textDecoration: 'none' }} className=" text-3xl font-bold italic md:w-auto absolute top-0 left-0 ml-12 mt-12 flex justify-center items-center">
            <span style={{ color: "#ff4500" }}>TICKET</span>
    <span style={{ color: "#a5b4fc", fontSize:"40px" }}>X</span>
            </Link>
            <div className="text-overlay absolute bottom-0 left-0 mb-24 ml-12 flex flex-col items-start text-white">
              <p className="text-[22px] pb-3 font-bold">Üye Ol!</p>
              <p className="text-[16px]">İlgi alanlarına ve yaşadığın konuma göre etkinlikler e-postana gelsin.</p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1514533212735-5df27d970db0?q=80&w=1712&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="h-screen"
            />
            <Link to="/" style={{ textDecoration: 'none' }} className=" text-3xl font-bold italic md:w-auto absolute top-0 left-0 ml-12 mt-12 flex justify-center items-center">
            <span style={{ color: "#ff4500" }}>TICKET</span>
    <span style={{ color: "#a5b4fc", fontSize:"40px" }}>X</span>
            </Link>
            <div className="text-overlay absolute bottom-0 left-0 mb-24 ml-12 flex flex-col items-start text-white">
              <p className="text-[22px] pb-3 font-bold">Yeni etkinliklerden ilk önce senin haberin olsun.</p>
              <p className="text-[16px]">E-posta gönderimlerine izin ver, binlerce etkinlik arasında kaybolma.</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1497911174120-042e550e7e0a?q=80&w=1756&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-screen" />
            <Link to="/" style={{ textDecoration: 'none' }} className=" text-3xl font-bold italic md:w-auto absolute top-0 left-0 ml-12 mt-12 flex justify-center items-center">
            <span style={{ color: "#ff4500" }}>TICKET</span>
    <span style={{ color: "#a5b4fc", fontSize:"40px" }}>X</span>
            </Link>
            <div className="text-overlay absolute bottom-0 left-0 mb-24 ml-12 flex flex-col items-start text-white ">
              <p className="text-[22px] pb-3 font-bold">Üyeliğin sayesinde hızlıca biletini al.</p>
              <p className="text-[16px]">Satın aldığın tüm biletlere profilinden ulaş.</p>
            </div>
          </div>
        </Slider>
      </div>
      <div
        className="flex-1 flex items-center justify-center h-screen"
        data-aos="fade-up"
        data-aos-offset="180"
        data-aos-duration="600"
        data-aos-anchor-placement="top-bottom"
      >
        <div>
        <Link to="/"  style={{ textDecoration: 'none' }}  className="text-4xl font-bold italic animate-pulse md:w-auto absolute top-0 right-12 ml-12 mt-12 flex justify-center items-center">
        <span style={{ color: "#ff4500" }}>TICKET</span>
    <span style={{ color: "#a5b4fc", fontSize:"56px" }}>X</span>
        </Link>
        </div>
        <div className="container text-center mx-auto max-w-md w-screen">
          <div className="lg:ml-32 lg:mr-32 lg:mb-0 mb-32">
          <h1 className="text-2xl font-semibold text-[#111826]">
            Hesap Oluştur
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-16 flex flex-col space-y-6">
              <div className="flex flex-col items-start">
                <label className="mb-1 inline-block text-sm font-medium text-gray-700 select-none cursor-pointer">
                  Kullanıcı Adı
                </label>
                <Field
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 sm:text-sm outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-indigo-500 disabled:border-gray-200 disabld:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500"
                  placeholder="Kullanıcı adınız"
                  type="text"
                  name="username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="mb-1 inline-block text-sm font-medium text-gray-700 select-none cursor-pointer">
                  E-Posta
                </label>
                <Field
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 sm:text-sm outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-indigo-500 disabled:border-gray-200 disabld:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500"
                  placeholder="kullanici@ornek.com"
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col items-start relative">
                <label className="mb-1 inline-block text-sm font-medium text-gray-700 select-none cursor-pointer">
                  Şifre
                </label>
                <Field
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 sm:text-sm outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-indigo-500 disabled:border-gray-200 disabld:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500"
                  placeholder="Şifre"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform focus:outline-none ${isHovered ? "text-purple-700" : "text-gray-500"
                    }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2 4l2.585-2.585a1 1 0 011.414 0l1.328 1.327a1 1 0 010-1.414L4.414 7.757a1 1 0 01-1.414 0L2 6.343a1 1 0 010-1.414zm18 0l-2.585-2.585a1 1 0 00-1.414 0L17.657 3.95a1 1 0 000 1.414L19.95 6.343a1 1 0 001.414 0L22 4a1 1 0 000-1.414zM3 10V8a7 7 0 0114 0v2m-4 2v4m0 0H7m4 0h2"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                className={`mx-auto mt-20 relative inline-flex flex-col items-center group rounded-xl py-2 px-2 text-sm font-medium transition-all no-underline focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed bg-indigo-700 text-white ${isHovered ? "hover:text-gray-100 hover:bg-purple-700" : "hover:text-gray-100 hover:bg-indigo-500"
                  } active:bg-indigo-800 active:text-blue-100 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:text-gray-100 transform hover:scale-105`}
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ width: '130px' }}
              >
                <span className="flex items-center justify-center flex-nowrap flex-none space-x-2">
                  <span>Kayıt Ol</span>
                </span>
              </button>


            </Form>
          </Formik>
          <div className="text-center mt-5">
            <p className="text-sm text-gray-500">
              Zaten hesabınız var mı?{" "}
              <Link to="/login" className="text-blue-600 underline hover:text-purple-700">
                Hesabınıza giriş yapın.
              </Link>{" "}
            </p>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
