import React from "react";
import cn from 'classnames';

function Footer({ loggedIn }) {
  const className = cn('footer', 'page__narrow', {'footer_hidden': !loggedIn});
  return (
    <footer className={className}>
      <p className="footer__copyright">&copy;&nbsp;2020 Mesto Russia</p>
    </footer>
  );
}

export default Footer;
