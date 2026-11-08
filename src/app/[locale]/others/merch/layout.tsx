import { createSeoLayout } from "@/seo/createSeoLayout";

const { generateMetadata, Layout } = createSeoLayout(`merch`);

export { generateMetadata };
export default Layout;
