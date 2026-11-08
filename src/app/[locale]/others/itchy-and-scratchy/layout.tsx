import { createSeoLayout } from "@/seo/createSeoLayout";

const { generateMetadata, Layout } = createSeoLayout(`itchy-and-scratchy`);

export { generateMetadata };
export default Layout;
