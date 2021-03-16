import { Typography } from '@material-ui/core';

const Footer = () => (
  <footer>
    <div className="inner-column">
      <Typography align="center">
        <a
          style={{ textDecoration: 'none' }}
          target="_blank"
          rel="noreferrer"
          href="http://www.github.com/dannymichaels/">
          Daniel Michael &copy; 2021
        </a>
      </Typography>
    </div>
  </footer>
);

export default Footer;
