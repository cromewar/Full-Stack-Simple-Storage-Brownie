import { ConnectButton } from "../buttons/connect_button.component";

export const NavBar = (props) => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item title" href="https://bulma.io">
            Simple Storage
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <ConnectButton
                  setIsConnected={props.setIsConnected}
                  setSigner={props.setSigner}
                  isConnected={props.isConnected}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
