import { createSeoLayout } from "@/seo/createSeoLayout";

const { generateMetadata, Layout } = createSeoLayout(`test-ride`);

export { generateMetadata };
export default Layout;
