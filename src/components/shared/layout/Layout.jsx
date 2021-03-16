import Footer from './Footer';
import Header from './Header';

const Layout = ({ title, children, setSearch }) => (
  <div className="layout">
    <Header title={title} setSearch={setSearch} />
    <div className="layout-children">{children}</div>
    <Footer />
  </div>
);

export default Layout;
