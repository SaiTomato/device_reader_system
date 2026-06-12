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

<div className="min-h-screen flex flex-col bg-gray-50">

  <header
    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
  >

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Device Reader
      </h2>
    </div>

  </header>

  <main
    className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
  >

    {children}

  </main>

</div>

);

}

export default MainLayout;
