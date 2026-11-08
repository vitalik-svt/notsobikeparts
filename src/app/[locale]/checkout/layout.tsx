import { createSeoLayout } from "@/seo/createSeoLayout";

const { generateMetadata, Layout } = createSeoLayout(`checkout`);

export { generateMetadata };
export default Layout;
