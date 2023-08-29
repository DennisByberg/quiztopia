import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Login from "../../components/Login/Login";
import "./HomePage.scss";

function HomePage() {
  return (
    <section className="home-page">
      <Header />
      <Login />
      <Footer />
    </section>
  );
}
export default HomePage;
