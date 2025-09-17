import React from "react";
import Layout from "../../Layout/Layout"; // 1. Import the standard Layout
 import ModeratorContent from "./ModeratorContent";

const ModeratorPage = () => {
  return (
    // 2. Wrap the page-specific content and Footer in the Layout component
    <Layout>
      <ModeratorContent />
     </Layout>
  );
};

export default ModeratorPage;