import type {

ReactNode

} from "react";

type MainLayoutProps = {

children: ReactNode;

};

function MainLayout({

children

}: MainLayoutProps) {

return (

<div>

  <header
    style={{
      backgroundColor: "#1976d2",
      color: "white",
      padding: "16px"
    }}
  >

    <h2>
      Device Reader
    </h2>

  </header>

  <main
    style={{
      padding: "24px"
    }}
  >

    {children}

  </main>

</div>

);

}

export default MainLayout;
