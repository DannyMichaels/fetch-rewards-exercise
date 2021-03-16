import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = ({ title, children, setSearch, cartState }) => (
  <div className="layout">
    <Header title={title} setSearch={setSearch} cartState={cartState} />
    <div className="layout-children">{children}</div>
    <Footer />
  </div>
);

export default Layout;
