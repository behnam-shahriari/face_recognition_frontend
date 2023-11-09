import Logo from "../Logo/Logo";

const Navigation = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <Logo />
      <p className="f3 link dim blsack underline pa3 pointer">Sign Out</p>
    </nav>
  );
};

export default Navigation;
