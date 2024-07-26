import Banner from "../components/Banner";
import Feminino from "../components/Feminino";
import Footer from "../components/Footer";
import Lançamentos from "../components/Lançamentos";
import Masculino from "../components/Masculino";
import Ofertas from "../components/Oferta";
import Sobre from "../components/Sobre";

function Home() {
  return (
    <main className="w-full max-w-[1200px] mx-auto">
    <Banner />
    <Ofertas />
    <Lançamentos />
    <Masculino />
    <Feminino />
    <Sobre />
    <Footer />
    </main>
  )
}

export default Home;
