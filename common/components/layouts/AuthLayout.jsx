import Footer from "../footer/Footer";
import Navbar from "../navbar/MainPageNavbar";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AuthLayout;
