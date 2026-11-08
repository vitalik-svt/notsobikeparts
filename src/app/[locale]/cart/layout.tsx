import { createSeoLayout } from "@/seo/createSeoLayout";

const { generateMetadata, Layout } = createSeoLayout(`cart`);

export { generateMetadata };
export default Layout;
